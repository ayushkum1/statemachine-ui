export type StateType =
  | 'start'
  | 'normal'
  | 'end'
  | 'fork'
  | 'join'
  | 'junction'
  | 'failure';

export interface State {
  id: number;
  name: string;
  type: StateType;

  /**
   * If present, this state opens another workflow
   */
  subWorkflowId?: number;

  /**
   * Metadata (optional, backend-driven later)
   */
  description?: string;
}
