import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public showPassword: boolean = false;
  public showPasswordConfirm: boolean = false;
  public checkPasswords: boolean = true;
  public firstName: string = '';
  public lastName: string = '';
  public email: string = '';
  public password: string = '';
  public passwordConfirm: string = '';

  constructor(private toastr:ToastrService,private router:Router) {
    this.toastr.toastrConfig.iconClasses = {
      error: 'fa fa-times-circle',
      info: 'fa fa-info-circle',
      success: 'fa fa-check-circle',
      warning: 'fa fa-exclamation-circle'
    };
  }


  togglePassword() {
    this.showPassword = !this.showPassword;
    return this.showPassword;
  }

  togglePasswordConfirm() {
    this.showPasswordConfirm = !this.showPasswordConfirm;
    return this.showPasswordConfirm;
  }

  checkPassword() {
    if (this.password !== this.passwordConfirm)
      return (this.checkPasswords = false);
    else return (this.checkPasswords = true);
  }

  showSuccess() {
    this.toastr.success('Success!');
  }

  navigateToLogin() {
    this.router.navigate(['/']);
  }

}
