import {Routes} from '@angular/router';
import {BooksComponent} from "./books/books.component";
import {RentalsComponent} from "./rentals/rentals.component";
import {MainComponent} from "./main/main.component";

export const routes: Routes = [
    {
        path: 'start',
        component: MainComponent,
        children: [
            {
                path: 'rentals',
                component: RentalsComponent
            },
            {
                path: 'books',
                component: BooksComponent
            }
        ]
    },
    {path: '', redirectTo: '/start', pathMatch: 'full'}
];

