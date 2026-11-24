import { Component, EventEmitter, Output } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-google-signin-button',
  standalone: true,
  imports: [TranslocoModule],
  templateUrl: './google-signin-button.html',
  styleUrls: ['./google-signin-button.css'],
})
export class GoogleSigninButton {
  @Output() pressed = new EventEmitter<void>();
}
