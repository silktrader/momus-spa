import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent {
  enteredPassword = new FormControl(undefined);

  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    private readonly as: AuthenticationService
  ) {}

  public login(): void {
    this.as.login(this.enteredPassword.value);
  }
}
