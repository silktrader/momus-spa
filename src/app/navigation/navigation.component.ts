import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../dialogs/login/login-dialog.component';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  admin$ = this.as.admin$;

  constructor(public dialog: MatDialog, private as: AuthenticationService) {}

  public promptPassword(): void {
    this.dialog.open(LoginDialogComponent);
  }

  public logoff(): void {
    this.as.logout();
  }
}
