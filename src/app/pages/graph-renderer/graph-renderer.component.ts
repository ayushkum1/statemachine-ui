import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
  Input,
  SimpleChanges,
} from '@angular/core';
import { State, Transition } from 'src/app/core/models/graph.model';
import { WorkflowDataService } from 'src/app/core/services/workflow-data.service';

@Component({
  selector: 'app-graph-renderer',
  templateUrl: './graph-renderer.component.html',
  styleUrls: ['./graph-renderer.component.css'],
})
export class GraphRendererComponent implements OnInit, AfterViewInit {
  @ViewChild('container') container!: ElementRef;

  absMinY = 0;
  positionedStates: State[] = [];
  transitions: Transition[] = [];
  @Input() zoomLevel: number = 1.0;
  hoveredTransitionId: number | null = null;
  svgWidth: number = 0;
  svgHeight: number = 0;
  @Input() subWorkflowId: number | null = null;

  isModalOpen = false;
  isLogicModalOpen = false;
  selectedSubWorkflowId: number | null = null;
  selectedLogicMarker: any = null;
  hoveredStateId: number | null = null;
  currentStateId: number | null = null;
  // Layout Constants
  readonly RECT_WIDTH = 180;
  readonly RECT_HEIGHT = 80;
  readonly CIRCLE_RADIUS = 45;
  readonly H_GAP = 250;
  readonly V_GAP = 150;
  readonly MARGIN_LEFT = 80;

  constructor(private workflowService: WorkflowDataService) {}

