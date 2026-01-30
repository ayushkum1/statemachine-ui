export interface Graph {
  nodes: GraphNode[];
  edges: GraphEdge[];
  transitionGroups?: TransitionGroup[];
}

export interface GraphNode {
  id: string;
  label: string;
  type: 'state' | 'guard' | 'action' | 'failure';

  stateId?: number;
  transitionId?: number;

  isCurrent?: boolean;
  hasSubWorkflow?: boolean;

  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

export interface GraphEdge {
  from: string;
  to: string;
  label?: string;
  dashed?: boolean;

  kind: 'main' | 'attachment' | 'failure' | 'action' | 'guard';
  hidden?: boolean;

  /** NEW — explicit ports */
  fromPort?: 'top-25' | 'top-75' | 'bottom-25' | 'bottom-75';
  toPort?: 'top-25' | 'top-75' | 'bottom-25' | 'bottom-75' | 'top-50';
}

export interface TransitionGroup {
  transitionId: number;
  sourceStateId: number;
  targetStateId: number;

  hasGuard: boolean;
  hasAction: boolean;

  guardNodeId?: string;
  actionNodeId?: string;
}
