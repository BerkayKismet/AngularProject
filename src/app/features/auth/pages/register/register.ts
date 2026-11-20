import { Component, Input, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLinkWithHref } from '@angular/router';
import { GoogleSigninButton } from '../../components/google-signin-button/google-signin-button';
import { PasswordField } from '../../components/password-field/password-field';
import { Icon } from '../../../../shared/ui/icon/icon';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLinkWithHref,
    PasswordField,
    GoogleSigninButton,
    Icon,
  ],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class Register {
  private readonly fb = inject(FormBuilder);

  @Input() loginLink: string | unknown[] = '/login';

  readonly form = this.fb.nonNullable.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    termsAccepted: [false, [Validators.requiredTrue]],
    marketingAccepted: [false],
    surveyAccepted: [false],
  });

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    console.log('register', this.form.getRawValue());
  }

  onGoogleSignIn(): void {
    console.log('google-sign-in');
  }

  onCorporateAccount(): void {
    console.log('corporate-account');
  }
}
