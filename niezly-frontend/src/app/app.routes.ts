import {Routes} from '@angular/router';
import {BooksComponent} from "./books/books.component";
import {RentalComponent} from "./rental/rental.component";
import {MainComponent} from "./main/main.component";
import {AdminComponent} from "./admin/admin.component";
import {ReservationComponent} from "./reservation/reservation.component";

export const routes: Routes = [
    {
        path: 'start',
        component: MainComponent,
        children: [
            {
                path: 'reservations',
                component: ReservationComponent
            },
            {
                path: 'rentals',
                component: RentalComponent
            },
            {
                path: 'books',
                component: BooksComponent
            },
            {
                path: 'admin',
                component: AdminComponent
            }
        ]
    },
    {path: '', redirectTo: '/start', pathMatch: 'full'}
];

