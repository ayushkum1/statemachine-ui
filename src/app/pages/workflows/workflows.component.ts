import { Component, OnInit } from '@angular/core';
import { WorkflowApiService } from '../../core/services/workflow-api.service';
import { Workflow } from '../../core/models/workflow.model';
import { Transition } from '../../core/models/transition.model';
import { GraphFacadeService } from 'src/app/core/graph/graph-facade.service';

interface WorkflowRow {
  workflow: Workflow;
  expanded: boolean;
  transitions: Transition[];
}

@Component({
  selector: 'app-workflows',
  templateUrl: './workflows.component.html',
  styleUrls: ['./workflows.component.scss'],
})
export class WorkflowsComponent implements OnInit {
  rows: WorkflowRow[] = [];
  showGraphModal = false;
  selectedWorkflowId?: number;

  constructor(
    private workflowApi: WorkflowApiService,
    public graphFacade: GraphFacadeService
  ) {}

  ngOnInit(): void {
    const workflows = this.workflowApi.getWorkflows();

    this.rows = workflows.map((workflow) => ({
      workflow,
      expanded: false,
      transitions: this.workflowApi.getTransitionsByWorkflowId(workflow.id),
    }));
  }

  toggleRow(row: WorkflowRow): void {
    row.expanded = !row.expanded;
  }

  openGraph(row: WorkflowRow): void {
    this.selectedWorkflowId = row.workflow.id;
    this.showGraphModal = true;
  }

  closeGraph(): void {
    this.showGraphModal = false;
  }
}
