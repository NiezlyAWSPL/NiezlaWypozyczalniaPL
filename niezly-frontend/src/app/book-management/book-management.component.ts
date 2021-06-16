import { Component, OnInit } from '@angular/core';
import {BookDTO, BookFilterDTO, RentBookRequestDTO, ReserveBookRequestDTO, ReturnBookRequestDTO} from "../dto/dto";
import {BookService} from "../service/book.service";
import {RentalService} from "../service/rental.service";
import {ReservationService} from "../service/reservation.service";

@Component({
  selector: 'app-book-management',
  templateUrl: './book-management.component.html',
  styleUrls: ['./book-management.component.scss']
})
export class BookManagementComponent implements OnInit {

  constructor(private bookService: BookService,
              private rentalService: RentalService,
              private reservationService: ReservationService) {
  }

  books: BookDTO[];
  selectedBook: BookDTO;
  loadedBooks: BookDTO[];

  titleStartsWith: string;

  showBookReservationForm: boolean = false;
  showBookRentalForm: boolean = false;
  showBookReturnForm: boolean = false;


  ngOnInit(): void {
    this.fetchBooks();
  }

  fetchBooks() {
    const bookFilter = new BookFilterDTO();
    bookFilter.titleStartsWith = this.titleStartsWith;
    bookFilter.libraryId = "TODO libraryId";

    this.bookService.getBooks(bookFilter).subscribe(books => {
      this.loadedBooks = books;
      this.books = books;
    });

    this.loadedBooks = this.books = [
      { pk: "BOOK3", bookDefinitionId: "BOOKDEF3", author: "B.L.", title: "Don't matter", libraryId: "LIB1", userId: "user", status: "Available", rentedDate: "none", reservationBeginDate: "none", reservationExpireDate: "none", },
      { pk: "BOOK4", bookDefinitionId: "BOOKDEF4", author: "L.L.", title: "How to play CS:GO", libraryId: "LIB1", userId: "user", status: "Available", rentedDate: "none", reservationBeginDate: "none", reservationExpireDate: "none", }
    ];
  }

  isBookReserved(book: BookDTO) {
    return book.status.includes("Reserved");
  }

  isBookRented(book: BookDTO) {
    return book.status.includes("Rented");
  }

  onFilterInput(value: string) {
    this.titleStartsWith = value;
    this.books = this.loadedBooks.filter(b => b.title.startsWith(value)); // todo fetch filtered
  }

  onReserveClick(book: BookDTO) {
    this.selectedBook = book;
    this.showBookReservationForm = true;
  }

  onRentClick(book: BookDTO) {
    this.selectedBook = book;
    this.showBookRentalForm = true;
  }

  onReturnClick(book: BookDTO) {
    this.selectedBook = book;
    this.showBookReturnForm = true;
  }

  onReserveNoClick() {
    this.selectedBook = null;
    this.showBookReservationForm = false;
  }

  onReserveYesClick() {
    const reserveRequest = new ReserveBookRequestDTO();
    reserveRequest.pk = this.selectedBook.pk;
    reserveRequest.user = "currentUser";

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
    rentRequest.pk = this.selectedBook.pk;
    rentRequest.user = "TODO user";

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
    returnRequest.pk = this.selectedBook.pk;

    this.rentalService.returnBook(returnRequest)
    .subscribe(() => {
      this.showBookReturnForm = false;
      this.selectedBook = null;
      this.fetchBooks();
    })
  }
}
