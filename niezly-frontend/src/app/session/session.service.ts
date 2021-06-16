import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {HeaderConstants} from "../dto/constants";

@Injectable({
    providedIn: 'root'
})
export class SessionService {

    constructor(private http: HttpClient) {
    }

    getHeaders() {
        let accessToken = localStorage.getItem(HeaderConstants.HEADER_ACCESS_TOKEN);
        return new HttpHeaders().set(HeaderConstants.HEADER_ACCESS_TOKEN, accessToken);
    }

}