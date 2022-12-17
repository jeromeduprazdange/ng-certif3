import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import { ButtonActionsService } from 'src/app/core/services/button-actions.service';
import { ButtonState } from '../../../core/enums/button-state.enum';

@Component({
  selector: 'app-state-button',
  templateUrl: './state-button.component.html',
  styleUrls: ['./state-button.component.scss'],
})
export class StateButtonComponent implements OnInit {
  @Input() actionObservable!: Observable<any>;
  @Input() idleClasses: string = 'btn btn-primary';
  @Input() workingClasses: string = 'btn btn-working';
  @Input() doneClasses: string = 'btn btn-done';
  @Input() disabled: boolean = false;

  @ContentChild('idle') idleTemplate?: TemplateRef<any>;
  @ContentChild('working') workingTemplate?: TemplateRef<any>;
  @ContentChild('done') doneTemplate?: TemplateRef<any>;

  @Output() clickEvent: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('idleDefault', { static: true })
  idleDefaultTemplate!: TemplateRef<any>;
  @ViewChild('workingDefault', { static: true })
  workingDefaultTemplate!: TemplateRef<any>;
  @ViewChild('doneDefault', { static: true })
  doneDefaultTemplate!: TemplateRef<any>;

  private currentState!: ButtonState;

  private resetTimeout = 500;

  constructor(private buttonActionsService: ButtonActionsService) {}

  ngOnInit(): void {
    this.buttonActionsService.actionsState
      .find((action: any) => (action.name = 'saveZipCodeAction'))
      ?.state.subscribe((state) => {
        this.currentState = state;

        if (state !== ButtonState.IDLE) {
          setTimeout(() => {
            this.currentState = ButtonState.IDLE;
          }, this.resetTimeout);
        }
      });
  }

  onClick(): void {
    this.clickEvent.emit();
  }

  get currentTemplate(): TemplateRef<any> {
    return {
      [ButtonState.IDLE]: this.idleTemplate ?? this.idleDefaultTemplate,
      [ButtonState.WORKING]:
        this.workingTemplate ?? this.workingDefaultTemplate,
      [ButtonState.DONE]: this.doneTemplate ?? this.doneDefaultTemplate,
    }[this.currentState];
  }

  get currentClasses(): string {
    return {
      [ButtonState.IDLE]: this.idleClasses,
      [ButtonState.WORKING]: this.workingClasses,
      [ButtonState.DONE]: this.doneClasses,
    }[this.currentState];
  }

  get isDisabled(): boolean {
    return this.currentState !== ButtonState.IDLE || this.disabled;
  }
}
