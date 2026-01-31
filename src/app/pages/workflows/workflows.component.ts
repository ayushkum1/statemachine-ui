import { Component, OnInit } from '@angular/core';
import { WorkflowApiService } from '../../core/services/workflow-api.service';
import { Workflow } from '../../core/models/workflow.model';
import { Transition } from '../../core/models/transition.model';

interface WorkflowRow {
  workflow: Workflow;
  transitions: Transition[];
  expanded: boolean;
}

@Component({
  selector: 'app-workflows',
  templateUrl: './workflows.component.html',
  styleUrls: ['./workflows.component.scss'],
})
export class WorkflowsComponent implements OnInit {
  rows: WorkflowRow[] = [];

  showGraphModal = false;
  graphLayout: any | null = null;

  constructor(private workflowApi: WorkflowApiService) {}

  ngOnInit(): void {
    const workflows = this.workflowApi.getWorkflows();

    this.rows = workflows.map((workflow) => {
      const transitions = this.workflowApi.getTransitionsByWorkflowId(
        workflow.id
      ) as Transition[];

      return {
        workflow,
        transitions,
        expanded: false,
      };
    });
  }

  toggleRow(row: WorkflowRow): void {
    row.expanded = !row.expanded;
  }

  openGraph(row: WorkflowRow): void {
    this.showGraphModal = true;
  }

  closeGraph(): void {
    this.showGraphModal = false;
  }
}
