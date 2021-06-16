import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {BookDTO, BookFilterDTO, CreateBookRequestDTO} from "../dto/dto";
import {HeaderConstants} from "../dto/constants";
import {SessionService} from "../session/session.service";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient,
              private sessionService: SessionService) { }

  getBook(bookId: number): Observable<BookDTO> {
    return this.http.get<BookDTO>(`/api/books/${bookId}`, {headers: this.sessionService.getHeaders()});
  }

  createBook(createBookRequestDTO: CreateBookRequestDTO): Observable<BookDTO> {
    return this.http.post<BookDTO>(`/api/books`, createBookRequestDTO);
  }

  getFirstAvailableByBookDefinition(bookDefinitionId: number): Observable<BookDTO> {
    return this.http.get<BookDTO>(`/api/books`, { params: new HttpParams().set('bookDefinitionId', bookDefinitionId) });
  }

  getBooks(bookFilter: BookFilterDTO) {
    return this.http.post<BookDTO[]>(`/api/books`, bookFilter);
  }
}
