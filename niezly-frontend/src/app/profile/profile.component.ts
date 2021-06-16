import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BookDTO, RentalDTO} from "../dto/dto";
import {RentalService} from "../service/rental.service";
import {ReservationService} from "../service/reservation.service";

@Component({
  selector: 'app-rentals',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private router: Router,
              private rentalService: RentalService,
              private reservationService: ReservationService) {
  }

  loadedRentals: RentalDTO[];
  rentals: RentalDTO[];
  selectedRental: RentalDTO;

  reservations: BookDTO[];

  showReturnModal: boolean = false;

  ngOnInit(): void {
    // todo proper usernames

    this.rentalService.getUserOldRentals("user").subscribe(rentals => {
      this.loadedRentals = rentals;
      this.rentals = rentals;
    });

    this.reservationService.getReservations("user").subscribe(reservations => {
      this.reservations = reservations;
    });
  }

  onRentalClick(rental: RentalDTO) {
    this.selectedRental = rental;
  }

  onReturnNoClick() {
    this.showReturnModal = false;
  }

  onReturnYesClick() {
    // todo send return request
    this.showReturnModal = false;
  }
}
