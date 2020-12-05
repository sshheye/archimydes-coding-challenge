import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, takeUntil } from 'rxjs/operators';
import { AuthenticationService } from '../../../services/authentication.service';
import { AlertService } from '../../../services/alert.service';
import { Subject } from 'rxjs/internal/Subject';


@Component({
  styleUrls: ['./sign-in.component.css'],
  templateUrl: 'sign-in.component.html'
})
export class SignInComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  errorMessage: any;
  unsubscribe$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) {

  }

  ngOnInit() {
    // redirect to home if already logged in
    // if (this.authenticationService.currentUserValue && !this.authenticationService.isTokenExpired()) {
    //   this.router.navigate(['/dashboard']);
    // }
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.compose([Validators.required])],
      isAdmin: [false]
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.paramMap.get('returnUrl') || '/home';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.unsubscribe();
  }
  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.authenticationService.login(this.f.email.value, this.f.password.value, this.f.isAdmin.value)
      .pipe(first(),
        takeUntil(this.unsubscribe$))
      .subscribe(() => { this.router.navigate([this.returnUrl]); },
        err => {
          this.loading = false;
          this.errorMessage = (err.status == 401)
            ? "Invalid email or password" : this.alertService.error("Error Occured while processing your request.Please try again");;
          setTimeout(() => {
            this.errorMessage = null;
          }, 10000);

        });
  }
}
