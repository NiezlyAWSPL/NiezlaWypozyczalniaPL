package com.example.booksRenting.service;

import com.example.booksRenting.dto.BookDTO;
import com.example.booksRenting.dto.book.CreateBookRequestDTO;
import com.example.booksRenting.model.entity.Book;
import com.example.booksRenting.repository.BookRepository;
import com.example.booksRenting.service.mapping.BookMappingService;
import org.springframework.stereotype.Service;

import java.time.Instant;

import static com.example.booksRenting.constants.TableConstants.SORT_KEY_BOOK;

@Service
public class BookService {
    private final BookRepository bookRepository;
    private final BookDefinitionService bookDefinitionService;
    private final BookMappingService bookMappingService;

    public BookService(BookRepository bookRepository, BookDefinitionService bookDefinitionService, BookMappingService bookMappingService) {
        this.bookRepository = bookRepository;
        this.bookDefinitionService = bookDefinitionService;
        this.bookMappingService = bookMappingService;
    }

    public BookDTO findByPk(String pk) {
        var book = bookRepository.findByPkAndSk(pk, SORT_KEY_BOOK).orElseThrow();
        return bookMappingService.mapToBookDTO(book);
    }

    public BookDTO createBook(CreateBookRequestDTO bookDTO) {
        var book = bookMappingService.mapToBook(bookDTO);
        book.setSk(SORT_KEY_BOOK);
        book.setBookDefinitionId(createBookDefinitionId(book));
        return bookMappingService.mapToBookDTO(bookRepository.save(book));
    }

    private String createBookDefinitionId(Book book) {
        return bookDefinitionService.createBookDefinitionIfNotExist(book).getId();
    }

    public BookDTO findFirstAvailableByBookDefinitionId(String bookDefinitionId) {
        return bookMappingService.mapToBookDTO(
                bookRepository.findFirstByBookDefinitionIdAndReservedTillTimeStampLessThan(
                        bookDefinitionId,
                        Instant.now().getEpochSecond()
                ).orElseThrow());
    }
}
