import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Roles } from '../models/roles';

@Injectable({ providedIn: 'root' })
export class AdminAuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private auth: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.auth.currentUserValue;
        if (!currentUser || this.auth.isTokenExpired(currentUser.token)) {
            this.router.navigate(['/account/login'], {
                queryParams: {
                    returnUrl: this.auth.replaceAll(state.url, "%2F", "/")
                }
            });
            return false;
        }
        return currentUser.role === Roles.ADMIN;
    }
}