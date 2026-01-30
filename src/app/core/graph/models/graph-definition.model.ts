export interface GraphState {
  id: number;
  name: string;
  type: 'start' | 'normal' | 'junction' | 'join' | 'fork' | 'end' | 'failure';

  subWorkflowId?: number;
  isCurrent?: boolean;
}

export interface GraphTransition {
  id: number;

  sourceStateId: number;
  targetStateId: number;

  event?: string | null;

  hasAction: boolean;
  hasGuard: boolean;
  hasActivity: boolean;

  applyJunction: boolean;
  junctionIndex?: number;

  applyJoin: boolean;
}

export interface FailureLink {
  sourceStateId: number;
  failedStateId: number;
  retryTargetStateId: number;
}

export interface GraphDefinition {
  states: GraphState[];
  transitions: GraphTransition[];
  failureLinks: FailureLink[];
}
