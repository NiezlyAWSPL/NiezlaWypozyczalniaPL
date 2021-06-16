import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {CreateLibraryRequestDTO, LibraryDTO} from "../dto/dto";
import {SessionService} from "../session/session.service";

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  createLibrary(createLibraryRequestDTO: CreateLibraryRequestDTO): Observable<LibraryDTO> {
    return this.http.post<LibraryDTO>('/api/libraries', createLibraryRequestDTO, {headers: this.sessionService.getHeaders()});
  }

  getAllLibraries(): Observable<LibraryDTO[]> {
    return this.http.get<LibraryDTO[]>(`/api/libraries`, {headers: this.sessionService.getHeaders()});
  }

}
