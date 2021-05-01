package com.example.booksRenting.service.mapping;

import com.example.booksRenting.dto.BookDTO;
import com.example.booksRenting.model.entity.Book;
import org.springframework.stereotype.Service;

@Service
public class BookMappingService {
    public BookDTO mapToBookDTO(Book book) {
        return BookDTO.builder()
                .title(book.getTitle())
                .author(book.getAuthor())
                .id(book.getId())
                .build();
    }

    public Book mapToBook(BookDTO bookDTO) {
        return Book.builder()
                .id(bookDTO.getId())
                .author(bookDTO.getAuthor())
                .title(bookDTO.getTitle())
                .build();
    }
}
