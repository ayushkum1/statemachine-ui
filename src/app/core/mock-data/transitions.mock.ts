import { Transition } from '../models/transition.model';

export const TRANSITIONS_MOCK: Record<number, Transition[]> = {
  1: [
    {
      id: 1,
      sourceStateId: 1,
      targetStateId: 2,
      applyAction: false,
      applyGuard: false,
      applyJunction: false,
      applyJoin: false,
    },
    {
      id: 2,
      sourceStateId: 2,
      targetStateId: 3,
      event: 'START_PROCESS',
      applyAction: true,
      applyGuard: false,
      applyJunction: false,
      applyJoin: false,
    },
    {
      id: 3,
      sourceStateId: 3,
      targetStateId: 4,
      event: 'COMPLETE',
      applyAction: false,
      applyGuard: false,
      applyJunction: false,
      applyJoin: false,
    },
    {
      id: 4,
      sourceStateId: 3,
      targetStateId: 5,
      event: 'FAIL',
      applyAction: false,
      applyGuard: true,
      applyJunction: false,
      applyJoin: false,
    },
  ],
  2: [
    {
      id: 10,
      sourceStateId: 10,
      targetStateId: 11,
      applyAction: false,
      applyGuard: false,
      applyJunction: false,
      applyJoin: false,
    },
    {
      id: 11,
      sourceStateId: 11,
      targetStateId: 12,
      applyAction: true,
      applyGuard: false,
      applyJunction: false,
      applyJoin: false,
    },
  ],
  200: [
    // Start → Order created
    {
      id: 2001,
      sourceStateId: 1,
      targetStateId: 2,
      applyGuard: false,
      applyAction: false,
      applyJunction: false,
      applyJoin: false,
    },

    // Order created → Validate (guard)
    {
      id: 2002,
      sourceStateId: 2,
      targetStateId: 3,
      applyGuard: true,
      applyAction: false,
      applyJunction: false,
      applyJoin: false,
    },

    // Validate → Payment initiated (action)
    {
      id: 2003,
      sourceStateId: 3,
      targetStateId: 4,
      applyGuard: false,
      applyAction: true,
      applyJunction: false,
      applyJoin: false,
    },

    // Payment initiated → Payment confirmed (guard + action)
    {
      id: 2004,
      sourceStateId: 4,
      targetStateId: 5,
      applyGuard: true,
      applyAction: true,
      applyJunction: false,
      applyJoin: false,
    },

    // Payment confirmed → Packing
    {
      id: 2005,
      sourceStateId: 5,
      targetStateId: 6,
      applyGuard: false,
      applyAction: false,
      applyJunction: false,
      applyJoin: false,
    },

    // Packing → Shipped
    {
      id: 2006,
      sourceStateId: 6,
      targetStateId: 7,
      applyGuard: false,
      applyAction: false,
      applyJunction: false,
      applyJoin: false,
    },

    // Shipped → Delivered
    {
      id: 2007,
      sourceStateId: 7,
      targetStateId: 8,
      applyGuard: false,
      applyAction: false,
      applyJunction: false,
      applyJoin: false,
    },

    // ----- Failure paths -----

    // Validation failed
    {
      id: 2008,
      sourceStateId: 3,
      targetStateId: 90,
      applyGuard: true,
      applyAction: false,
      applyJunction: false,
      applyJoin: false,
    },

    // Retry validation
    {
      id: 2009,
      sourceStateId: 90,
      targetStateId: 3,
      applyGuard: false,
      applyAction: false,
      applyJunction: false,
      applyJoin: false,
    },

    // Payment failed
    {
      id: 2010,
      sourceStateId: 4,
      targetStateId: 91,
      applyGuard: true,
      applyAction: false,
      applyJunction: false,
      applyJoin: false,
    },

    // Retry payment
    {
      id: 2011,
      sourceStateId: 91,
      targetStateId: 4,
      applyGuard: false,
      applyAction: false,
      applyJunction: false,
      applyJoin: false,
    },

    // Shipping failed
    {
      id: 2012,
      sourceStateId: 7,
      targetStateId: 92,
      applyGuard: true,
      applyAction: false,
      applyJunction: false,
      applyJoin: false,
    },

    // Retry shipping
    {
      id: 2013,
      sourceStateId: 92,
      targetStateId: 7,
      applyGuard: false,
      applyAction: false,
      applyJunction: false,
      applyJoin: false,
    },
  ],
};
