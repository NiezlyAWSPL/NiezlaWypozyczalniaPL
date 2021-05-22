package com.example.booksRenting.service.mapping;

import com.example.booksRenting.dto.RentalDTO;
import com.example.booksRenting.model.entity.Book;
import com.example.booksRenting.model.entity.Rental;
import org.springframework.stereotype.Service;

@Service
public class RentalMappingService {
    public Rental mapToRental(Book book) {
        var result = new Rental();
        result.setAuthor(book.getAuthor());
        result.setLibraryId(book.getLibraryId());
        result.setRentedDate(book.getRentedDate());
        result.setTitle(book.getTitle());
        result.setUserId(book.getUserId());
        result.setPk(book.getPk());
        return result;
    }

    public RentalDTO mapToRentalDTO(Rental rental) {
        var result = new RentalDTO();
        result.setTitle(rental.getTitle());
        result.setAuthor(rental.getAuthor());
        result.setPk(rental.getPk());
        result.setLibraryId(rental.getLibraryId());
        result.setUserId(rental.getUserId());
        result.setRentedDate(rental.getRentedDate());
        result.setReturnDate(rental.getRentedDate());
        return result;
    }
}
