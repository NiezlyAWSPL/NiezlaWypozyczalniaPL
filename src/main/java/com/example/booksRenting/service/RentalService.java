package com.example.booksRenting.service;

import com.example.booksRenting.dto.BookDTO;
import com.example.booksRenting.repository.BookRepository;
import com.example.booksRenting.service.mapping.BookMappingService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

import static com.example.booksRenting.constants.TableConstants.*;

@Service
public class RentalService {
    private final BookRepository bookRepository;
    private final BookMappingService bookMappingService;

    public RentalService(BookRepository bookRepository, BookMappingService bookMappingService) {
        this.bookRepository = bookRepository;
        this.bookMappingService = bookMappingService;
    }

    @Transactional
    public BookDTO rentBook(String pk, String userId) {
        var book = bookRepository.findByPkAndSk(pk, SORT_KEY_BOOK).orElseThrow();
        book.setUserId(userId);
        book.setRentedDate(LocalDateTime.now());
        book.setStatus(BOOK_RENTED_STATUS);
        return bookMappingService.mapToBookDTO(bookRepository.save(book));
    }

    @Transactional
    public BookDTO returnBook(String pk) {
        var book = bookRepository.findByPkAndSk(pk, SORT_KEY_BOOK).orElseThrow();

        book.setReturnDate(LocalDateTime.now());
        book.setSk(SORT_KEY_RENTAL_PREFIX + "#" + LocalDateTime.now());
        var result = bookRepository.save(book);

        book.setUserId(null);
        book.setRentedDate(null);
        book.setReturnDate(null);
        book.setSk(SORT_KEY_BOOK);
        book.setStatus(BOOK_AVAILABLE_STATUS);
        bookRepository.save(book);

        return bookMappingService.mapToBookDTO(result);
    }
}
