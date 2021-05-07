package com.example.booksRenting.api;

import com.example.booksRenting.dto.BookDTO;
import com.example.booksRenting.dto.rental.RentBookRequestDTO;
import com.example.booksRenting.dto.rental.ReturnBookRequestDTO;
import com.example.booksRenting.service.RentalService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/books/rented")
public class RentalController {

    private final RentalService rentalService;

    public RentalController(RentalService rentalService) {
        this.rentalService = rentalService;
    }

    @PostMapping
    public BookDTO rentBook(@RequestBody RentBookRequestDTO requestDTO) {
        return rentalService.rentBook(requestDTO.getPk(), requestDTO.getUser());
    }

    @PostMapping("/return")
    public BookDTO returnBook(@RequestBody ReturnBookRequestDTO requestDTO) {
        return rentalService.returnBook(requestDTO.getPk());
    }
}
