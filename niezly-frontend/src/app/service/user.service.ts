import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {UserDTO} from "../dto/dto";
import {Observable} from "rxjs/index";
import {SessionService} from "../session/session.service";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient, private sessionService: SessionService) { }

    getUsers(loginPhase: string): Observable<UserDTO[]> {
        return this.http.get<UserDTO[]>(`/api/users/${loginPhase}`);
    }
    
    getCurrentUser(): Observable<UserDTO> {
        return this.http.get<UserDTO>(`/api/users/current`, {headers: this.sessionService.getHeaders()});
    }

}
