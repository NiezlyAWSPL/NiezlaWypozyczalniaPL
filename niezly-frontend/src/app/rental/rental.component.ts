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

  currentRentals: BookDTO[];
  oldRentals: RentalDTO[];
  selectedReservation: BookDTO;

  showReservationCancelModal: boolean = false;

  currentUserLogin: string;

  ngOnInit(): void {
    this.rentalService.getCurrentRentedBooksByLoggedUser().subscribe(rentals => this.currentRentals = rentals);
    this.rentalService.getLoggedUserOldRentals().subscribe(rentals => this.oldRentals = rentals);
  }
}
