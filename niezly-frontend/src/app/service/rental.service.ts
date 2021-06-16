import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {BookDTO, RentalDTO, RentBookRequestDTO} from "../dto/dto";
import {Observable} from "rxjs/index";
import {SessionService} from "../session/session.service";

class ReturnBookRequestDTO {
}

@Injectable({
    providedIn: 'root'
})
export class RentalService {

    constructor(private http: HttpClient,
                private sessionService: SessionService) {
    }

    rentBook(rentBookRequestDTO: RentBookRequestDTO): Observable<BookDTO> {
        return this.http.post<BookDTO>(`/api/books/rented`, rentBookRequestDTO, {headers: this.sessionService.getHeaders()});
    }

    returnBook(returnBookRequestDTO: ReturnBookRequestDTO): Observable<RentalDTO> {
        return this.http.post<RentalDTO>(`/api/books/rented/return`, returnBookRequestDTO, {headers: this.sessionService.getHeaders()});
    }

    getBookRentals(pk: string, skip: number, take: number): Observable<RentalDTO[]> {
        return this.http.get<RentalDTO[]>(`/api/books/rented/`, {
            params: new HttpParams().set('skip', skip).set('take', take),
            headers: this.sessionService.getHeaders()
        });
    }

    getCurrentRentedBookByUser(user: string): Observable<BookDTO[]> {
        return this.http.get<BookDTO[]>(`/api/books/rented/`, {
            params: new HttpParams().set('user', user),
            headers: this.sessionService.getHeaders()
        });
    }

    getUserOldRentals(user: string): Observable<RentalDTO[]> {
        return this.http.get<RentalDTO[]>(`/api/books/rented/`,
            {
                params: new HttpParams().set('user', user),
                headers: this.sessionService.getHeaders()
            }
        );
    }

    getFilteredRentals(titlePhase: string): Observable<RentalDTO[]> {
        return this.http.get<RentalDTO[]>(`/api/books/rented/filter/${titlePhase}`, {headers: this.sessionService.getHeaders()});
    }

}
