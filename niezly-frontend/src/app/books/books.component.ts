import {Component, OnInit} from '@angular/core';
import {BookDTO, BookFilterDTO, RentBookRequestDTO} from "../dto/dto";
import {BookService} from "../service/book.service";
import {ReservationService} from "../service/reservation.service";
import {UserService} from "../service/user.service";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  constructor(private bookService: BookService,
              private reservationService: ReservationService,
              private userService: UserService) {
  }

  books: BookDTO[];
  selectedBook: BookDTO;

  titlePhase: string;

  currentUserLogin: string;

  ngOnInit(): void {
    this.fetchCurrentUserLogin();
    this.fetchBooks();
  }

  fetchCurrentUserLogin() {
    this.userService.getCurrentUser().subscribe(user => {
      this.currentUserLogin = user.login;
    })
  }

  fetchBooks() {
    const bookFilter = new BookFilterDTO();
    bookFilter.titleStartsWith = this.titlePhase;
    bookFilter.libraryId = "LIB1";

    this.bookService.getBooks(bookFilter).subscribe(books => {
      this.books = books;
    });

    // this.loadedBooks = this.books = [
    //   { pk: "BOOK1", bookDefinitionId: "BOOKDEF1", author: "K.F.D.", title: "Instrukcja", libraryId: "LIB1", userId: "user", status: "Reserved", rentedDate: "today", reservationBeginDate: "today", reservationExpireDate: "today", },
    //   { pk: "BOOK2", bookDefinitionId: "BOOKDEF2", author: "D.Kowal", title: "Czysty kod", libraryId: "LIB1", userId: "user", status: "Available", rentedDate: "none", reservationBeginDate: "none", reservationExpireDate: "none", }
    // ]
  }

  onBookClick(book: BookDTO) {
    this.selectedBook = book;
  }

  onFilterInput(value: string) {
    this.titlePhase = value;
    this.fetchBooks();
  }

  onReserveNoClick() {
    this.selectedBook = null;
  }

  onReserveYesClick() {
    const reserveRequest = new RentBookRequestDTO();
    reserveRequest.pk = this.selectedBook.pk;
    reserveRequest.user = this.currentUserLogin;

    this.reservationService.reserveBook(reserveRequest).subscribe(() => {
      this.selectedBook = null;
      this.fetchBooks();
    });
  }
}
