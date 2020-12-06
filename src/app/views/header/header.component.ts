import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Roles } from 'src/app/models/roles';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  canEditStatus: boolean;
  role: string;
  constructor(private authService: AuthenticationService,) { }

  ngOnInit() {
    this.role = this.authService.currentUserValue?.role;
    this.canEditStatus = this.role === Roles.ADMIN;
  }
  logout() {
    this.authService.logout();
  }
}
