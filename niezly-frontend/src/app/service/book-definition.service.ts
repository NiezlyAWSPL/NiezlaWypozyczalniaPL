import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BookDefinitionDTO, BookDefinitionFilterDTO, CreateBookDefinitionDTO} from "../dto/dto";
import {Observable} from "rxjs/index";

@Injectable({
    providedIn: 'root'
})
export class BookDefinitionService {

    constructor(private http: HttpClient) { }

    createBookDefinition(createBookDefinitionDTO: CreateBookDefinitionDTO): Observable<BookDefinitionDTO> {
        return this.http.post<BookDefinitionDTO>(`/api/books/definitions`, createBookDefinitionDTO);
    }

    getFiltered(bookDefinitionFilterDTO: BookDefinitionFilterDTO): Observable<BookDefinitionDTO[]> {
        return this.http.post<BookDefinitionDTO[]>(`/api/books/definitions/filtered`, bookDefinitionFilterDTO);
    }

}
