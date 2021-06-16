import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BookDefinitionDTO, BookDefinitionFilterDTO, CreateBookDefinitionDTO} from "../dto/dto";
import {Observable} from "rxjs/index";
import {SessionService} from "../session/session.service";

@Injectable({
    providedIn: 'root'
})
export class BookDefinitionService {

    constructor(private http: HttpClient, private sessionService: SessionService) { }

    createBookDefinition(createBookDefinitionDTO: CreateBookDefinitionDTO): Observable<BookDefinitionDTO> {
        return this.http.post<BookDefinitionDTO>(`/api/books/definitions`, createBookDefinitionDTO, {headers: this.sessionService.getHeaders()});
    }

    getFiltered(bookDefinitionFilterDTO: BookDefinitionFilterDTO): Observable<BookDefinitionDTO[]> {
        return this.http.post<BookDefinitionDTO[]>(`/api/books/definitions/filtered`, bookDefinitionFilterDTO, {headers: this.sessionService.getHeaders()});
    }

}
