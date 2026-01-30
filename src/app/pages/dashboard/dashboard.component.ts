import { Component, OnInit } from '@angular/core';
import { WorkflowApiService } from '../../core/services/workflow-api.service';
import { WorkflowInstance } from '../../core/models/workflow-instance.model';
import { Transition } from '../../core/models/transition.model';
import { GraphFacadeService } from '../../core/graph/graph-facade.service';
interface DashboardRow {
  instance: WorkflowInstance;
  expanded: boolean;
  transitions: Transition[];
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  rows: DashboardRow[] = [];
  showGraphModal = false;
  selectedWorkflowId?: number;
  selectedCurrentStateId?: number;

  constructor(
    private workflowApi: WorkflowApiService,
    public graphFacade: GraphFacadeService
  ) {}

  ngOnInit(): void {
    const instances = this.workflowApi.getWorkflowInstances();

    this.rows = instances.map((instance) => ({
      instance,
      expanded: false,
      transitions: this.workflowApi.getTransitionsByWorkflowId(
        instance.workflowId
      ),
    }));

    if (this.rows.length > 0) {
      const first = this.rows[2].instance;
      console.log(
        this.graphFacade.getInstanceGraph(
          first.workflowId,
          first.currentStateId
        )
      );
    }
  }

  toggleRow(row: DashboardRow): void {
    row.expanded = !row.expanded;
  }

  openGraph(row: DashboardRow): void {
    this.selectedWorkflowId = row.instance.workflowId;
    this.selectedCurrentStateId = row.instance.currentStateId;
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
