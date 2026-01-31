import { Component, OnInit } from '@angular/core';
import { WorkflowApiService } from '../../core/services/workflow-api.service';
import { WorkflowInstance } from '../../core/models/workflow-instance.model';
import { Transition } from '../../core/models/transition.model';
import { GraphRendererComponent } from '../graph-renderer/graph-renderer.component';

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
  zoomLevel: number = 1.0;
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

  closeGraph(): void {
    this.showGraphModal = false;
  }

  isCurrentSourceTransition(
    transition: Transition,
    instance: WorkflowInstance
  ): boolean {
    return transition.sourceStateId === instance.currentStateId;
  }

  zoomIn() {
    this.zoomLevel = Math.min(this.zoomLevel + 0.1, 2.0);
  }

  zoomOut() {
    this.zoomLevel = Math.max(this.zoomLevel - 0.1, 0.5);
  }

  resetZoom() {
    this.zoomLevel = 1.0;
  }

  // Ensure we reset zoom when opening a new graph
  openGraph(row: DashboardRow): void {
    this.zoomLevel = 1.0;
    this.showGraphModal = true;
  }
}
