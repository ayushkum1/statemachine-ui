import { Graph, GraphNode } from '../../models/graph.model';

export function layoutDAG(graph: Graph): Graph {
  const NODE_WIDTH = 140;
  const NODE_HEIGHT = 60;

  const X_START = 120;
  const X_GAP = 220;

  const Y_MAIN = 300; // main state lane
  const Y_TRANSITION_BASE = 420; // first transition lane
  const Y_LANE_GAP = 110; // gap per transition lane
  const Y_FAILURE_OFFSET = 90; // failure below guard/action

  const nodes = graph.nodes;
  const edges = graph.edges;

  const nodeMap = new Map<string, GraphNode>();
  nodes.forEach((n) => nodeMap.set(n.id, n));

  /* -------------------------------------------------
   * 1. Build outgoing edges per source
   * ------------------------------------------------- */
  const outgoing = new Map<string, string[]>();
  nodes.forEach((n) => outgoing.set(n.id, []));

  edges.forEach((e) => {
    outgoing.get(e.from)!.push(e.to);
  });

  /* -------------------------------------------------
   * 2. Identify main states (exclude failure)
   * ------------------------------------------------- */
  const mainStates = nodes.filter((n) => n.type === 'state');

  /* -------------------------------------------------
   * 3. Assign horizontal positions (simple order)
   *    NOTE: cycles are ignored on purpose
   * ------------------------------------------------- */
  const stateOrder = new Map<string, number>();
  mainStates.forEach((state, index) => {
    stateOrder.set(state.id, index);
  });

  /* -------------------------------------------------
   * 4. Position MAIN states
   * ------------------------------------------------- */
  mainStates.forEach((state) => {
    const col = stateOrder.get(state.id)!;

    state.x = X_START + col * X_GAP;
    state.y = Y_MAIN;
    state.width = NODE_WIDTH;
    state.height = NODE_HEIGHT;
  });

  /* -------------------------------------------------
   * 5. Layout transitions per state (lanes)
   * ------------------------------------------------- */
  mainStates.forEach((state) => {
    const col = stateOrder.get(state.id)!;
    const baseX = X_START + col * X_GAP;

    const targets = outgoing.get(state.id)!;

    let laneIndex = 0;

    targets.forEach((targetId) => {
      const target = nodeMap.get(targetId);
      if (!target) return;

      // Only layout guards/actions here
      if (target.type === 'guard' || target.type === 'action') {
        const laneY = Y_TRANSITION_BASE + laneIndex * Y_LANE_GAP;

        target.x = baseX;
        target.y = laneY;
        target.width = NODE_WIDTH;
        target.height = NODE_HEIGHT;

        // Check if this guard/action leads to a failure
        const nextTargets = outgoing.get(target.id) || [];
        nextTargets.forEach((nextId) => {
          const next = nodeMap.get(nextId);
          if (next && next.type === 'failure') {
            next.x = baseX;
            next.y = laneY + Y_FAILURE_OFFSET;
            next.width = NODE_WIDTH;
            next.height = NODE_HEIGHT;
          }
        });

        laneIndex++;
      }
    });
  });

  /* -------------------------------------------------
   * 6. Position remaining states (fallback)
   * ------------------------------------------------- */
  nodes.forEach((n) => {
    if (n.x == null || n.y == null) {
      n.x = X_START;
      n.y = Y_MAIN;
      n.width = NODE_WIDTH;
      n.height = NODE_HEIGHT;
    }
  });

  return graph;
}
