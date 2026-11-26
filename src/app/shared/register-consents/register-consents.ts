import { NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  ControlContainer,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';

export type RegisterConsentsVariant = 'switch' | 'modal';

@Component({
  selector: 'app-register-consents',
  standalone: true,
  imports: [NgIf, NgTemplateOutlet, ReactiveFormsModule, TranslocoModule],
  templateUrl: './register-consents.html',
  styleUrls: ['./register-consents.css'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
})
export class RegisterConsents {
  @Input() variant: RegisterConsentsVariant = 'modal';
}
