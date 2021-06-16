import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BookDTO, RentalDTO} from "../dto/dto";
import {RentalService} from "../service/rental.service";
import {ReservationService} from "../service/reservation.service";
import {UserService} from "../service/user.service";

@Component({
  selector: 'app-rentals',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {

  constructor(private router: Router,
              private rentalService: RentalService,
              private reservationService: ReservationService) {
  }

  reservations: BookDTO[];
  selectedReservation: BookDTO;

  showReservationCancelModal: boolean = false;

  ngOnInit(): void {
      this.reservationService.getLoggedReservations().subscribe(reservations => this.reservations = reservations);
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
