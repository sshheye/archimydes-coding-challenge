import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { Roles } from '../../models/roles';

@Component({ template: '' })

export class HomeComponent implements OnInit {
  constructor(private router: Router, private authenticationService: AuthenticationService) {
  }
  ngOnInit() {
    this.authenticationService
      .currentUser
      .subscribe(user => {
        const role = user?.role
        if (role === Roles.ADMIN) {
          this.router.navigate(['/admin/user-stories']);
        }
        else if (role === Roles.USER) {
          this.router.navigate(['/user/user-stories']);
        }
        else {
          this.router.navigate(['/account/login']);
        }
      })
  }
}
