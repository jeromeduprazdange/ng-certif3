import { BehaviorSubject } from 'rxjs';
import { ButtonState } from '../enums/button-state.enum';

export interface ActionState {
  name: string;
  state: BehaviorSubject<ButtonState>;
}
