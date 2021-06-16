package com.example.booksRenting.api;

import com.example.booksRenting.dto.BookDTO;
import com.example.booksRenting.dto.reservation.ReserveBookRequestDTO;
import com.example.booksRenting.service.ReservationService;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotNull;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/books/reserved")
public class ReservationController {

    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @PostMapping
    public BookDTO reserveBook(@RequestBody ReserveBookRequestDTO requestDTO, Principal principal) {
        return reservationService.reserveBook(requestDTO.getBookDefinitionId(), principal.getName());
    }

    @GetMapping("/loggedUser")
    public List<BookDTO> getLoggedUserReservations(Principal principal) {
        return reservationService.getUserCurrentReservations(principal.getName());
    }

    @GetMapping
    public List<BookDTO> getUserReservations(@RequestParam("user") @NotNull String user) {
        return reservationService.getUserCurrentReservations(user);
    }

    @DeleteMapping("/{pk}")
    public BookDTO cancelReservation(@PathVariable String pk) {
        return reservationService.cancelReservation(pk);
    }
}
