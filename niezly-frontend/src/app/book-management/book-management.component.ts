import {Component, OnInit} from '@angular/core';
import {
  BookDefinitionDTO, BookDefinitionFilterDTO,
  BookDTO,
  LibraryDTO,
  RentBookRequestDTO,
  ReserveBookRequestDTO,
  ReturnBookRequestDTO
} from "../dto/dto";
import {BookService} from "../service/book.service";
import {RentalService} from "../service/rental.service";
import {ReservationService} from "../service/reservation.service";
import {LibraryService} from "../service/library.service";
import {Constants} from "../utils/constants";

@Component({
  selector: 'app-book-management',
  templateUrl: './book-management.component.html',
  styleUrls: ['./book-management.component.scss']
})
export class BookManagementComponent implements OnInit {

  constructor(private bookService: BookService,
              private rentalService: RentalService,
              private reservationService: ReservationService,
              private libraryService: LibraryService) {
  }

  books: BookDefinitionDTO[];
  selectedBook: BookDefinitionDTO;
  loadedBooks: BookDefinitionDTO[];

  libraries: LibraryDTO[];
  selectedLibraryName: string = "";

  titlePhase: string = "";

  showBookReservationForm: boolean = false;
  showBookRentalForm: boolean = false;
  showBookReturnForm: boolean = false;

  userLogin: string;

  ngOnInit(): void {
    this.fetchLibraries();
    this.fetchBooks();
  }

  fetchLibraries() {
    this.libraryService.getAllLibraries().subscribe(libraries => {
      this.libraries = libraries;
      this.selectedLibraryName = "";
    });
  }

  fetchBooks() {
    const bookDefinitionFilter = new BookDefinitionFilterDTO();
    bookDefinitionFilter.libraryId = this.selectedLibraryName;
    bookDefinitionFilter.skip = 0;
    bookDefinitionFilter.take = 10;
    bookDefinitionFilter.titlePrefix = this.titlePhase;

    this.bookService.getBookDefinitions(bookDefinitionFilter).subscribe(bookDefinitions => {
      this.books = bookDefinitions;
      this.loadedBooks = bookDefinitions;
    });

    // this.bookService.getFilteredBooks(this.titlePhase).subscribe(books => {
    //   this.loadedBooks = books;
    //   this.books = books;
    // });

    // this.loadedBooks = this.books = [
    //   { pk: "BOOK3", bookDefinitionId: "BOOKDEF3", author: "B.L.", title: "Don't matter", libraryId: "LIB1", userId: "user", status: "Available", rentedDate: "none", reservationBeginDate: "none", reservationExpireDate: "none", },
    //   { pk: "BOOK4", bookDefinitionId: "BOOKDEF4", author: "L.L.", title: "How to play CS:GO", libraryId: "LIB1", userId: "user", status: "Available", rentedDate: "none", reservationBeginDate: "none", reservationExpireDate: "none", }
    // ];
  }

  setRentingUserLogin(event: any) {
    this.userLogin = event.target.value;
  }

  onFilterInput(value: string) {
    this.titlePhase = value;
    this.fetchBooks();
  }

  onReserveClick(book: BookDefinitionDTO) {
    this.selectedBook = book;
    this.showBookReservationForm = true;
  }

  onRentClick(book: BookDefinitionDTO) {
    this.selectedBook = book;
    this.showBookRentalForm = true;
  }

  onReturnClick(book: BookDefinitionDTO) {
    this.selectedBook = book;
    this.showBookReturnForm = true;
  }

  onReserveNoClick() {
    this.selectedBook = null;
    this.showBookReservationForm = false;
  }

  onReserveYesClick() {
    const reserveRequest = new ReserveBookRequestDTO();
    reserveRequest.bookDefinitionId = this.selectedBook.id;

    this.reservationService.reserveBook(reserveRequest).subscribe(() => {
      this.showBookReservationForm = false;
      this.selectedBook = null;
      this.fetchBooks();
    });
  }

  onRentNoClick() {
    this.selectedBook = null;
    this.showBookRentalForm = false;
  }

  onRentYesClick() {
    const rentRequest = new RentBookRequestDTO();
    rentRequest.pk = this.selectedBook.id;
    rentRequest.user = this.userLogin;

    this.rentalService.rentBook(rentRequest).subscribe(() => {
      this.showBookRentalForm = false;
      this.selectedBook = null;
      this.fetchBooks();
    });
  }

  onReturnNoClick() {
    this.selectedBook = null;
    this.showBookReturnForm = false;
  }

  onReturnYesClick() {
    const returnRequest = new ReturnBookRequestDTO();
    returnRequest.pk = this.selectedBook.id;

    this.rentalService.returnBook(returnRequest).subscribe(() => {
      this.showBookReturnForm = false;
      this.selectedBook = null;
      this.fetchBooks();
    });
  }
}
