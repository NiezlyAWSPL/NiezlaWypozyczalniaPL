import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {BookDTO, RentalDTO, RentBookRequestDTO} from "../dto/dto";
import {Observable} from "rxjs/index";
import {SessionService} from "../session/session.service";
import {Constants} from "../utils/constants";

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
        return this.http.post<BookDTO>(`${Constants.API_URL}/books/rented`, rentBookRequestDTO, {headers: this.sessionService.getHeaders()});
    }

    returnBook(returnBookRequestDTO: ReturnBookRequestDTO): Observable<RentalDTO> {
        return this.http.post<RentalDTO>(`${Constants.API_URL}/books/rented/return`, returnBookRequestDTO, {headers: this.sessionService.getHeaders()});
    }

    getCurrentRentedBookByUser(userId: string): Observable<BookDTO[]> {
        return this.http.get<BookDTO[]>(`${Constants.API_URL}/books/rented`, {
            params: new HttpParams().set('user', userId),
            headers: this.sessionService.getHeaders()
        });
    }

    getCurrentRentedBooksByLoggedUser(): Observable<BookDTO[]> {
        return this.http.get<BookDTO[]>(`${Constants.API_URL}/books/rented/loggedUser`, {
            headers: this.sessionService.getHeaders()
        });
    }

    getLoggedUserOldRentals(): Observable<RentalDTO[]> {
        return this.http.get<RentalDTO[]>(`${Constants.API_URL}/books/rented/loggedUser/old`,
            {
                headers: this.sessionService.getHeaders()
            }
        );
    }

    getUserOldRentals(user: string): Observable<RentalDTO[]> {
        return this.http.get<RentalDTO[]>(`${Constants.API_URL}/books/rented/old`,
            {
                params: new HttpParams().set('user', user),
                headers: this.sessionService.getHeaders()
            }
        );
    }

}
