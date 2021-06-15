import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  constructor(private http: HttpClient) { }

  /*getLoggedUserRentals(): Observable<RentalDTO[]> {
    return this.http.get<RentalDTO[]>("/api/rentals");
  }*/

}
