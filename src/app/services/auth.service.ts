import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/User.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  baseServerUrl = "https://localhost:7278/Api/";

  registerUser(user: User): Observable<any> {
    return this.http.post(
      this.baseServerUrl + "User/CreateUser",
      user,
      { responseType: 'text' }
    );
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseServerUrl + "User");
  }

  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${this.baseServerUrl}User/${userId}`);
  }

  deleteUser(user: User): Observable<any> {
    return this.http.delete<any>(`${this.baseServerUrl}User/${user.id}`);
  }

  updateUser(userId: number, updatedUserData: Partial<User>): Observable<any> {
    const updateUserUrl = `${this.baseServerUrl}User/${userId}`;
    return this.http.put<any>(updateUserUrl, updatedUserData);
  }
  
}
