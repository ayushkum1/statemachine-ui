import { Graph } from '../../models/graph.model';

export function layoutGraph(graph: Graph): Graph {
  const X_START = 120;
  const X_GAP = 220;

  const Y_MAIN = 260;
  const Y_FAILED = 380;

  const STATE_WIDTH = 140;
  const STATE_HEIGHT = 60;

  const states = graph.nodes.filter((n) => n.type === 'state');
  const failures = graph.nodes.filter((n) => n.type === 'failure');

  // ----------------------------
  // Position main states (L → R)
  // ----------------------------
  states.forEach((n, index) => {
    n.x = X_START + index * X_GAP;
    n.y = Y_MAIN;
    n.width = STATE_WIDTH;
    n.height = STATE_HEIGHT;
  });

  // ----------------------------
  // Position failed states (below source)
  // ----------------------------
  failures.forEach((failed) => {
    const edgeFromSource = graph.edges.find((e) => e.to === failed.id);
    if (!edgeFromSource) return;

    const source = graph.nodes.find((n) => n.id === edgeFromSource.from);
    if (!source) return;

    failed.x = source.x;
    failed.y = Y_FAILED;
    failed.width = STATE_WIDTH;
    failed.height = STATE_HEIGHT;
  });

  return graph;
}
