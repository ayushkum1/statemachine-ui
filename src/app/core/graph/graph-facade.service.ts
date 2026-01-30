import { Injectable } from '@angular/core';

import { Graph } from '../models/graph.model';
import { State } from '../models/state.model';
import { Transition } from '../models/transition.model';

import { WorkflowApiService } from '../services/workflow-api.service';
import { buildGraph } from './graph-builder';
import { layoutDAG } from './layout/dag-layout';
import { GraphDefinition, GraphState } from './models/graph-definition.model';
import { RawTransition } from './models/raw-transition.model';
import { GraphDefinitionBuilder } from './builders/graph-definition.builder';

@Injectable({
  providedIn: 'root',
})
export class GraphFacadeService {
  constructor(private workflowApi: WorkflowApiService) {}

  buildGraphDefinition(
    states: GraphState[],
    rawTransitions: RawTransition[],
    currentStateId?: number
  ): GraphDefinition {
    return GraphDefinitionBuilder.build(states, rawTransitions, currentStateId);
  }

  /**
   * Used by Workflows tab
   * UI CONTRACT — DO NOT CHANGE SIGNATURE
   */
  getWorkflowGraph(workflowId: number | undefined): Graph {
    if (workflowId == null) {
      return { nodes: [], edges: [] };
    }

    const states: State[] = this.workflowApi.getStatesByWorkflowId(workflowId);

    const transitions: Transition[] =
      this.workflowApi.getTransitionsByWorkflowId(workflowId);

    const graph = buildGraph({
      states,
      transitions,
    });

    return layoutDAG(graph);
  }

  /**
   * Used by Dashboard tab
   * UI CONTRACT — DO NOT CHANGE SIGNATURE
   */
  getInstanceGraph(
    workflowId: number | undefined,
    currentStateId: number | undefined
  ): Graph {
    if (workflowId == null) {
      return { nodes: [], edges: [] };
    }

    const states: State[] = this.workflowApi.getStatesByWorkflowId(workflowId);

    const transitions: Transition[] =
      this.workflowApi.getTransitionsByWorkflowId(workflowId);

    const graph = buildGraph({
      states,
      transitions,
      currentStateId,
    });

    // NOTE:
    // currentStateId highlighting will be handled later
    return layoutDAG(graph);
  }
}
