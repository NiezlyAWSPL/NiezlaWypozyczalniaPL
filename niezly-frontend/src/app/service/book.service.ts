import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {BookDTO, BookFilterDTO, CreateBookRequestDTO} from "../dto/dto";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  getBook(bookId: number): Observable<BookDTO> {
    return this.http.get<BookDTO>(`/api/books/${bookId}`);
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
