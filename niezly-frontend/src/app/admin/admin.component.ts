import {Component} from '@angular/core';
import {BookDTO, RentalDTO, RentBookRequestDTO, ReturnBookRequestDTO} from "../dto/dto";
import {RentalService} from "../service/rental.service";
import {UserService} from "../service/user.service";
import {ReservationService} from "../service/reservation.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  constructor(private userService: UserService,
              private reservationService: ReservationService,
              private rentalService: RentalService) {
  }

  login: string = "";

  rentals: RentalDTO[] = [];
  reservations: BookDTO[] = [];

  selectedRental: RentalDTO;
  selectedReservation: BookDTO;

  showBookRentalForm: boolean = false;
  showBookReturnDialog: boolean = false;
  showReservationCancelDialog: boolean = false;

  loadUserData(userLogin: string) {
    this.login = userLogin;
    this.reservationService.getReservations(userLogin).subscribe(reservations => this.reservations = reservations);
    this.rentalService.getUserOldRentals(userLogin).subscribe(rentals => this.rentals = rentals);
  }

  openReturnDialog(rental: RentalDTO) {
    this.selectedRental = rental;
    this.showBookReturnDialog = true;
  }

  openRentalDialog() {
    this.showBookRentalForm = true;
  }

  openReservationCancelDialog(reservation: BookDTO) {
    this.selectedReservation = reservation;
    this.showReservationCancelDialog = true;
  }

  onRentalYesClick(bookId: string) {
    const rentBookRequest = new RentBookRequestDTO();
    rentBookRequest.pk = bookId;
    rentBookRequest.user = this.login;

    this.rentalService.rentBook(rentBookRequest).subscribe(book => {
      this.showBookRentalForm = false;
    });
  }

  onRentalNoClick() {
    this.showBookRentalForm = false;
  }

  onReturnYesClick() {
    const returnBookRequest = {pk: this.selectedRental.pk};

    this.rentalService.returnBook(returnBookRequest).subscribe(_ => {
      this.showBookReturnDialog = false;
      this.selectedRental = null;
    })
  }

  onReturnNoClick() {
    this.showBookReturnDialog = false;
    this.selectedRental = null;
  }

  onCancelReservationNoClick() {
    this.showReservationCancelDialog = false;
    this.selectedReservation = null;
  }

  onCancelReservationYesClick() {
    this.reservationService.cancelReservation(this.selectedReservation.pk).subscribe(_ => {
      this.showReservationCancelDialog = false;
      this.selectedReservation = null;
    });
  }
}
