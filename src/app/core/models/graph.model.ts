export interface State {
  id: number;
  name: string;
  type: 'start' | 'end' | 'normal' | 'failed' | 'junction';
  sub_workflow_id?: number;
  x?: number;
  y?: number;
  rowIndex?: number;
  direction?: 'LTR' | 'RTL';
}

export interface Transition {
  TRANSITION_ID: number;
  SOURCE: string;
  SOURCE_STATE_ID: number;
  TARGET: string;
  TARGET_STATE_ID: number;
  DEF_WORKFLOW_ID: number;
  EVENT: string | null;
  APPLY_ACTION: number;
  APPLY_GUARD: number;
  APPLY_JUNCTION: number;
  JUNCTION_INDEX: number;
  APPLY_JOIN: number;
  APPLY_ACTIVITY: number;
}

export interface WorkflowGraph {
  states: State[];
  transitions: Transition[];
  currentStateId: number | null;
}