  ngOnInit(): void {
    // setTimeout(() => {
    //   this.loadGraph();
    // }, 100);
    this.loadGraph();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['subWorkflowId'] && !changes['subWorkflowId'].firstChange) {
      this.loadGraph();
    }
  }

  loadGraph() {
    // Determine which ID to use: the input from parent, or default to 1
    console.log('this.selectedSubWorkflowId', this.selectedSubWorkflowId);
    const idToFetch = this.subWorkflowId || this.selectedSubWorkflowId || 9;

    console.log('Fetching Workflow ID:', idToFetch);

    const data = this.workflowService.getWorkflow(idToFetch);

    this.transitions = data.transitions;

    this.currentStateId = (data as any).currentStateId || null;
    console.log('current_state_id: ', this.currentStateId);
    // Ensure we use data.rawStates or data.states based on your service structure
    this.calculateLayout(data.states || data.states);
  }

  ngAfterViewInit() {
    // Initial centering and fitting
  }

  // --- CANVAS DIMENSION LOGIC ---
  updateCanvasDimensions() {
    if (this.positionedStates.length === 0) return;

    // Find the maximum bounds of the graph
    const maxX =
      Math.max(...this.positionedStates.map((s) => s.x!)) + this.RECT_WIDTH;
    const maxY =
      Math.max(...this.positionedStates.map((s) => s.y!)) +
      this.absMinY +
      this.RECT_HEIGHT;

    // Set SVG pixel size based on content * zoom to trigger container overflow
    this.svgWidth = (maxX + 200) * this.zoomLevel;
    this.svgHeight = (maxY + 200) * this.zoomLevel;
  }

  // --- LAYOUT ENGINE ---
  getFootprint(
    stateId: number,
    states: State[],
    visited = new Set<number>()
  ): number {
    if (visited.has(stateId)) return 1;
    visited.add(stateId);

    const childTrans = this.transitions.filter(
      (t) => t.SOURCE_STATE_ID === stateId
    );
    const normal = childTrans.filter(
      (t) => states.find((s) => s.id === t.TARGET_STATE_ID)?.type !== 'failed'
    );
    const failed = childTrans.filter(
      (t) => states.find((s) => s.id === t.TARGET_STATE_ID)?.type === 'failed'
    );

    const selfRequired = 1 + failed.length;
    if (normal.length === 0) return selfRequired;

    const branchesFootprint = normal
      .map((t) => this.getFootprint(t.TARGET_STATE_ID, states, visited))
      .reduce((a, b) => a + b, 0);

    return Math.max(selfRequired, branchesFootprint);
  }

  calculateLayout(states: State[]): void {
    const containerWidth = this.container?.nativeElement.offsetWidth || 800;
    const containerHeight = this.container?.nativeElement.offsetHeight || 600;
    const stateInfo = new Map<number, { col: number; lane: number }>();
    const footprints = new Map<number, number>();

    if (containerWidth <= 0 || containerHeight <= 0) {
      this.svgWidth = 800;
      this.svgHeight = 600;
      return;
    }

    states.forEach((s) =>
      footprints.set(s.id, this.getFootprint(s.id, states))
    );

    const placeNode = (stateId: number, col: number, startLane: number) => {
      if (stateInfo.has(stateId)) return;
      stateInfo.set(stateId, { col, lane: startLane });

      const childTrans = this.transitions.filter(
        (t) => t.SOURCE_STATE_ID === stateId
      );
      const normal = childTrans.filter(
        (t) => states.find((s) => s.id === t.TARGET_STATE_ID)?.type !== 'failed'
      );
      const failed = childTrans.filter(
        (t) => states.find((s) => s.id === t.TARGET_STATE_ID)?.type === 'failed'
      );

      failed.forEach((t, i) => {
        stateInfo.set(t.TARGET_STATE_ID, { col, lane: startLane + (i + 1) });
      });

      let currentLane = startLane;
      normal.forEach((t) => {
        const childSize = footprints.get(t.TARGET_STATE_ID) || 1;
        placeNode(t.TARGET_STATE_ID, col + 1, currentLane);
        currentLane += childSize;
      });
    };

    const startNode = states.find((s) => s.type === 'start') || states[0];
    placeNode(startNode.id, 0, 0);

    this.positionedStates = states.map((s) => {
      const pos = stateInfo.get(s.id) || { col: 0, lane: 0 };
      return {
        ...s,
        x:
          this.MARGIN_LEFT +
          pos.col * (this.RECT_WIDTH + this.H_GAP) +
          this.RECT_WIDTH / 2,
        y: pos.lane * this.V_GAP,
        rowIndex: pos.lane,
      };
    });

    const maxX = Math.max(...this.positionedStates.map((s) => s.x || 0), 0);
    const maxY = Math.max(...this.positionedStates.map((s) => s.y || 0), 0);
    const minY = Math.min(...this.positionedStates.map((s) => s.y || 0), 0);

    this.absMinY = Math.abs(minY) + 100;

    // 4. Set the SVG size based on graph content or container size (whichever is larger)
    // These are the 'minWidth' and 'minHeight' logic equivalents
    this.svgWidth = Math.max(maxX + this.RECT_WIDTH + 100, containerWidth);
    this.svgHeight = Math.max(maxY + this.absMinY + 100, containerHeight);

    // 5. Trigger zoom reset once layout is known

    // const minY = Math.min(...this.positionedStates.map((s) => s.y!));
    this.absMinY = Math.abs(minY) + 100;
    this.updateCanvasDimensions();
  }

  // --- PATHING & MARKERS ---
  getOrthogonalPath(trans: Transition): string {
    const s = this.positionedStates.find(
      (st) => st.id === trans.SOURCE_STATE_ID
    );
    const t = this.positionedStates.find(
      (st) => st.id === trans.TARGET_STATE_ID
    );
    if (!s || !t) return '';

    // Calculate unique offsets to "spread" the lines vertically
    const sourceOffset = ((trans.TRANSITION_ID % 5) - 2) * 10;
    const targetOffset = ((trans.TRANSITION_ID % 3) - 1) * 10;

    const startY = s.y! + sourceOffset;
    const endY = t.y! + targetOffset;

    // Handle Vertical / Bowed paths (Same-column transitions)
    if (Math.abs(s.x! - t.x!) < 5) {
      const laneDiff = Math.abs((t.rowIndex || 0) - (s.rowIndex || 0));
      const bow = 90 + laneDiff * 35;
      const side = t.type === 'failed' ? -bow : bow;
      const startX =
        s.x! + (side > 0 ? this.RECT_WIDTH / 2 : -this.RECT_WIDTH / 2);
      const xMid = s.x! + side + (trans.TRANSITION_ID % 20);
      return `${startX},${startY} ${xMid},${startY} ${xMid},${endY} ${startX},${endY}`;
    }

    // Handle Horizontal paths (Forward and Backward)
    // Determine if we are going Forward (Left-to-Right) or Backward (Right-to-Left)
    const isForward = t.x! > s.x!;

    // If moving forward, start from the right side. If backward, start from the left side.
    const startX =
      s.x! +
      (isForward ? 1 : -1) *
        (s.type === 'start' ? this.CIRCLE_RADIUS : this.RECT_WIDTH / 2);

    // If moving forward, enter the left side. If backward, enter the right side.
    const endX =
      t.x! +
      (isForward ? -1 : 1) *
        (t.type === 'end' ? this.CIRCLE_RADIUS : this.RECT_WIDTH / 2);

    const midX = (startX + endX) / 2 + ((trans.TRANSITION_ID % 30) - 15);

    return `${startX},${startY} ${midX},${startY} ${midX},${endY} ${endX},${endY}`;
  }

  getLabelPos(trans: Transition) {
    const s = this.positionedStates.find(
      (st) => st.id === trans.SOURCE_STATE_ID
    );
    const t = this.positionedStates.find(
      (st) => st.id === trans.TARGET_STATE_ID
    );
    if (!s || !t) return { x: 0, y: 0, anchor: 'middle' };

    if (Math.abs(s.x! - t.x!) < 5) {
      const laneDiff = Math.abs((t.rowIndex || 0) - (s.rowIndex || 0));
      const bow = 60 + laneDiff * 25;
      const isFailed = t.type === 'failed';
      return {
        x: s.x! + (isFailed ? -bow - 10 : bow + 10),
        y: (s.y! + t.y!) / 2,
        anchor: isFailed ? 'end' : 'start',
      };
    }
    return {
      x: (s.x! + t.x!) / 2 - 20,
      y: (s.y! + t.y!) / 2 - 10,
      anchor: 'middle',
    };
  }

  openSubWorkflow(id: number | undefined) {
    console.log('ID: ', id);
    if (id) {
      this.selectedSubWorkflowId = id;
      console.log(
        'this.selectedSubWorkflowId(openSubWorkflow): ',
        this.selectedSubWorkflowId
      );
      this.isModalOpen = true;
    }
  }

  closeModal() {
    console.log('inside close modal');
    this.isModalOpen = false;
    this.selectedSubWorkflowId = null;
  }

  isJunction(state: State): boolean {
    if (state.type === 'junction') return true;

    // Check if any outgoing transition from this state has APPLY_JUNCTION = 1
    return this.transitions.some(
      (t) => t.SOURCE_STATE_ID === state.id && t.APPLY_JUNCTION === 1
    );
  }
  getEndPadding(state: State): number {
    if (state.type === 'start' || state.type === 'end')
      return this.CIRCLE_RADIUS;
    return this.RECT_WIDTH / 2 + 5; // 5px buffer for the arrow marker
  }

  getStateLogicMarkers(stateId: number) {
    const outgoing = this.transitions.filter(
      (t) => t.SOURCE_STATE_ID === stateId
    );
    const markers = [];

    if (outgoing.some((t) => t.APPLY_GUARD)) {
      markers.push({
        type: 'guard',
        color: '#f59e0b',
        title: 'Security Guard',
        details:
          'A validation logic is applied here to permit or deny the transition.',
      });
    }
    if (outgoing.some((t) => t.APPLY_ACTION)) {
      markers.push({
        type: 'action',
        color: '#3b82f6',
        title: 'Action Settings',
        details:
          'Automated system configuration or data updates occur during this phase.',
      });
    }
    if (outgoing.some((t) => t.APPLY_ACTIVITY)) {
      markers.push({
        type: 'activity',
        color: '#8b5cf6',
        title: 'Person/Manual Activity',
        details:
          'This step requires manual intervention or a human-task completion.',
      });
    }
    return markers;
  }

  openLogicDetails(event: MouseEvent, marker: any, state: State) {
    event.stopPropagation(); // Prevent triggering state clicks
    this.selectedLogicMarker = { ...marker, stateName: state.name };
    this.isLogicModalOpen = true;
  }

  isTransitionHighlighted(trans: Transition): boolean {
    return (
      this.hoveredTransitionId === trans.TRANSITION_ID ||
      this.hoveredStateId === trans.SOURCE_STATE_ID
    );
  }
  isTransitionActive(trans: Transition): boolean {
    return (
      this.hoveredTransitionId === trans.TRANSITION_ID ||
      this.hoveredStateId === trans.SOURCE_STATE_ID
    );
  }
  isEdgeActive(trans: Transition): boolean {
    return (
      this.hoveredTransitionId === trans.TRANSITION_ID ||
      this.hoveredStateId === trans.SOURCE_STATE_ID ||
      this.hoveredStateId === trans.TARGET_STATE_ID
    );
  }
  getEdgeColor(trans: Transition): string {
    if (this.hoveredTransitionId === trans.TRANSITION_ID) {
      return '#e63946'; // Bright Red when hovering directly on the edge
    }
    if (
      this.hoveredStateId === trans.SOURCE_STATE_ID ||
      this.hoveredStateId === trans.TARGET_STATE_ID
    ) {
      return '#3b82f6'; // Bright Blue (or your choice) when highlighting from state
    }
    return '#999'; // Default Gray
  }

  // Helper to determine the thickness
  getEdgeWidth(trans: Transition): string {
    return this.hoveredTransitionId === trans.TRANSITION_ID ||
      this.hoveredStateId === trans.SOURCE_STATE_ID ||
      this.hoveredStateId === trans.TARGET_STATE_ID
      ? '4'
      : '2';
  }
}
