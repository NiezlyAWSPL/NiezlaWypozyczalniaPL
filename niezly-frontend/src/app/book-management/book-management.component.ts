import { Component, OnInit } from '@angular/core';
import {BookDTO, BookFilterDTO, RentBookRequestDTO, ReturnBookRequestDTO} from "../dto/dto";
import {BookService} from "../service/book.service";
import {RentalService} from "../service/rental.service";

@Component({
  selector: 'app-book-management',
  templateUrl: './book-management.component.html',
  styleUrls: ['./book-management.component.scss']
})
export class BookManagementComponent implements OnInit {

  constructor(private bookService: BookService,
              private rentalService: RentalService) {
  }

  books: BookDTO[];
  selectedBook: BookDTO;
  loadedBooks: BookDTO[];

  titleStartsWith: string;

  ngOnInit(): void {
    this.init();
  }

  init() {
    const bookFilter = new BookFilterDTO();
    bookFilter.titleStartsWith = this.titleStartsWith;
    bookFilter.libraryId = "TODO libraryId";

    this.bookService.getBooks(bookFilter).subscribe(books => {
      this.loadedBooks = books;
      this.books = books;
    });
  }

  isBookReserved(book: BookDTO) {
    return false;
  }

  isBookRented(book: BookDTO) {
    return false;
  }

  onBookClick(book: BookDTO) {
    this.selectedBook = book;
  }

  onFilterInput(value: string) {
    this.titleStartsWith = value;
    this.books = this.loadedBooks.filter(b => b.title.startsWith(value));
  }

  onRentNoClick() {
    this.selectedBook = null;
  }

  onRentYesClick() {
    const rentRequest = new RentBookRequestDTO();
    rentRequest.pk = this.selectedBook.pk;
    rentRequest.user = "TODO user";

    this.rentalService.rentBook(rentRequest)
        .subscribe(() => {
          this.books = this.books.filter(b => b.pk != this.selectedBook.pk);
          this.selectedBook = null;
        })
  }

  onReturnNoClick() {
    this.selectedBook = null;
  }

  onReturnYesClick() {
    const returnRequest = new ReturnBookRequestDTO();
    returnRequest.pk = this.selectedBook.pk;

    this.rentalService.returnBook(returnRequest)
        .subscribe(() => {
          this.selectedBook = null;
          this.init();
        })
  }
}
