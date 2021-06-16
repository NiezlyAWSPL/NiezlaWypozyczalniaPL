import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from "@angular/router"
import {ProfileComponent} from "./profile/profile.component";
import {MenuComponent} from "./menu/menu.component";
import {AppComponent} from "./app.component";
import {BooksComponent} from "./books/books.component";
import {MainComponent} from "./main/main.component";
import {routes} from "./app.routes";
import {BookManagementComponent} from "./book-management/book-management.component";
import {UserManagementComponent} from "./user-management/user-management.component";
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [
        AppComponent,
        BooksComponent,
        ProfileComponent,
        MainComponent,
        MenuComponent,
        BookManagementComponent,
        UserManagementComponent,
    ],
    imports: [
        RouterModule.forRoot(routes),
        BrowserModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
