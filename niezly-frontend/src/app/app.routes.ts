import {Routes} from '@angular/router';
import {BooksComponent} from "./books/books.component";
import {ProfileComponent} from "./profile/profile.component";
import {MainComponent} from "./main/main.component";
import {AdminComponent} from "./admin/admin.component";

export const routes: Routes = [
    {
        path: 'start',
        component: MainComponent,
        children: [
            {
                path: 'profile',
                component: ProfileComponent
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

