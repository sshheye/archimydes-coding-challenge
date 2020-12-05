import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import jwt_decode, { JwtPayload } from 'jwt-decode'
@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    public apiUrl: string = environment.apiRoot;
    token: any;
    constructor(private http: HttpClient, private router: Router) {
        this.currentUserSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
        this.currentUser = this.currentUserSubject.asObservable();
        this.token = this.getToken();
    }

    public getToken() {
        return this.getUserFromLocalStorage()?.token;
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(email: string, password: string, isAdmin: boolean) {
        return this.http.post<any>(`${this.apiUrl}/api/v1/signin`, { email, password, isAdmin })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    this.token = user.token;
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        this.router.navigate(['/account/login'])
    }
    public authHeaders() {
        // create authorization header with our jwt token
        if (this.token) {
            let headers = new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            });
            return headers;
        }
    }
    getUserFromLocalStorage() {
        const userDetails = JSON.parse(localStorage.getItem('currentUser'))
        if (!userDetails || this.isTokenExpired(userDetails?.token))
            return null;
        return userDetails;
    }

    public replaceAll(input: string, find: string, replace: string): string {
        return input.replace(new RegExp(find, 'g'), replace);
    }

    isTokenExpired(token?: string): boolean {
        if (!token) token = this.getToken();
        if (!token) return true;

        const date = this.getTokenExpirationDate(token);
        if (date === undefined) return false;
        return !(date.valueOf() > new Date().valueOf());
    }
    getTokenExpirationDate(token: string): Date {
        const decoded = jwt_decode<JwtPayload>(token);
        if (decoded.iat === undefined) return null;
        const date = new Date(0);
        const expiresAt = 3600;
        date.setUTCSeconds(decoded.iat + expiresAt);
        return date;
    }
}
