package com.example.booksRenting.api;

import com.example.booksRenting.dto.BookDTO;
import com.example.booksRenting.dto.RentalDTO;
import com.example.booksRenting.dto.rental.RentBookRequestDTO;
import com.example.booksRenting.dto.rental.ReturnBookRequestDTO;
import com.example.booksRenting.service.RentalService;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotNull;
import java.security.Principal;
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
    public RentalDTO returnBook(@RequestBody ReturnBookRequestDTO requestDTO) {
        return rentalService.returnBook(requestDTO.getPk());
    }

    @GetMapping("/{pk}")
    public List<RentalDTO> getBookRentals(@PathVariable String pk, @RequestParam("skip") int skip, @RequestParam("take") int take) {
        return rentalService.getBookRentals(pk, skip, take);
    }

    @GetMapping("/filter/{titlePhase}")
    public List<RentalDTO> getFilteredRentals(@PathVariable("titlePhase") String titlePhase){
        return rentalService.getFilteredRentals(titlePhase);
    }

    @GetMapping("/loggedUser")
    public List<BookDTO> getCurrentRentedBookByLoggedUser(Principal principal) {
        return rentalService.getCurrentRentedBookByUser(principal.getName());
    }

    @GetMapping()
    public List<BookDTO> getCurrentRentedBookByUser(@RequestParam("user") @NotNull String user) {
        return rentalService.getCurrentRentedBookByUser(user);
    }

    @GetMapping("/loggedUser/old")
    public List<RentalDTO> getLoggedUserOldRentals(Principal principal) {
        return rentalService.getUserOldRentals(principal.getName());
    }

    @GetMapping("/old")
    public List<RentalDTO> getUserOldRentals(@RequestParam("user") @NotNull String user) {
        return rentalService.getUserOldRentals(user);
    }
}
