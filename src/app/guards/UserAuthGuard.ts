import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Policy } from '../models/policies';

@Injectable({ providedIn: 'root' })
export class UserAuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private auth: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.auth.currentUserValue;
        if (!currentUser || this.auth.isTokenExpired()) {
            this.router.navigate(['/account/login'], {
                queryParams: {
                    returnUrl: this.auth.replaceAll(state.url, "%2F", "/")
                }
            });
            return false;
        }
        const roles = currentUser.roles.split(',');
        return roles.includes(Policy.ADMIN) || roles.includes(Policy.USER)
    }
}