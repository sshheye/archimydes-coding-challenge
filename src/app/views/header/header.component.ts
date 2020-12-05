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
  constructor(private authService: AuthenticationService,) { }

  ngOnInit() {
    this.canEditStatus = this.authService.currentUserValue.role === Roles.ADMIN;
  }
  logout() {
    this.authService.logout();
  }
}
