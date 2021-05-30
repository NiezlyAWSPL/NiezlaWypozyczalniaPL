import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BooksComponent } from './books/books.component';
import { RentalsComponent } from './rentals/rentals.component';
import { MainComponent } from './main/main.component';
import {MessagesModule} from "primeng/messages";
import {RouterModule} from "@angular/router";
import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    RentalsComponent,
    MainComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    MessagesModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
