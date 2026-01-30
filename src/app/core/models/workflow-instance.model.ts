export interface WorkflowInstance {
  id: number;

  workflowId: number;
  workflowName: string;

  businessReferenceId?: string;

  currentStateId?: number;

  status: 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';

  createdDateTime: string;
  updatedDateTime: string;

  createdBy?: string;
  updatedBy?: string;
}
