import { Injectable } from '@angular/core';
import {
  State,
  Transition,
  WorkflowGraph,
} from 'src/app/core/models/graph.model';

@Injectable({ providedIn: 'root' })
export class WorkflowDataService {
  private workflows: Record<number, WorkflowGraph> = {
    '9': {
      currentStateId: 98,
      states: [
        { id: 96, name: 'INITIATED', type: 'start' },
        {
          id: 97,
          name: 'AUTO_MANUAL_JUNCTION',
          type: 'normal',
          sub_workflow_id: 101,
        },
        { id: 98, name: 'QUALIFICATION', type: 'normal' },
        { id: 99, name: 'QUALIFICATION_ACTIVITY', type: 'normal' },
        { id: 100, name: 'QUALIFICATION_JUNCTION', type: 'normal' },
        { id: 101, name: 'PROCESSING', type: 'normal' },
        { id: 102, name: 'PENDING_VALIDATION', type: 'normal' },
        { id: 103, name: 'VALIDATION_ACTIVITY', type: 'normal' },
        { id: 104, name: 'VALIDATED', type: 'normal' },
        { id: 105, name: 'PENDING_DELIVERY', type: 'normal' },
        { id: 106, name: 'FAILED_DELIVERY', type: 'failed' },
        { id: 107, name: 'REJECTED', type: 'failed' },
        { id: 108, name: 'COMPLETED', type: 'normal' },
        { id: 109, name: 'UNSUPPORTED_QUAL_CAT', type: 'normal' },
        { id: 110, name: 'FAILED_GUARD_AUTO', type: 'failed' },
        { id: 111, name: 'FAILED_GUARD_QUAL', type: 'failed' },
        { id: 112, name: 'FAILED_ACTION_INIT', type: 'failed' },
        { id: 113, name: 'FAILED_ACTION_MSG', type: 'failed' },
        { id: 114, name: 'REQUEST_END', type: 'end' },
      ],
      transitions: [
        {
          TRANSITION_ID: 108,
          SOURCE: 'INITIATED',
          SOURCE_STATE_ID: 96,
          TARGET: 'AUTO_MANUAL_JUNCTION',
          TARGET_STATE_ID: 97,
          DEF_WORKFLOW_ID: 9,
          EVENT: null,
          APPLY_ACTION: 0,
          APPLY_GUARD: 0,
          APPLY_JUNCTION: 0,
          JUNCTION_INDEX: 0,
          APPLY_JOIN: 0,
          APPLY_ACTIVITY: 0,
        },
        {
          TRANSITION_ID: 109,
          SOURCE: 'AUTO_MANUAL_JUNCTION',
          SOURCE_STATE_ID: 97,
          TARGET: 'QUALIFICATION_JUNCTION',
          TARGET_STATE_ID: 100,
          DEF_WORKFLOW_ID: 9,
          EVENT: null,
          APPLY_ACTION: 0,
          APPLY_GUARD: 1,
          APPLY_JUNCTION: 1,
          JUNCTION_INDEX: 0,
          APPLY_JOIN: 0,
          APPLY_ACTIVITY: 0,
        },
        {
          TRANSITION_ID: 110,
          SOURCE: 'AUTO_MANUAL_JUNCTION',
          SOURCE_STATE_ID: 97,
          TARGET: 'QUALIFICATION_JUNCTION',
          TARGET_STATE_ID: 98,
          DEF_WORKFLOW_ID: 9,
          EVENT: null,
          APPLY_ACTION: 0,
          APPLY_GUARD: 0,
          APPLY_JUNCTION: 1,
          JUNCTION_INDEX: 1,
          APPLY_JOIN: 0,
          APPLY_ACTIVITY: 0,
        },
        {
          TRANSITION_ID: 111,
          SOURCE: 'AUTO_MANUAL_JUNCTION',
          SOURCE_STATE_ID: 97,
          TARGET: 'FAILED_GUARD_AUTO_MANUAL_JUNCTION',
          TARGET_STATE_ID: 110,
          DEF_WORKFLOW_ID: 9,
          EVENT: 'GUARD_FAILED',
          APPLY_ACTION: 0,
          APPLY_GUARD: 0,
          APPLY_JUNCTION: 0,
          JUNCTION_INDEX: 0,
          APPLY_JOIN: 0,
          APPLY_ACTIVITY: 0,
        },
        {
          TRANSITION_ID: 112,
          SOURCE: 'FAILED_GUARD_AUTO_MANUAL_JUNCTION',
          SOURCE_STATE_ID: 110,
          TARGET: 'AUTO_MANUAL_JUNCTION',
          TARGET_STATE_ID: 97,
          DEF_WORKFLOW_ID: 9,
          EVENT: 'RETRY',
          APPLY_ACTION: 0,
          APPLY_GUARD: 0,
          APPLY_JUNCTION: 0,
          JUNCTION_INDEX: 0,
          APPLY_JOIN: 0,
          APPLY_ACTIVITY: 0,
        },
        {
          TRANSITION_ID: 113,
          SOURCE: 'QUALIFICATION_ACTIVITY',
          SOURCE_STATE_ID: 98,
          TARGET: 'QUALIFICATION_ACTIVITY',
          TARGET_STATE_ID: 99,
          DEF_WORKFLOW_ID: 9,
          EVENT: null,
          APPLY_ACTION: 0,
          APPLY_GUARD: 0,
          APPLY_JUNCTION: 0,
          JUNCTION_INDEX: 0,
          APPLY_JOIN: 0,
          APPLY_ACTIVITY: 0,
        },
        {
          TRANSITION_ID: 114,
          SOURCE: 'QUALIFICATION_ACTIVITY',
          SOURCE_STATE_ID: 99,
          TARGET: 'QUALIFICATION_JUNCTION',
          TARGET_STATE_ID: 100,
          DEF_WORKFLOW_ID: 9,
          EVENT: null,
          APPLY_ACTION: 1,
          APPLY_GUARD: 1,
          APPLY_JUNCTION: 1,
          JUNCTION_INDEX: 1,
          APPLY_JOIN: 0,
          APPLY_ACTIVITY: 0,
        },
        {
          TRANSITION_ID: 116,
          SOURCE: 'QUALIFICATION_JUNCTION',
          SOURCE_STATE_ID: 100,
          TARGET: 'PROCESSING',
          TARGET_STATE_ID: 101,
          DEF_WORKFLOW_ID: 9,
          EVENT: null,
          APPLY_ACTION: 1,
          APPLY_GUARD: 1,
          APPLY_JUNCTION: 1,
          JUNCTION_INDEX: 1,
          APPLY_JOIN: 0,
          APPLY_ACTIVITY: 0,
        },
        {
          TRANSITION_ID: 117,
          SOURCE: 'QUALIFICATION_JUNCTION',
          SOURCE_STATE_ID: 100,
          TARGET: 'PENDING_VALIDATION',
          TARGET_STATE_ID: 102,
          DEF_WORKFLOW_ID: 9,
          EVENT: null,
          APPLY_ACTION: 0,
          APPLY_GUARD: 0,
          APPLY_JUNCTION: 1,
          JUNCTION_INDEX: 2,
          APPLY_JOIN: 0,
          APPLY_ACTIVITY: 0,
        },
        {
          TRANSITION_ID: 118,
          SOURCE: 'QUALIFICATION_JUNCTION',
          SOURCE_STATE_ID: 100,
          TARGET: 'UNSUPPORTED_QUALIFICATION_CATEGORY',
          TARGET_STATE_ID: 109,
          DEF_WORKFLOW_ID: 9,
          EVENT: null,
          APPLY_ACTION: 0,
          APPLY_GUARD: 0,
          APPLY_JUNCTION: 0,
          JUNCTION_INDEX: 0,
          APPLY_JOIN: 0,
          APPLY_ACTIVITY: 0,
        },
        {
          TRANSITION_ID: 119,
          SOURCE: 'QUALIFICATION_JUNCTION',
          SOURCE_STATE_ID: 100,
          TARGET: 'FAILED_GUARD_QUALIFICATION_JUNCTION',
          TARGET_STATE_ID: 111,
          DEF_WORKFLOW_ID: 9,
          EVENT: 'GUARD_FAILED',
          APPLY_ACTION: 0,
          APPLY_GUARD: 0,
          APPLY_JUNCTION: 0,
          JUNCTION_INDEX: 0,
          APPLY_JOIN: 0,
          APPLY_ACTIVITY: 0,
        },
        {
          TRANSITION_ID: 120,
          SOURCE: 'QUALIFICATION_JUNCTION',
          SOURCE_STATE_ID: 100,
          TARGET: 'FAILED_ACTION_INITIATE_EVENT',
          TARGET_STATE_ID: 112,
          DEF_WORKFLOW_ID: 9,
          EVENT: 'ACTION_FAILED',
          APPLY_ACTION: 0,
          APPLY_GUARD: 0,
          APPLY_JUNCTION: 0,
          JUNCTION_INDEX: 0,
          APPLY_JOIN: 0,
          APPLY_ACTIVITY: 0,
        },
        {
          TRANSITION_ID: 121,
          SOURCE: 'FAILED_GUARD_QUALIFICATION_JUNCTION',
          SOURCE_STATE_ID: 111,
          TARGET: 'QUALIFICATION_JUNCTION',
          TARGET_STATE_ID: 100,
          DEF_WORKFLOW_ID: 9,
          EVENT: 'RETRY',
          APPLY_ACTION: 0,
          APPLY_GUARD: 0,
          APPLY_JUNCTION: 0,
          JUNCTION_INDEX: 0,
          APPLY_JOIN: 0,
          APPLY_ACTIVITY: 0,
        },
        {
          TRANSITION_ID: 122,
          SOURCE: 'FAILED_ACTION_INITIATE_EVENT',
          SOURCE_STATE_ID: 112,
          TARGET: 'QUALIFICATION_JUNCTION',
          TARGET_STATE_ID: 100,
          DEF_WORKFLOW_ID: 9,
          EVENT: 'RETRY',
          APPLY_ACTION: 0,
          APPLY_GUARD: 0,
          APPLY_JUNCTION: 0,
          JUNCTION_INDEX: 0,
          APPLY_JOIN: 0,
          APPLY_ACTIVITY: 0,
        },
        {
          TRANSITION_ID: 123,
          SOURCE: 'PROCESSING',
          SOURCE_STATE_ID: 101,
          TARGET: 'COMPLETED',
          TARGET_STATE_ID: 108,
          DEF_WORKFLOW_ID: 9,
          EVENT: 'COMPLETE_REQUEST',
          APPLY_ACTION: 0,
          APPLY_GUARD: 0,
          APPLY_JUNCTION: 0,
          JUNCTION_INDEX: 0,
          APPLY_JOIN: 0,
          APPLY_ACTIVITY: 0,
        },
        {
          TRANSITION_ID: 124,
          SOURCE: 'PENDING_VALIDATION',
          SOURCE_STATE_ID: 102,
          TARGET: 'VALIDATION_ACTIVITY',
          TARGET_STATE_ID: 103,
          DEF_WORKFLOW_ID: 9,
          EVENT: null,
          APPLY_ACTION: 0,
          APPLY_GUARD: 0,
          APPLY_JUNCTION: 0,
          JUNCTION_INDEX: 0,
          APPLY_JOIN: 0,
          APPLY_ACTIVITY: 0,
        },
        {
          TRANSITION_ID: 125,
          SOURCE: 'VALIDATION_ACTIVITY',
          SOURCE_STATE_ID: 103,
          TARGET: 'VALIDATED',
          TARGET_STATE_ID: 104,
          DEF_WORKFLOW_ID: 9,
          EVENT: null,
          APPLY_ACTION: 1,
          APPLY_GUARD: 0,
          APPLY_JUNCTION: 0,
          JUNCTION_INDEX: 0,
          APPLY_JOIN: 0,
          APPLY_ACTIVITY: 0,
        },
        {
          TRANSITION_ID: 127,
          SOURCE: 'VALIDATED',
          SOURCE_STATE_ID: 104,
          TARGET: 'PENDING_DELIVERY',
          TARGET_STATE_ID: 105,
          DEF_WORKFLOW_ID: 9,
          EVENT: null,
          APPLY_ACTION: 0,
          APPLY_GUARD: 0,
          APPLY_JUNCTION: 0,
          JUNCTION_INDEX: 0,
          APPLY_JOIN: 0,
          APPLY_ACTIVITY: 0,
        },
        {
          TRANSITION_ID: 130,
          SOURCE: 'PENDING_DELIVERY',
          SOURCE_STATE_ID: 105,
          TARGET: 'COMPLETED',
          TARGET_STATE_ID: 108,
          DEF_WORKFLOW_ID: 9,
          EVENT: 'MESSAGE_EXCHANGE_ACK',
          APPLY_ACTION: 0,
          APPLY_GUARD: 0,
          APPLY_JUNCTION: 0,
          JUNCTION_INDEX: 0,
          APPLY_JOIN: 0,
          APPLY_ACTIVITY: 0,
        },
        {
          TRANSITION_ID: 131,
          SOURCE: 'PENDING_DELIVERY',
          SOURCE_STATE_ID: 105,
          TARGET: 'FAILED_DELIVERY',
          TARGET_STATE_ID: 106,
          DEF_WORKFLOW_ID: 9,
          EVENT: 'MESSAGE_EXCHANGE_NACK',
          APPLY_ACTION: 0,
          APPLY_GUARD: 0,
          APPLY_JUNCTION: 0,
          JUNCTION_INDEX: 0,
          APPLY_JOIN: 0,
          APPLY_ACTIVITY: 0,
        },
        {
          TRANSITION_ID: 132,
          SOURCE: 'FAILED_DELIVERY',
          SOURCE_STATE_ID: 106,
          TARGET: 'PENDING_VALIDATION',
          TARGET_STATE_ID: 102,
          DEF_WORKFLOW_ID: 9,
          EVENT: null,
          APPLY_ACTION: 0,
          APPLY_GUARD: 0,
          APPLY_JUNCTION: 0,
          JUNCTION_INDEX: 0,
          APPLY_JOIN: 0,
          APPLY_ACTIVITY: 1,
        },
        {
          TRANSITION_ID: 133,
          SOURCE: 'VALIDATED',
          SOURCE_STATE_ID: 104,
          TARGET: 'FAILED_ACTION_INITIATE_MESSAGE',
          TARGET_STATE_ID: 113,
          DEF_WORKFLOW_ID: 9,
          EVENT: 'ACTION_FAILED',
          APPLY_ACTION: 0,
          APPLY_GUARD: 0,
          APPLY_JUNCTION: 0,
          JUNCTION_INDEX: 0,
          APPLY_JOIN: 0,
          APPLY_ACTIVITY: 0,
        },
        {
          TRANSITION_ID: 134,
          SOURCE: 'FAILED_ACTION_INITIATE_MESSAGE',
          SOURCE_STATE_ID: 113,
          TARGET: 'VALIDATED',
          TARGET_STATE_ID: 104,
          DEF_WORKFLOW_ID: 9,
          EVENT: 'RETRY',
          APPLY_ACTION: 0,
          APPLY_GUARD: 0,
          APPLY_JUNCTION: 0,
          JUNCTION_INDEX: 0,
          APPLY_JOIN: 0,
          APPLY_ACTIVITY: 0,
        },
        {
          TRANSITION_ID: 135,
          SOURCE: 'REJECTED',
          SOURCE_STATE_ID: 107,
          TARGET: 'REQUEST_END',
          TARGET_STATE_ID: 114,
          DEF_WORKFLOW_ID: 9,
          EVENT: null,
          APPLY_ACTION: 0,
          APPLY_GUARD: 0,
          APPLY_JUNCTION: 0,
          JUNCTION_INDEX: 0,
          APPLY_JOIN: 0,
          APPLY_ACTIVITY: 0,
        },
        {
          TRANSITION_ID: 136,
          SOURCE: 'COMPLETED',
          SOURCE_STATE_ID: 108,
          TARGET: 'REQUEST_END',
          TARGET_STATE_ID: 114,
          DEF_WORKFLOW_ID: 9,
          EVENT: null,
          APPLY_ACTION: 0,
          APPLY_GUARD: 0,
          APPLY_JUNCTION: 0,
          JUNCTION_INDEX: 0,
          APPLY_JOIN: 0,
          APPLY_ACTIVITY: 0,
        },
        {
          TRANSITION_ID: 137,
          SOURCE: 'QUALIFICATION_ACTIVITY',
          SOURCE_STATE_ID: 99,
          TARGET: 'REJECTED',
          TARGET_STATE_ID: 107,
          DEF_WORKFLOW_ID: 9,
          EVENT: 'REJECTED',
          APPLY_ACTION: 0,
          APPLY_GUARD: 0,
          APPLY_JUNCTION: 0,
          JUNCTION_INDEX: 0,
          APPLY_JOIN: 0,
          APPLY_ACTIVITY: 0,
        },
        {
          TRANSITION_ID: 138,
          SOURCE: 'UNSUPPORTED_QUALIFICATION_CATEGORY',
          SOURCE_STATE_ID: 109,
          TARGET: 'COMPLETED',
          TARGET_STATE_ID: 108,
          DEF_WORKFLOW_ID: 9,
          EVENT: null,
          APPLY_ACTION: 0,
          APPLY_GUARD: 0,
          APPLY_JUNCTION: 0,
          JUNCTION_INDEX: 0,
          APPLY_JOIN: 0,
          APPLY_ACTIVITY: 0,
        },
        {
          TRANSITION_ID: 139,
          SOURCE: 'VALIDATION_ACTIVITY',
          SOURCE_STATE_ID: 103,
          TARGET: 'REJECTED',
          TARGET_STATE_ID: 107,
          DEF_WORKFLOW_ID: 9,
          EVENT: 'REJECTED',
          APPLY_ACTION: 0,
          APPLY_GUARD: 0,
          APPLY_JUNCTION: 0,
          JUNCTION_INDEX: 0,
          APPLY_JOIN: 0,
          APPLY_ACTIVITY: 0,
        },
      ],
    },
    //   "101": {
    //     "rawStates": [
    //       { "id": 1, "name": "SUB_START", "type": "start" },
    //       { "id": 2, "name": "MANUAL_REVIEW", "type": "normal" },
    //       { "id": 3, "name": "SUB_END", "type": "end" }
    //     ],
    //     "transitions": [
    //       { "TRANSITION_ID": 999, "SOURCE_STATE_ID": 1, "TARGET_STATE_ID": 2, "EVENT": "TRIGGER" },
    //       { "TRANSITION_ID": 1000, "SOURCE_STATE_ID": 2, "TARGET_STATE_ID": 3, "EVENT": "APPROVE" }
    //     ]
    //   },
    1: {
      currentStateId: null,
      states: [
        { id: 1, name: 'START', type: 'start' },
        { id: 2, name: 'FORK_HUB', type: 'normal' },
        { id: 3, name: 'PATH_A', type: 'normal' },
        { id: 4, name: 'PATH_B', type: 'normal', sub_workflow_id: 101 }, // Sub-workflow link
        { id: 5, name: 'B_EXT', type: 'normal' },
        { id: 6, name: 'PATH_C', type: 'normal', sub_workflow_id: 102 }, // Sub-workflow link
        { id: 10, name: 'PATH_C_2', type: 'normal' },
        { id: 12, name: 'PATH_C_3', type: 'junction' },
        { id: 11, name: 'PATH_C_STOP', type: 'end' },
        { id: 7, name: 'PATH_D', type: 'normal' },
        { id: 8, name: 'JOIN_HUB', type: 'normal' },
        { id: 9, name: 'END', type: 'end' },
        { id: 13, name: 'PATH_A2', type: 'failed' },
        { id: 14, name: 'PATH_A3', type: 'failed' },
        { id: 15, name: 'PATH_B_2', type: 'failed' },
        { id: 16, name: 'PATH_D_2', type: 'failed' },
      ],
      transitions: [
        {
          TRANSITION_ID: 1,

          SOURCE: 'START',

          SOURCE_STATE_ID: 1,

          TARGET: 'FORK_HUB',

          TARGET_STATE_ID: 2,

          DEF_WORKFLOW_ID: 1,

          EVENT: 'Init',

          APPLY_ACTION: 0,

          APPLY_GUARD: 0,

          APPLY_JUNCTION: 0,

          JUNCTION_INDEX: 0,

          APPLY_JOIN: 0,

          APPLY_ACTIVITY: 0,
        },

        {
          TRANSITION_ID: 2,

          SOURCE: 'FORK_HUB',

          SOURCE_STATE_ID: 2,

          TARGET: 'PATH_A',

          TARGET_STATE_ID: 3,

          DEF_WORKFLOW_ID: 1,

          EVENT: 'A',

          APPLY_ACTION: 0,

          APPLY_GUARD: 0,

          APPLY_JUNCTION: 0,

          JUNCTION_INDEX: 0,

          APPLY_JOIN: 0,

          APPLY_ACTIVITY: 0,
        },

        {
          TRANSITION_ID: 3,

          SOURCE: 'FORK_HUB',

          SOURCE_STATE_ID: 2,

          TARGET: 'PATH_B',

          TARGET_STATE_ID: 4,

          DEF_WORKFLOW_ID: 1,

          EVENT: 'B',

          APPLY_ACTION: 0,

          APPLY_GUARD: 0,

          APPLY_JUNCTION: 0,

          JUNCTION_INDEX: 0,

          APPLY_JOIN: 0,

          APPLY_ACTIVITY: 0,
        },

        {
          TRANSITION_ID: 301,

          SOURCE: 'PATH_B',

          SOURCE_STATE_ID: 4,

          TARGET: 'PATH_B_2',

          TARGET_STATE_ID: 15,

          DEF_WORKFLOW_ID: 1,

          EVENT: 'Failed B',

          APPLY_ACTION: 0,

          APPLY_GUARD: 0,

          APPLY_JUNCTION: 0,

          JUNCTION_INDEX: 0,

          APPLY_JOIN: 0,

          APPLY_ACTIVITY: 0,
        },

        {
          TRANSITION_ID: 302,

          SOURCE: 'PATH_B_2',

          SOURCE_STATE_ID: 15,

          TARGET: 'PATH_B',

          TARGET_STATE_ID: 4,

          DEF_WORKFLOW_ID: 1,

          EVENT: 'SuccessB',

          APPLY_ACTION: 0,

          APPLY_GUARD: 0,

          APPLY_JUNCTION: 0,

          JUNCTION_INDEX: 0,

          APPLY_JOIN: 0,

          APPLY_ACTIVITY: 0,
        },

        {
          TRANSITION_ID: 4,

          SOURCE: 'FORK_HUB',

          SOURCE_STATE_ID: 2,

          TARGET: 'PATH_C',

          TARGET_STATE_ID: 6,

          DEF_WORKFLOW_ID: 1,

          EVENT: 'C',

          APPLY_ACTION: 0,

          APPLY_GUARD: 0,

          APPLY_JUNCTION: 0,

          JUNCTION_INDEX: 0,

          APPLY_JOIN: 0,

          APPLY_ACTIVITY: 0,
        },

        {
          TRANSITION_ID: 5,

          SOURCE: 'FORK_HUB',

          SOURCE_STATE_ID: 2,

          TARGET: 'PATH_D',

          TARGET_STATE_ID: 7,

          DEF_WORKFLOW_ID: 1,

          EVENT: 'D',

          APPLY_ACTION: 0,

          APPLY_GUARD: 0,

          APPLY_JUNCTION: 0,

          JUNCTION_INDEX: 0,

          APPLY_JOIN: 0,

          APPLY_ACTIVITY: 0,
        },

        {
          TRANSITION_ID: 501,

          SOURCE: 'PATH_D',

          SOURCE_STATE_ID: 7,

          TARGET: 'PATH_D_2',

          TARGET_STATE_ID: 16,

          DEF_WORKFLOW_ID: 1,

          EVENT: 'failed',

          APPLY_ACTION: 0,

          APPLY_GUARD: 0,

          APPLY_JUNCTION: 0,

          JUNCTION_INDEX: 0,

          APPLY_JOIN: 0,

          APPLY_ACTIVITY: 0,
        },

        {
          TRANSITION_ID: 502,

          SOURCE: 'PATH_D_2',

          SOURCE_STATE_ID: 16,

          TARGET: 'PATH_D',

          TARGET_STATE_ID: 7,

          DEF_WORKFLOW_ID: 1,

          EVENT: 'success',

          APPLY_ACTION: 0,

          APPLY_GUARD: 0,

          APPLY_JUNCTION: 0,

          JUNCTION_INDEX: 0,

          APPLY_JOIN: 0,

          APPLY_ACTIVITY: 0,
        },

        {
          TRANSITION_ID: 6,

          SOURCE: 'PATH_B',

          SOURCE_STATE_ID: 4,

          TARGET: 'B_EXT',

          TARGET_STATE_ID: 5,

          DEF_WORKFLOW_ID: 1,

          EVENT: 'Extend',

          APPLY_ACTION: 0,

          APPLY_GUARD: 0,

          APPLY_JUNCTION: 0,

          JUNCTION_INDEX: 0,

          APPLY_JOIN: 0,

          APPLY_ACTIVITY: 0,
        },

        {
          TRANSITION_ID: 12,

          SOURCE: 'PATH_C',

          SOURCE_STATE_ID: 6,

          TARGET: 'PATH_C_2',

          TARGET_STATE_ID: 10,

          DEF_WORKFLOW_ID: 1,

          EVENT: 'Next',

          APPLY_ACTION: 0,

          APPLY_GUARD: 0,

          APPLY_JUNCTION: 0,

          JUNCTION_INDEX: 0,

          APPLY_JOIN: 0,

          APPLY_ACTIVITY: 0,
        },

        {
          TRANSITION_ID: 14,

          SOURCE: 'PATH_C_2',

          SOURCE_STATE_ID: 10,

          TARGET: 'PATH_C_3',

          TARGET_STATE_ID: 12,

          DEF_WORKFLOW_ID: 1,

          EVENT: 'Next',

          APPLY_ACTION: 0,

          APPLY_GUARD: 0,

          APPLY_JUNCTION: 0,

          JUNCTION_INDEX: 0,

          APPLY_JOIN: 0,

          APPLY_ACTIVITY: 0,
        },

        {
          TRANSITION_ID: 13,

          SOURCE: 'PATH_C_3',

          SOURCE_STATE_ID: 12,

          TARGET: 'PATH_C_STOP',

          TARGET_STATE_ID: 11,

          DEF_WORKFLOW_ID: 1,

          EVENT: 'Stop',

          APPLY_ACTION: 0,

          APPLY_GUARD: 0,

          APPLY_JUNCTION: 0,

          JUNCTION_INDEX: 0,

          APPLY_JOIN: 0,

          APPLY_ACTIVITY: 0,
        },

        {
          TRANSITION_ID: 7,

          SOURCE: 'PATH_A',

          SOURCE_STATE_ID: 3,

          TARGET: 'JOIN_HUB',

          TARGET_STATE_ID: 8,

          DEF_WORKFLOW_ID: 1,

          EVENT: null,

          APPLY_ACTION: 1,

          APPLY_GUARD: 1,

          APPLY_JUNCTION: 0,

          JUNCTION_INDEX: 0,

          APPLY_JOIN: 1,

          APPLY_ACTIVITY: 0,
        },

        {
          TRANSITION_ID: 701,

          SOURCE: 'PATH_A',

          SOURCE_STATE_ID: 3,

          TARGET: 'PATH_A_2',

          TARGET_STATE_ID: 13,

          DEF_WORKFLOW_ID: 1,

          EVENT: 'failed',

          APPLY_ACTION: 0,

          APPLY_GUARD: 0,

          APPLY_JUNCTION: 0,

          JUNCTION_INDEX: 0,

          APPLY_JOIN: 0,

          APPLY_ACTIVITY: 0,
        },

        {
          TRANSITION_ID: 702,

          SOURCE: 'PATH_A',

          SOURCE_STATE_ID: 3,

          TARGET: 'PATH_A_3',

          TARGET_STATE_ID: 14,

          DEF_WORKFLOW_ID: 1,

          EVENT: 'failed',

          APPLY_ACTION: 0,

          APPLY_GUARD: 0,

          APPLY_JUNCTION: 0,

          JUNCTION_INDEX: 0,

          APPLY_JOIN: 0,

          APPLY_ACTIVITY: 0,
        },

        {
          TRANSITION_ID: 703,

          SOURCE: 'PATH_A_2',

          SOURCE_STATE_ID: 13,

          TARGET: 'PATH_A',

          TARGET_STATE_ID: 3,

          DEF_WORKFLOW_ID: 1,

          EVENT: 'succes2',

          APPLY_ACTION: 0,

          APPLY_GUARD: 0,

          APPLY_JUNCTION: 0,

          JUNCTION_INDEX: 0,

          APPLY_JOIN: 0,

          APPLY_ACTIVITY: 0,
        },

        {
          TRANSITION_ID: 704,

          SOURCE: 'PATH_A_3',

          SOURCE_STATE_ID: 14,

          TARGET: 'PATH_A',

          TARGET_STATE_ID: 3,

          DEF_WORKFLOW_ID: 1,

          EVENT: 'succes',

          APPLY_ACTION: 0,

          APPLY_GUARD: 0,

          APPLY_JUNCTION: 0,

          JUNCTION_INDEX: 0,

          APPLY_JOIN: 0,

          APPLY_ACTIVITY: 0,
        },

        {
          TRANSITION_ID: 8,

          SOURCE: 'B_EXT',

          SOURCE_STATE_ID: 5,

          TARGET: 'JOIN_HUB',

          TARGET_STATE_ID: 8,

          DEF_WORKFLOW_ID: 1,

          EVENT: null,

          APPLY_ACTION: 0,

          APPLY_GUARD: 0,

          APPLY_JUNCTION: 0,

          JUNCTION_INDEX: 0,

          APPLY_JOIN: 1,

          APPLY_ACTIVITY: 0,
        },

        {
          TRANSITION_ID: 10,

          SOURCE: 'PATH_D',

          SOURCE_STATE_ID: 7,

          TARGET: 'JOIN_HUB',

          TARGET_STATE_ID: 8,

          DEF_WORKFLOW_ID: 1,

          EVENT: null,

          APPLY_ACTION: 0,

          APPLY_GUARD: 0,

          APPLY_JUNCTION: 0,

          JUNCTION_INDEX: 0,

          APPLY_JOIN: 1,

          APPLY_ACTIVITY: 0,
        },

        {
          TRANSITION_ID: 11,

          SOURCE: 'JOIN_HUB',

          SOURCE_STATE_ID: 8,

          TARGET: 'END',

          TARGET_STATE_ID: 9,

          DEF_WORKFLOW_ID: 1,

          EVENT: 'Finish',

          APPLY_ACTION: 0,

          APPLY_GUARD: 0,

          APPLY_JUNCTION: 0,

          JUNCTION_INDEX: 0,

          APPLY_JOIN: 0,

          APPLY_ACTIVITY: 0,
        },
      ],
    },
    101: {
      currentStateId: null,
      // Simple sub-workflow for PATH_B
      states: [
        { id: 1011, name: 'B_SUB_START', type: 'start' },
        { id: 1012, name: 'VALIDATE_B', type: 'normal' },
        { id: 1013, name: 'B_SUB_END', type: 'end' },
      ],
      transitions: [
        {
          TRANSITION_ID: 1001,
          SOURCE_STATE_ID: 1011,
          TARGET_STATE_ID: 1012,
          EVENT: 'Start B Sub',
          APPLY_ACTION: 1,
        } as any,
        {
          TRANSITION_ID: 1002,
          SOURCE_STATE_ID: 1012,
          TARGET_STATE_ID: 1013,
          EVENT: 'Complete',
          APPLY_ACTIVITY: 1,
        } as any,
      ],
    },
    102: {
      currentStateId: null,
      // Simple sub-workflow for PATH_C
      states: [
        { id: 2011, name: 'C_SUB_START', type: 'start' },
        { id: 2012, name: 'PROCESS_C', type: 'normal' },
        { id: 2013, name: 'C_SUB_END', type: 'end' },
      ],
      transitions: [
        {
          TRANSITION_ID: 2001,
          SOURCE_STATE_ID: 2011,
          TARGET_STATE_ID: 2012,
          EVENT: 'Start C Sub',
          APPLY_GUARD: 1,
        } as any,
        {
          TRANSITION_ID: 2002,
          SOURCE_STATE_ID: 2012,
          TARGET_STATE_ID: 2013,
          EVENT: 'Finish',
          APPLY_ACTION: 1,
        } as any,
      ],
    },
  };

  getWorkflow(id: number = 1) {
    return this.workflows[id] || this.workflows[1];
  }
}
