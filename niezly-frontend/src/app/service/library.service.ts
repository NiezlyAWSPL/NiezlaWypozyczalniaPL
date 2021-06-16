import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {CreateLibraryRequestDTO, LibraryDTO} from "../dto/dto";

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  constructor(private http: HttpClient) { }

  createLibrary(createLibraryRequestDTO: CreateLibraryRequestDTO): Observable<LibraryDTO> {
    return this.http.post<LibraryDTO>('/api/libraries', createLibraryRequestDTO);
  }

  getAllLibraries(): Observable<LibraryDTO[]> {
    return this.http.get<LibraryDTO[]>(`/api/libraries`);
  }

}
