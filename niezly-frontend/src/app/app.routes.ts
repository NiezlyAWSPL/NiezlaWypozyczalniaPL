import {Routes} from '@angular/router';
import {BooksComponent} from "./books/books.component";
import {ProfileComponent} from "./profile/profile.component";
import {MainComponent} from "./main/main.component";
import {BookManagementComponent} from "./book-management/book-management.component";
import {UserManagementComponent} from "./user-management/user-management.component";

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
                path: 'book/management',
                component: BookManagementComponent
            },
            {
                path: 'user/management',
                component: UserManagementComponent
            }
        ]
    },
    {path: '', redirectTo: '/start', pathMatch: 'full'}
];

