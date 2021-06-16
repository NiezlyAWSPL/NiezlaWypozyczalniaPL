import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from "@angular/router"
import {ProfileComponent} from "./profile/profile.component";
import {MenuComponent} from "./menu/menu.component";
import {AppComponent} from "./app.component";
import {BooksComponent} from "./books/books.component";
import {MainComponent} from "./main/main.component";
import {routes} from "./app.routes";
import {AdminComponent} from "./admin/admin.component";
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from "@angular/forms";

@NgModule({
    declarations: [
        AppComponent,
        BooksComponent,
        ProfileComponent,
        MainComponent,
        MenuComponent,
        AdminComponent,
    ],
    imports: [
        RouterModule.forRoot(routes),
        BrowserModule,
        HttpClientModule,
        FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
