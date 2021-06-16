import {Component, OnInit} from '@angular/core';
import {UserService} from "../service/user.service";
import {RoleConstants} from "../dto/constants";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  loggedUserAuthorities: string[] = [];

  constructor( private userService: UserService) {
  }


  ngOnInit() {
    this.userService.getCurrentUser().subscribe(u => {
      this.loggedUserAuthorities = u.authorities;
    })
  }

  isBibliotekarz() {
    return this.loggedUserAuthorities.some(u => u.includes(RoleConstants.ROLE_LIBRARIAN));
  }

}
