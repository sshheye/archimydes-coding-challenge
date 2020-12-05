// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// import { User } from '../models/user';
// import { environment } from '../../environments/environment';
// import { AuthenticationService } from './authentication.service';

// @Injectable({ providedIn: 'root' })
// export class UserService {
//   public apiUrl: string = `${environment.apiRoot}/api/account`;
//   constructor(private http: HttpClient, private auth: AuthenticationService) { }

//   suspendUser(userIdDto: any) {
//     let headers = this.auth.authHeaders();
//     return this.http.put<any>(`${this.apiUrl}/user/suspend`, userIdDto, { headers: headers });
//   }
//   removeUserFromRole(userRoleDto: { userId: any; roleName: any; }) {
//     let headers = this.auth.authHeaders();
//     return this.http.post<any>(`${this.apiUrl}/user/remove-from-role`, userRoleDto, { headers: headers });
//   }
//   addUserToRole(userRoleDto: { userId: any; roleName: any; }) {
//     let headers = this.auth.authHeaders();
//     return this.http.post<any>(`${this.apiUrl}/user/add-to-role`, userRoleDto, { headers: headers });
//   }
//   getAllRoles() {
//     let headers = this.auth.authHeaders();
//     return this.http.get<any>(`${this.apiUrl}/user/all-roles`, { headers: headers });
//   }
//   getUsersRoles() {
//     let headers = this.auth.authHeaders();
//     return this.http.get<any>(`${this.apiUrl}/user/user-role`, { headers: headers });
//   }
//   getDescendants() {
//     let headers = this.auth.authHeaders();
//     return this.http.get<any>(`${this.apiUrl}/user/descendant`, { headers: headers });
//   }
//   getDescendantsTreeView() {
//     let headers = this.auth.authHeaders();
//     return this.http.get<any>(`${this.apiUrl}/user/descendant/tree-view`, { headers: headers });
//   }
//   confirmEmail(emailDto: any) {
//     let headers = this.auth.authHeaders();
//     return this.http.post<any>(`${this.apiUrl}/confirm-email`, emailDto, { headers: headers });
//   }

//   validateEmail(email: string) {
//     let headers = this.auth.authHeaders();
//     return this.http.get<any>(`${this.apiUrl}/validate-email/${email}`, { headers: headers });
//   }
//   forgotPassword(forgotPasswordDto: any) {
//     let headers = this.auth.authHeaders();
//     return this.http.post<any>(`${this.apiUrl}/forgot-password`, forgotPasswordDto, { headers: headers });
//   }
//   resetPassword(resetPasswordDto: any) {
//     let headers = this.auth.authHeaders();
//     return this.http.post<any>(`${this.apiUrl}/reset-password`, resetPasswordDto, { headers: headers });
//   }
//   adminResetPassword(userIdDto: any) {
//     let headers = this.auth.authHeaders();
//     return this.http.post<any>(`${this.apiUrl}/admin-reset-password`, userIdDto, { headers: headers });
//   }
//   adminDeleteUser(userIdDto: any) {
//     let headers = this.auth.authHeaders();
//     return this.http.delete<any>(`${this.apiUrl}/admin-remove-user/${userIdDto.userId}`, { headers: headers });
//   }
//   getAll() {
//     let headers = this.auth.authHeaders();
//     return this.http.get<User[]>(`${this.apiUrl}/user`, { headers: headers });
//   }

//   getById(id: string) {
//     let headers = this.auth.authHeaders();
//     return this.http.get<any>(`${this.apiUrl}/user/${id}`, { headers: headers });
//   }

//   register(user: any) {
//     let headers = this.auth.authHeaders();
//     return this.http.post<any>(`${this.apiUrl}/register`, user, { headers: headers });
//   }

//   update(user: any) {
//     let headers = this.auth.authHeaders();
//     return this.http.put<any>(`${this.apiUrl}/user/update`, user, { headers: headers });
//   }

// }
