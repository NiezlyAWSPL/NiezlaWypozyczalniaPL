import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {BookDefinitionDTO, BookDefinitionFilterDTO, BookDTO, CreateBookRequestDTO} from "../dto/dto";
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
    return this.http.post<BookDTO>(`/api/books`, createBookRequestDTO, {headers: this.sessionService.getHeaders()});
  }

  getFirstAvailableByBookDefinition(bookDefinitionId: number): Observable<BookDTO> {
    return this.http.get<BookDTO>(`/api/books`, {
      params: new HttpParams().set('bookDefinitionId', bookDefinitionId) ,
      headers: this.sessionService.getHeaders()
    });
  }

  getBookDefinitions(bookDefinitionFilter: BookDefinitionFilterDTO): Observable<BookDefinitionDTO[]> {
    return this.http.post<BookDefinitionDTO[]>(`/api/books/definitions/filtered`, bookDefinitionFilter, {headers: this.sessionService.getHeaders()});
  }

  getFilteredBooks(titlePhase: string): Observable<BookDTO[]> {
    return this.http.get<BookDTO[]>(`/api/books/filter/{${titlePhase}`, {headers: this.sessionService.getHeaders()});
  }
}

