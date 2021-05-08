package com.example.booksRenting.api;

import com.example.booksRenting.dto.BookDTO;
import com.example.booksRenting.dto.rental.RentBookRequestDTO;
import com.example.booksRenting.dto.rental.ReturnBookRequestDTO;
import com.example.booksRenting.service.RentalService;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;
import java.util.List;

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

    @GetMapping("/{pk}")
    public List<BookDTO> getBookRentals(@PathVariable String pk, @RequestParam("skip") int skip, @RequestParam("take") int take) {
        return rentalService.getBookRentals(pk, skip, take);
    }

    @GetMapping()
    public List<BookDTO> getUserCurrentRentals(@RequestParam("user") @NotNull String user) {
        return rentalService.getUserCurrentRentals(user);
    }
    @GetMapping("/old")
    public List<BookDTO> getUserOldRentals(@RequestParam("user") @NotNull String user) {
        return rentalService.getUserOldRentals(user);
    }
}
