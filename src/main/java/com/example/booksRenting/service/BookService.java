package com.example.booksRenting.service;

import com.example.booksRenting.dto.BookDTO;
import com.example.booksRenting.dto.book.CreateBookRequestDTO;
import com.example.booksRenting.repository.BookRepository;
import com.example.booksRenting.service.mapping.BookMappingService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

import static com.example.booksRenting.constants.TableConstants.*;

@Service
public class BookService {
    private final BookRepository bookRepository;
    private final BookMappingService bookMappingService;

    public BookService(BookRepository bookRepository, BookMappingService bookMappingService) {
        this.bookRepository = bookRepository;
        this.bookMappingService = bookMappingService;
    }

    public BookDTO findByPk(String pk) {
        var book = bookRepository.findByPkAndSk(pk, SORT_KEY_BOOK).orElseThrow();
        return bookMappingService.mapToBookDTO(book);
    }

    public BookDTO createBook(CreateBookRequestDTO bookDTO) {
        var book = bookMappingService.mapToBook(bookDTO);
        book.setSk(SORT_KEY_BOOK);
        return bookMappingService.mapToBookDTO(bookRepository.save(book));
    }
}
