import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {BookDTO, RentalDTO, RentBookRequestDTO} from "../dto/dto";
import {Observable} from "rxjs/index";

class ReturnBookRequestDTO {
}

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  constructor(private http: HttpClient) { }

  rentBook(rentBookRequestDTO: RentBookRequestDTO): Observable<BookDTO> {
    return this.http.post<BookDTO>(`/api/books/rented`, rentBookRequestDTO);
  }

  returnBook(returnBookRequestDTO: ReturnBookRequestDTO): Observable<RentalDTO> {
    return this.http.post<RentalDTO>(`/api/books/rented/return`, returnBookRequestDTO);
  }

  getBookRentals(pk: string, skip: number, take: number): Observable<RentalDTO[]> {
    return this.http.get<RentalDTO[]>(`/api/books/rented/`, { params: new HttpParams().set('skip', skip).set('take', take) });
  }

  getCurrentRentedBookByUser(user: string): Observable<BookDTO[]> {
    return this.http.get<BookDTO[]>(`/api/books/rented/`, { params: new HttpParams().set('user', user) });
  }

  getUserOldRentals(user: string): Observable<RentalDTO[]> {
    return this.http.get<RentalDTO[]>(`/api/books/rented/`, { params: new HttpParams().set('user', user) });
  }

}
