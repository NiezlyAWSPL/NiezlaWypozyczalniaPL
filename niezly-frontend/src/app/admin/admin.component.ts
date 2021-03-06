import {Component} from '@angular/core';
import {BookDTO, CreateBookRequestDTO, LibraryDTO, RentalDTO, RentBookRequestDTO} from "../dto/dto";
import {RentalService} from "../service/rental.service";
import {UserService} from "../service/user.service";
import {ReservationService} from "../service/reservation.service";
import {LibraryService} from "../service/library.service";
import {BookService} from "../service/book.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  constructor(private userService: UserService,
              private bookService: BookService,
              private reservationService: ReservationService,
              private rentalService: RentalService,
              private libraryService: LibraryService) {
  }

  libraries: LibraryDTO[] = [];
  rentals: BookDTO[] = [];
  reservations: BookDTO[] = [];

  selectedRental: BookDTO;
  selectedReservation: BookDTO;

  showBookRentalForm: boolean = false;
  showBookReturnDialog: boolean = false;
  showReservationCancelDialog: boolean = false;
  showAddBookForm: boolean = false;

  fetchUserData(userId: string) {
    this.reservationService.getReservations(userId).subscribe(reservations => this.reservations = reservations);
    this.rentalService.getCurrentRentedBookByUser(userId).subscribe(rentals => this.rentals = rentals);
  }

  fetchLibraries() {
    this.libraryService.getAllLibraries().subscribe(libraries => this.libraries = libraries);
  }

  openReturnDialog(rental: BookDTO) {
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

  openAddBookForm() {
    this.showAddBookForm = true;
    this.fetchLibraries();
  }

  onRentalYesClick(bookId: string, userId: string) {
    const rentBookRequest = new RentBookRequestDTO();
    rentBookRequest.pk = bookId;
    rentBookRequest.user = userId;

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

  onAddBookNoClick() {
    this.showAddBookForm = false;
  }

  onAddBookYesClick(libraryId: string, title: string, author: string) {
    const createBookRequest: CreateBookRequestDTO = {
      libraryId: libraryId,
      title: title,
      author: author
    };

    this.bookService.createBook(createBookRequest).subscribe(_ => {
      this.showAddBookForm = false;
    })
  }

}
