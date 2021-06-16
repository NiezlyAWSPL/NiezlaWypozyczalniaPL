import {Injectable} from "@angular/core";
import {HttpHeaders} from "@angular/common/http";
import {HeaderConstants} from "../dto/constants";

@Injectable({
    providedIn: 'root'
})
export class SessionService {

    constructor() {
    }

    getHeaders() {
        let accessToken = localStorage.getItem(HeaderConstants.HEADER_ACCESS_TOKEN);
        let headers = new HttpHeaders();
        headers = headers.set(HeaderConstants.HEADER_AUTHORIZATION, HeaderConstants.BEARER_PREFIX + accessToken);
        return headers;
    }


}