export interface RawTransition {
  TRANSITION_ID: number;

  SOURCE: string;
  SOURCE_STATE_ID: number;

  TARGET: string;
  TARGET_STATE_ID: number;

  DEF_WORKFLOW_ID: number;

  EVENT: string | null;

  APPLY_ACTION: 0 | 1;
  APPLY_GUARD: 0 | 1;
  APPLY_ACTIVITY: 0 | 1;

  APPLY_JUNCTION: 0 | 1;
  JUNCTION_INDEX: number;

  APPLY_JOIN: 0 | 1;
}
