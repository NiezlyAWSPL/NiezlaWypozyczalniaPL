import {Component, OnInit} from '@angular/core';
import {BookDTO, RentalDTO, UserDTO} from "../dto/dto";
import {RentalService} from "../service/rental.service";
import {UserService} from "../service/user.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private userService: UserService,
              private rentalService: RentalService) {
  }

  userLogin: string;
  rentals: RentalDTO[];
  reservations: BookDTO[];

  showBookRentalForm: boolean = false;
  showBookReturnForm: boolean = false;

  ngOnInit(): void {
    this.rentals = this.reservations = [];
  }

  loadUserData() {
    console.log(this.userLogin);
  }

  openManualRentalDialog() {
    this.showBookRentalForm = true;
  }

  onRentalYesClick(bookTitle: string) {
    this.showBookRentalForm = false;
  }

  onRentalNoClick() {
    this.showBookRentalForm = false;
  }

  onReturnYesClick() {
    this.showBookReturnForm = false;
  }

  onReturnNoClick() {
    this.showBookReturnForm = false;
  }
}
