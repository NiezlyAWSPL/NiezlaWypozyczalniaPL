import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {BookDTO, ReserveBookRequestDTO} from "../dto/dto";
import {SessionService} from "../session/session.service";
import {Constants} from "../utils/constants";

@Injectable({
    providedIn: 'root'
})
export class ReservationService {

    constructor(private http: HttpClient, private sessionService: SessionService) { }

    reserveBook(request: ReserveBookRequestDTO): Observable<BookDTO> {
        return this.http.post<BookDTO>(`${Constants.API_URL}/books/reserved`, request, {headers: this.sessionService.getHeaders()});
    }

    getLoggedReservations(): Observable<BookDTO[]> {
        return this.http.get<BookDTO[]>(`${Constants.API_URL}/books/reserved/loggedUser`, {
            headers: this.sessionService.getHeaders()
        });
    }
    getReservations(userId: string): Observable<BookDTO[]> {
        return this.http.get<BookDTO[]>(`${Constants.API_URL}/books/reserved`, {
            params: new HttpParams().set('user', userId),
            headers: this.sessionService.getHeaders()
        });
    }

    cancelReservation(pk: string): Observable<BookDTO> {
        return this.http.delete<BookDTO>(`${Constants.API_URL}/books/reserved/${pk}`, {headers: this.sessionService.getHeaders()});
    }

}
