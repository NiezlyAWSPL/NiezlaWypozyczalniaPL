package com.example.booksRenting.service.mapping;

import com.example.booksRenting.dto.BookDTO;
import com.example.booksRenting.model.entity.Book;
import org.springframework.stereotype.Service;

@Service
public class BookMappingService {
    public BookDTO mapToBookDTO(Book book) {
        var result = new BookDTO();
        result.setTitle(book.getTitle());
        result.setAuthor(book.getAuthor());
        result.setPk(book.getPk());
        return result;
    }

    public Book mapToBook(BookDTO book) {
        var result = new Book();
        result.setTitle(book.getTitle());
        result.setAuthor(book.getAuthor());
        result.setPk(book.getPk());
        return result;
    }
}
