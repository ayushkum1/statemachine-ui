export interface Transition {
  id: number;

  sourceStateId: number;
  targetStateId: number;

  /**
   * Optional event triggering this transition
   */
  event?: string;

  /**
   * Transition semantics
   */
  applyGuard: boolean;
  applyAction: boolean;
  applyJunction: boolean;
  applyJoin: boolean;

  /**
   * Used when multiple junction paths exist
   */
  junctionIndex?: number;

  /**
   * Optional activity metadata
   */
  applyActivity?: boolean;
}
