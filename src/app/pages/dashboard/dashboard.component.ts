import { Component, OnInit } from '@angular/core';
import { WorkflowApiService } from '../../core/services/workflow-api.service';
import { WorkflowInstance } from '../../core/models/workflow-instance.model';
import { Transition } from '../../core/models/transition.model';

interface DashboardRow {
  instance: WorkflowInstance;
  transitions: Transition[];
  expanded: boolean;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  rows: DashboardRow[] = [];

  showGraphModal = false;
  graphLayout: any | null = null;

  constructor(private workflowApi: WorkflowApiService) {}

  ngOnInit(): void {
    const instances = this.workflowApi.getWorkflowInstances();

    this.rows = instances.map((instance) => {
      const transitions = this.workflowApi.getTransitionsByWorkflowId(
        instance.workflowId
      ) as Transition[];

      return {
        instance,
        transitions,
        expanded: false,
      };
    });
  }

  toggleRow(row: DashboardRow): void {
    row.expanded = !row.expanded;
  }

  openGraph(row: DashboardRow): void {
    this.showGraphModal = true;
  }

  closeGraph(): void {
    this.showGraphModal = false;
  }

  isCurrentSourceTransition(
    transition: Transition,
    instance: WorkflowInstance
  ): boolean {
    return transition.sourceStateId === instance.currentStateId;
  }
}
