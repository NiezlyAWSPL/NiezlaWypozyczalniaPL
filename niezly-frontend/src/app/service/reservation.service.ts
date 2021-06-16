import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {BookDTO, ReserveBookRequestDTO} from "../dto/dto";

@Injectable({
    providedIn: 'root'
})
export class ReservationService {

    constructor(private http: HttpClient) { }

    reserveBook(request: ReserveBookRequestDTO): Observable<BookDTO> {
        return this.http.post<BookDTO>(`/api/books/reserved`, request);
    }

    getReservations(user: string): Observable<BookDTO[]> {
        return this.http.get<BookDTO[]>(`/api/books/reserved`, { params: new HttpParams().set('user', user) });
    }

    cancelReservation(pk: number): Observable<BookDTO> {
        return this.http.delete<BookDTO>(`/api/books/reserved/${pk}`);
    }

    getFilteredReservations(titlePhase: string): Observable<BookDTO> {
        return this.http.get<BookDTO>(`/api/books/reserved/${titlePhase}`);
    }
}
