import {Component, OnInit} from '@angular/core';
import {BookDefinitionDTO, BookDefinitionFilterDTO, LibraryDTO, RentBookRequestDTO} from "../dto/dto";
import {BookService} from "../service/book.service";
import {ReservationService} from "../service/reservation.service";
import {UserService} from "../service/user.service";
import {LibraryService} from "../service/library.service";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  constructor(private bookService: BookService,
              private reservationService: ReservationService,
              private userService: UserService,
              private libraryService: LibraryService) {
  }

  books: BookDefinitionDTO[];
  selectedBook: BookDefinitionDTO;

  libraries: LibraryDTO[];
  selectedLibrary: LibraryDTO;

  titlePhase: string = "";

  currentUserLogin: string;

  ngOnInit(): void {
    this.fetchCurrentUserLogin();
    this.fetchLibraries();
    this.fetchBooks();
  }

  fetchCurrentUserLogin() {
    this.userService.getCurrentUser().subscribe(user => {
      this.currentUserLogin = user.login;
    })
  }

  fetchLibraries() {
    this.libraryService.getAllLibraries().subscribe(libraries => {
      this.libraries = libraries;
      this.selectedLibrary = libraries[0];
    });
  }

  fetchBooks() {
    if (this.selectedLibrary) {
      const bookDefinitionFilter = new BookDefinitionFilterDTO();
      bookDefinitionFilter.libraryId = this.selectedLibrary.name;
      bookDefinitionFilter.skip = 0;
      bookDefinitionFilter.take = 10;
      bookDefinitionFilter.titlePrefix = this.titlePhase;

      this.bookService.getBookDefinitions(bookDefinitionFilter).subscribe(books => {
        this.books = books;
      });
    }
  }

  onBookClick(book: BookDefinitionDTO) {
    this.selectedBook = book;
  }

  onLibrarySelect(library: LibraryDTO) {
    this.selectedLibrary = library;
    this.fetchBooks();
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
    reserveRequest.pk = this.selectedBook.id;
    reserveRequest.user = this.currentUserLogin;

    this.reservationService.reserveBook(reserveRequest).subscribe(() => {
      this.selectedBook = null;
      this.fetchBooks();
    });
  }
}
