package com.example.booksRenting.service;

import com.example.booksRenting.dto.BookDTO;
import com.example.booksRenting.repository.BookRepository;
import com.example.booksRenting.service.mapping.BookMappingService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import static com.example.booksRenting.constants.TableConstants.*;

@Service
public class ReservationService {

    private final BookRepository bookRepository;
    private final BookMappingService bookMappingService;
    private final long reservationDurationSeconds;

    public ReservationService(BookRepository bookRepository,
                              BookMappingService bookMappingService,
                              @Value("${reservation.duration}") String reservationDuration) {
        this.bookRepository = bookRepository;
        this.bookMappingService = bookMappingService;
        this.reservationDurationSeconds = Duration.parse(reservationDuration).getSeconds();
    }

    private LocalDateTime getReservationExpireDate(LocalDateTime currentDate) {
        return currentDate.plusSeconds(reservationDurationSeconds);
    }

    @Transactional
    public BookDTO reserveBook(String pk, String userId) {
        var book = bookRepository.findByPkAndSk(pk, SORT_KEY_BOOK).orElseThrow();
        book.setUserId(userId);
        book.setReservationBeginDate(LocalDateTime.now());
        book.setReservationExpireDate(getReservationExpireDate(book.getReservationBeginDate()));
        book.setStatus(BOOK_RESERVED_STATUS);
        return bookMappingService.mapToBookDTO(bookRepository.save(book));
    }

    public List<BookDTO> getUserCurrentReservations(String user) {
        return bookRepository.findByUserIdAndSkStartsWith(user, SORT_KEY_BOOK).stream()
                .filter(b -> b.getStatus().equals(BOOK_RESERVED_STATUS))
                .filter(b -> b.getReservationExpireDate().isAfter(LocalDateTime.now()))
                .map(bookMappingService::mapToBookDTO)
                .collect(Collectors.toList());
    }

}
