import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BookDTO, RentalDTO} from "../dto/dto";
import {RentalService} from "../service/rental.service";
import {ReservationService} from "../service/reservation.service";
import {UserService} from "../service/user.service";

@Component({
  selector: 'app-rentals',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.scss']
})
export class RentalComponent implements OnInit {

  constructor(private router: Router,
              private rentalService: RentalService,
              private reservationService: ReservationService,
              private userService: UserService) {
  }

  rentals: RentalDTO[];
  reservations: BookDTO[];
  selectedReservation: BookDTO;

  showReservationCancelModal: boolean = false;

  currentUserLogin: string;

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(user => {
      this.rentalService.getUserOldRentals(user.login).subscribe(rentals => this.rentals = rentals);
      this.reservationService.getReservations(user.login).subscribe(reservations => this.reservations = reservations);
    })

    // this.rentals = [
    //   { pk: "RENTAL1", author: "A.H.", title: "My Struggle", libraryId: "LIB1", userId: "user", rentedDate: new Date(), returnDate: new Date()}
    // ];
    // this.reservations = [
    //   { pk: "BOOK1", bookDefinitionId: "BOOKDEF1", author: "J.P.", title: "Poradnik", libraryId: "LIB1", userId: "user", status: "Reserved", rentedDate: "today", reservationBeginDate: "today", reservationExpireDate: "today", }
    // ];
  }

  onReservationCancelClick(reservation: BookDTO) {
    this.selectedReservation = reservation;
    this.showReservationCancelModal = true;
  }

  onReservationCancelNoClick() {
    this.showReservationCancelModal = false;
  }

  onReservationCancelYesClick() {
    this.reservationService.cancelReservation(this.selectedReservation.pk).subscribe(book => {
      this.showReservationCancelModal = false;
    });
  }
}
