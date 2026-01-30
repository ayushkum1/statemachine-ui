import {
  GraphDefinition,
  GraphState,
  GraphTransition,
  FailureLink,
} from '../models/graph-definition.model';
import { RawTransition } from '../models/raw-transition.model';

export class GraphDefinitionBuilder {
  static build(
    states: GraphState[],
    rawTransitions: RawTransition[],
    currentStateId?: number
  ): GraphDefinition {
    // -------------------------
    // STATES
    // -------------------------
    const stateMap = new Map<number, GraphState>();

    states.forEach((s) => {
      stateMap.set(s.id, {
        ...s,
        isCurrent: s.id === currentStateId,
      });
    });

    // -------------------------
    // TRANSITIONS
    // -------------------------
    const transitions: GraphTransition[] = rawTransitions.map((t) => ({
      id: t.TRANSITION_ID,

      sourceStateId: t.SOURCE_STATE_ID,
      targetStateId: t.TARGET_STATE_ID,

      event: t.EVENT,

      hasAction: t.APPLY_ACTION === 1,
      hasGuard: t.APPLY_GUARD === 1,
      hasActivity: t.APPLY_ACTIVITY === 1,

      applyJunction: t.APPLY_JUNCTION === 1,
      junctionIndex: t.APPLY_JUNCTION === 1 ? t.JUNCTION_INDEX : undefined,

      applyJoin: t.APPLY_JOIN === 1,
    }));

    // -------------------------
    // FAILURE LINKS (derived)
    // -------------------------
    const failureLinks: FailureLink[] = [];

    rawTransitions.forEach((t) => {
      if (t.EVENT === 'GUARD_FAILED' || t.EVENT === 'ACTION_FAILED') {
        failureLinks.push({
          sourceStateId: t.TARGET_STATE_ID, // failed state
          failedStateId: t.TARGET_STATE_ID,
          retryTargetStateId: t.SOURCE_STATE_ID,
        });
      }
    });

    return {
      states: Array.from(stateMap.values()),
      transitions,
      failureLinks,
    };
  }
}
