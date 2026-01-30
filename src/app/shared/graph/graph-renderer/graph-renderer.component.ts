import { Component, Input, OnChanges } from '@angular/core';
import { Graph, GraphEdge, GraphNode } from '../../../core/models/graph.model';

@Component({
  selector: 'app-graph-renderer',
  templateUrl: './graph-renderer.component.html',
  styleUrls: ['./graph-renderer.component.scss'],
})
export class GraphRendererComponent implements OnChanges {
  @Input() graph!: Graph;

  nodeMap = new Map<string, GraphNode>();

  svgWidth = 1200;
  svgHeight = 600;

  ngOnChanges(): void {
    if (!this.graph) return;

    this.nodeMap.clear();
    this.graph.nodes.forEach((n) => this.nodeMap.set(n.id, n));

    this.svgWidth = Math.max(...this.graph.nodes.map((n) => n.x ?? 0)) + 300;
    this.svgHeight = Math.max(...this.graph.nodes.map((n) => n.y ?? 0)) + 200;
  }

  // ----------------------------
  // Edge path (simple horizontal)
  // ----------------------------
  getEdgePath(edge: GraphEdge): string {
    const from = this.nodeMap.get(edge.from)!;
    const to = this.nodeMap.get(edge.to)!;

    const sx = from.x! + from.width! / 2;
    const sy = from.y!;
    const tx = to.x! - to.width! / 2;
    const ty = to.y!;

    return `M ${sx} ${sy} H ${tx}`;
  }

  // ----------------------------
  // Inline Guard / Action boxes
  // ----------------------------
  getInlineBox(edge: GraphEdge) {
    if (edge.kind !== 'guard' && edge.kind !== 'action') return null;

    const from = this.nodeMap.get(edge.from)!;
    const to = this.nodeMap.get(edge.to)!;

    return {
      label: edge.kind === 'guard' ? 'Guard' : 'Action',
      x: (from.x! + to.x!) / 2,
      y: from.y! - 80, // ABOVE main axis (L → R)
    };
  }
}
