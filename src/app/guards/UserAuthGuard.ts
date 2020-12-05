import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Roles } from '../models/roles';

@Injectable({ providedIn: 'root' })
export class UserAuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private auth: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.auth.currentUserValue;
        if (!currentUser) {
            this.router.navigate(['/account/login'], {
                queryParams: {
                    returnUrl: this.auth.replaceAll(state.url, "%2F", "/")
                }
            });
            return false;
        }
        return currentUser.role === Roles.ADMIN || currentUser.role === Roles.USER
    }
}