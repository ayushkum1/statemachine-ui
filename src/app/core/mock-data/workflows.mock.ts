import { Workflow } from '../models/workflow.model';

export const WORKFLOWS_MOCK: Workflow[] = [
  {
    id: 1,
    name: 'Loan Workflow',
    businessProcessName: 'Loan Processing',
  },
  {
    id: 2,
    name: 'KYC Workflow',
    businessProcessName: 'Customer Onboarding',
  },
  {
    id: 200,
    name: 'Complex Order Fulfillment',
    businessProcessName: 'Order Processing',
  },
];
