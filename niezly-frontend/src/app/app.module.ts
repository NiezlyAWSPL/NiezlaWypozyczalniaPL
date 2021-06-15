import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from "@angular/router"
import {RentalsComponent} from "./rentals/rentals.component";
import {MenuComponent} from "./menu/menu.component";
import {AppComponent} from "./app.component";
import {BooksComponent} from "./books/books.component";
import {MainComponent} from "./main/main.component";
import {routes} from "./app.routes";

@NgModule({
    declarations: [
        AppComponent,
        BooksComponent,
        RentalsComponent,
        MainComponent,
        MenuComponent
    ],
    imports: [
        RouterModule.forRoot(routes),
        BrowserModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
