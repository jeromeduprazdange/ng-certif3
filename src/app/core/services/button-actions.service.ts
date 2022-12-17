import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ButtonState } from '../enums/button-state.enum';
import { ActionState } from '../models/action-state.model';

@Injectable({
  providedIn: 'root',
})
export class ButtonActionsService {
  public actionsState: ActionState[] = [
    {
      name: 'saveLocationAction',
      state: new BehaviorSubject<ButtonState>(ButtonState.IDLE),
    },
  ];

  constructor() {}

  setState(name: string, state: ButtonState): void {
    this.actionsState.find((action) => (action.name = name))?.state.next(state);
  }
}
