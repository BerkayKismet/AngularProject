import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-google-signin-button',
  standalone: true,
  templateUrl: './google-signin-button.html',
  styleUrls: ['./google-signin-button.css'],
})
export class GoogleSigninButton {
  @Output() pressed = new EventEmitter<void>();
}
