import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import { SetPassword } from './set-password.interface';

@Component({
  selector: 'set-password',
  templateUrl: './set-password.component.html',
  styleUrls: []
})
export class SetPasswordComponent {
  isRequesting: boolean;
  isSuccessful: boolean;
  errors: string;  

  constructor(
    private accountService: AccountService,
    private router: Router
  ) { }
  
  public setPassword(value: SetPassword) {
    this.isRequesting = true;
    this.accountService.setPassword(
        value.newPassword,
        value.confirmPassword
    )
    .finally(() => this.isRequesting = false)
    .subscribe(
      result  => {if (result) {
        this.isSuccessful = true;
      }},
      errors =>  this.errors = errors);

  }
}