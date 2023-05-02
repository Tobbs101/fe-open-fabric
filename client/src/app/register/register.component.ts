import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from 'src/url';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm:FormGroup;

  public showPassword: boolean = false;
  public showPasswordConfirm: boolean = false;
  public checkPasswords: boolean = true;
  public checkForm: boolean = false;
  public firstName: string = '';
  public lastName: string = '';
  public email: string = '';
  public password: string = '';
  public passwordConfirm: string = '';

  constructor(private toastr:ToastrService,private router:Router,private formBuilder: FormBuilder,private http: HttpClient) {
    this.toastr.toastrConfig.iconClasses = {
      error: 'fa fa-times-circle',
      info: 'fa fa-info-circle',
      success: 'fa fa-check-circle',
      warning: 'fa fa-exclamation-circle'
    };
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      firstName:['', Validators.required],
      lastName:['', Validators.required],
      password: ['', Validators.required],
    });
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

  register(){
    console.log('form',this.registerForm);
    console.log('form',this.registerForm.invalid);
    this.checkPassword();
    setTimeout(() => {
    const formData = this.registerForm.value;
    if (this.registerForm.invalid){
      this.checkForm = true;
    } else if (this.checkPasswords === false){
      this.toastr.error("Passwords don't match!");
    } else {
      this.checkPasswords = true;
      this.http.post(`${baseUrl}/api/v1.0/user/create`, formData).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  },2000)
  }

  showSuccess() {
    this.toastr.success('Success!');
  }

  navigateToLogin() {
    this.router.navigate(['/']);
  }

}
