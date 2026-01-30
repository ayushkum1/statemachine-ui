import { Graph, GraphNode, GraphEdge } from '../models/graph.model';
import { State } from '../models/state.model';
import { Transition } from '../models/transition.model';

export function buildGraph(input: {
  states: State[];
  transitions: Transition[];
  currentStateId?: number;
}): Graph {
  const nodes: GraphNode[] = [];
  const edges: GraphEdge[] = [];

  const stateNodeMap = new Map<number, GraphNode>();

  // ----------------------------
  // MAIN STATES (only real states)
  // ----------------------------
  input.states
    .filter((s) => s.type !== 'failure')
    .forEach((s) => {
      const node: GraphNode = {
        id: `state-${s.id}`,
        label: s.name,
        type: 'state',
        stateId: s.id,
        isCurrent: s.id === input.currentStateId,
      };
      nodes.push(node);
      stateNodeMap.set(s.id, node);
    });

  // ----------------------------
  // TRANSITIONS
  // ----------------------------
  input.transitions.forEach((t) => {
    const source = stateNodeMap.get(t.sourceStateId);
    const target = stateNodeMap.get(t.targetStateId);
    if (!source || !target) return;

    // Main success edge
    edges.push({
      from: source.id,
      to: target.id,
      kind: 'main',
    });

    // Guard decoration
    if (t.applyGuard) {
      edges.push({
        from: source.id,
        to: target.id,
        kind: 'guard',
        dashed: true,
      });
    }

    // Action decoration
    if (t.applyAction) {
      edges.push({
        from: source.id,
        to: target.id,
        kind: 'action',
        dashed: true,
      });
    }

    // ----------------------------
    // FAILED STATE (isolated, per transition)
    // ----------------------------
    if (t.applyGuard || t.applyAction) {
      const failedNodeId = `failed-${t.id}`;

      const failedNode: GraphNode = {
        id: failedNodeId,
        label: 'FAILED',
        type: 'failure',
        stateId: t.sourceStateId,
      };

      nodes.push(failedNode);

      // Source → Failed
      edges.push({
        from: source.id,
        to: failedNodeId,
        kind: 'failure',
      });

      // Failed → Target
      edges.push({
        from: failedNodeId,
        to: target.id,
        kind: 'failure',
      });
    }
  });

  return { nodes, edges };
}
