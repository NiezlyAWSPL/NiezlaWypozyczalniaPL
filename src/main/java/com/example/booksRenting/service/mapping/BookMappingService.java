package com.example.booksRenting.service.mapping;

import com.example.booksRenting.dto.BookDTO;
import com.example.booksRenting.dto.book.CreateBookRequestDTO;
import com.example.booksRenting.model.entity.Book;
import org.springframework.stereotype.Service;

@Service
public class BookMappingService {
    public BookDTO mapToBookDTO(Book book) {
        var result = new BookDTO();
        result.setTitle(book.getTitle());
        result.setAuthor(book.getAuthor());
        result.setPk(book.getPk());
        result.setLibraryId(book.getLibraryId());
        result.setUserId(book.getUserId());
        result.setStatus(book.getStatus());
        result.setRentedDate(book.getRentedDate());
        result.setReturnDate(book.getReturnDate());
        result.setReservationBeginDate(book.getReservationBeginDate());
        result.setReservationExpireDate(book.getReservationExpireDate());
        return result;
    }

    public Book mapToBook(CreateBookRequestDTO requestDTO) {
        var result = new Book();
        result.setTitle(requestDTO.getTitle());
        result.setAuthor(requestDTO.getAuthor());
        result.setLibraryId(requestDTO.getLibraryId());
        return result;
    }
}
