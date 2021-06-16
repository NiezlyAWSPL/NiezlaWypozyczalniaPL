import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {UserDTO} from "../dto/dto";
import {Observable} from "rxjs/index";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) { }

    getUsers(loginPhase: string): Observable<UserDTO[]> {
        return this.http.get<UserDTO[]>(`/api/users/getFilteredUsers`, {params: new HttpParams().set("loginPhase", loginPhase)});
    }

}
