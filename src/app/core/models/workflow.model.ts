import { State } from './state.model';
import { Transition } from './transition.model';

export interface Workflow {
  id: number;
  name: string;
  businessProcessName: string;

  states?: State[];
  transitions?: Transition[];
}
