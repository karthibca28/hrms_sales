import { Component } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
// import { AuthService } from '../shared/service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../core/services/auth.service';
import { ToastService } from '../icons/toast-service';
import { AuthfakeauthenticationService } from '../../core/services/authfake.service';
import { AuthService } from '../../shared/service/auth.service';
import Swal from 'sweetalert2';
import { LoadingService } from 'src/app/shared/service/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  
  // Login Form
  loginForm!: FormGroup;
  submitted = false;
  fieldTextType!: boolean;
  error = '';
  returnUrl!: string;
  userRole:any
  year: number = new Date().getFullYear();

  constructor(private authService: AuthService,private authenticationService: AuthenticationService,private router: Router,
    private authFackservice: AuthfakeauthenticationService,private route: ActivatedRoute, public toastService: ToastService,
    private loadingService: LoadingService) {
     
     }

  ngOnInit(): void {
   this.initLoginForm()
  }

  initLoginForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }
  get f() { return this.loginForm.controls; }

   toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  login() {
    console.log("data works")
    this.loadingService.showLoader();
    if (this.loginForm.valid) {
      this.authService.authenticate(this.loginForm.value).subscribe((resp: any) => {

        console.log("Login Data: ",resp);
        if (resp.accessToken) {
          sessionStorage.setItem('userInfo', JSON.stringify(resp));
          sessionStorage.setItem('scopes', JSON.stringify(resp.scopes));
          this.userRole = resp.data.userRoleId;
          this.loadingService.hideLoader();

          if (this.userRole === 1 || this.userRole === 2) {
            // this.sharedService.showSuccess(resp?.message);
            this.router.navigate(['/main/page']);
            Swal.fire({
              position: "top-end",
              icon: "success",  
              title: "LoggedIn Successfully",
              showConfirmButton: false,
              timer: 1250
            });
        // this.toastService.show(data.data, { classname: 'bg-danger text-white', delay: 15000 });
          } else {
            // this.sharedService.showSuccess(resp?.message);
            this.router.navigate(['/main/admin']);
          this.loadingService.hideLoader();
          }
          //  else {
          //   this.sharedService.showError('Access Denied!');
          // }
        } else {
          // this.sharedService.showError('User name or password mismatch');
          // this.loginError = 'User name or password mismatch';
        }
      }, (e:any)=>{
          // this.sharedService.showError(e?.error?.message);
          this.loadingService.hideLoader();
      })
    } else {
      this.loginForm.markAllAsTouched();
      this.loadingService.hideLoader();
    }
  }
}
