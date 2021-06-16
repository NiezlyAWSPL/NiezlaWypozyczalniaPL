import { Component, OnInit } from '@angular/core';
import {BookDTO, BookFilterDTO, RentalDTO, RentBookRequestDTO, ReturnBookRequestDTO, UserDTO} from "../dto/dto";
import {BookService} from "../service/book.service";
import {RentalService} from "../service/rental.service";
import {UserService} from "../service/user.service";

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  constructor(private userService: UserService,
              private rentalService: RentalService) {
  }

  users: UserDTO[];
  loadedUsers: UserDTO[];

  loginPhase: string;

  selectedUser: UserDTO;
  selectedUserRentals: RentalDTO[];
  selectedUserReservations: BookDTO[];

  ngOnInit(): void {
    this.users = this.loadedUsers = [];
    this.selectedUserRentals = this.selectedUserReservations = [];
    this.loginPhase = "";
    this.init();
  }

  init() {
    this.userService.getUsers(this.loginPhase).subscribe(users => {
      this.loadedUsers = users;
      this.users = users;
    });
  }

  onUserClick(user: UserDTO) {
    this.selectedUser = user;
  }

  onFilterInput(value: string) {
    this.loginPhase = value;
    this.users = this.users.filter(u => u.login.startsWith(value));
  }
}
