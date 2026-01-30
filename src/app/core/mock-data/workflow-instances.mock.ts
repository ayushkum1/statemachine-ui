import { WorkflowInstance } from '../models/workflow-instance.model';

export const WORKFLOW_INSTANCES_MOCK: WorkflowInstance[] = [
  {
    id: 1001,
    workflowId: 1,
    workflowName: 'Loan Workflow',
    businessReferenceId: 'REF-LOAN-001',
    currentStateId: 3,
    status: 'IN_PROGRESS',
    createdDateTime: '2026-01-01T10:00:00Z',
    updatedDateTime: '2026-01-02T09:30:00Z',
  },
  {
    id: 1002,
    workflowId: 2,
    workflowName: 'KYC Workflow',
    businessReferenceId: 'REF-KYC-009',
    status: 'COMPLETED',
    createdDateTime: '2026-01-03T11:00:00Z',
    updatedDateTime: '2026-01-04T14:15:00Z',
  },
  {
    id: 9001,
    workflowId: 200,
    workflowName: 'Complex Order Fulfillment',
    businessReferenceId: 'Complex-Order-001',
    currentStateId: 4, // PAYMENT_INITIATED
    status: 'IN_PROGRESS',
    createdBy: 'system',
    updatedBy: 'system',
    createdDateTime: '2026-01-03T11:00:00Z',
    updatedDateTime: '2026-01-04T14:15:00Z',
  },
];
