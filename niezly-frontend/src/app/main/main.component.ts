import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common'
import {ActivatedRoute} from "@angular/router";
import {HeaderConstants} from "../dto/constants";

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

    constructor(private activatedRoute: ActivatedRoute,
                private location: Location) {
    }

    ngOnInit(): void {
        this.activatedRoute.fragment
            .subscribe(fragment => {
                let params = new URLSearchParams(fragment);
                let accessToken = params.get(HeaderConstants.HEADER_ACCESS_TOKEN);
                if (accessToken) {
                    localStorage.setItem(HeaderConstants.HEADER_ACCESS_TOKEN, accessToken)
                    const pathWithoutHash = this.location.path(false);
                    this.location.replaceState(pathWithoutHash);
                }
            });
    }
}
