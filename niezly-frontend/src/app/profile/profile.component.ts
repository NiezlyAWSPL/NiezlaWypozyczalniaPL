import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BookDTO, RentalDTO} from "../dto/dto";
import {RentalService} from "../service/rental.service";

@Component({
  selector: 'app-rentals',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private router: Router,
              private rentalService: RentalService) {
  }

  loadedRentals: RentalDTO[];
  rentals: RentalDTO[];
  selectedRental: RentalDTO;

  showReturnModal: boolean = false;

  ngOnInit(): void {
    this.rentalService.getUserOldRentals("user") // todo proper user name
        .subscribe(rentals => {
          this.loadedRentals = rentals;
          this.rentals = rentals;
        })
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
