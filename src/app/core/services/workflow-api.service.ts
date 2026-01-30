import { Injectable } from '@angular/core';
import { Workflow } from '../models/workflow.model';
import { WorkflowInstance } from '../models/workflow-instance.model';
import { State } from '../models/state.model';
import { Transition } from '../models/transition.model';

import { WORKFLOWS_MOCK } from '../mock-data/workflows.mock';
import { WORKFLOW_INSTANCES_MOCK } from '../mock-data/workflow-instances.mock';
import { STATES_MOCK } from '../mock-data/states.mock';
import { TRANSITIONS_MOCK } from '../mock-data/transitions.mock';

@Injectable({
  providedIn: 'root',
})
export class WorkflowApiService {
  // ---- Workflows ----

  getWorkflows(): Workflow[] {
    return WORKFLOWS_MOCK;
  }

  getWorkflowById(workflowId: number): Workflow | undefined {
    return WORKFLOWS_MOCK.find((w) => w.id === workflowId);
  }

  // ---- Instances ----

  getWorkflowInstances(): WorkflowInstance[] {
    return WORKFLOW_INSTANCES_MOCK;
  }

  // ---- States & Transitions ----

  getStatesByWorkflowId(workflowId: number): State[] {
    return STATES_MOCK[workflowId] ?? [];
  }

  getTransitionsByWorkflowId(workflowId: number): Transition[] {
    return TRANSITIONS_MOCK[workflowId] ?? [];
  }
}
