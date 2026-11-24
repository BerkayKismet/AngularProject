import { Component, HostBinding, Input } from '@angular/core';
import {
  ControlContainer,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';

export type RegisterConsentsVariant = 'boxed' | 'switch';

@Component({
  selector: 'app-register-consents',
  standalone: true,
  imports: [ReactiveFormsModule, TranslocoModule],
  templateUrl: './register-consents.html',
  styleUrls: ['./register-consents.css'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
})
export class RegisterConsents {
  @Input() variant: RegisterConsentsVariant = 'boxed';

  @HostBinding('class.register-consents--boxed')
  get isBoxed(): boolean {
    return this.variant === 'boxed';
  }

  @HostBinding('class.register-consents--switch')
  get isSwitch(): boolean {
    return this.variant === 'switch';
  }
}
