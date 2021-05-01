package com.example.booksRenting.service;

import com.example.booksRenting.dto.BookDTO;
import com.example.booksRenting.repository.BookRepository;
import com.example.booksRenting.service.mapping.BookMappingService;
import org.springframework.stereotype.Service;

@Service
public class BookService {
    private final BookRepository bookRepository;
    private final BookMappingService bookMappingService;

    public BookService(BookRepository bookRepository, BookMappingService bookMappingService) {
        this.bookRepository = bookRepository;
        this.bookMappingService = bookMappingService;
    }

    public BookDTO findById(String id) {
        var book = this.bookRepository.findById(id).orElseThrow(() -> new RuntimeException("not found"));
        return this.bookMappingService.mapToBookDTO(book);
    }

    public BookDTO createBook(BookDTO bookDTO) {
        var book = this.bookRepository.save(bookMappingService.mapToBook(bookDTO));
        return this.bookMappingService.mapToBookDTO(book);
    }
}
