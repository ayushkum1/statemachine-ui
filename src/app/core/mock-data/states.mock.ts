import { State } from '../models/state.model';

export const STATES_MOCK: Record<number, State[]> = {
  1: [
    { id: 1, name: 'START', type: 'start' },
    { id: 2, name: 'INITIATED', type: 'normal' },
    { id: 3, name: 'PROCESSING', type: 'normal' },
    { id: 4, name: 'COMPLETED', type: 'end' },
    { id: 5, name: 'FAILED', type: 'failure' },
  ],
  2: [
    { id: 10, name: 'START', type: 'start' },
    { id: 11, name: 'KYC_PENDING', type: 'normal' },
    { id: 12, name: 'KYC_VERIFIED', type: 'end' },
  ],
  200: [
    { id: 1, name: 'START', type: 'start' },
    { id: 2, name: 'ORDER_CREATED', type: 'normal' },
    { id: 3, name: 'VALIDATE_ORDER', type: 'normal' },
    { id: 4, name: 'PAYMENT_INITIATED', type: 'normal' },
    { id: 5, name: 'PAYMENT_CONFIRMED', type: 'normal' },
    { id: 6, name: 'PACKING', type: 'normal' },
    { id: 7, name: 'SHIPPED', type: 'normal' },
    { id: 8, name: 'DELIVERED', type: 'end' },

    { id: 90, name: 'FAILED_VALIDATION', type: 'failure' },
    { id: 91, name: 'FAILED_PAYMENT', type: 'failure' },
    { id: 92, name: 'FAILED_SHIPPING', type: 'failure' },
  ],
};
