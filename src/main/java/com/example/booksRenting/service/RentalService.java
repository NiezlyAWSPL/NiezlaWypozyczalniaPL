package com.example.booksRenting.service;

import com.example.booksRenting.dto.BookDTO;
import com.example.booksRenting.dto.RentalDTO;
import com.example.booksRenting.repository.BookRepository;
import com.example.booksRenting.repository.RentalRepository;
import com.example.booksRenting.service.mapping.BookMappingService;
import com.example.booksRenting.service.mapping.RentalMappingService;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import static com.example.booksRenting.constants.TableConstants.*;

@Service
public class RentalService {
    private final BookRepository bookRepository;
    private final RentalRepository rentalRepository;
    private final BookMappingService bookMappingService;
    private final RentalMappingService rentalMappingService;

    public RentalService(BookRepository bookRepository, RentalRepository rentalRepository, BookMappingService bookMappingService, RentalMappingService rentalMappingService) {
        this.bookRepository = bookRepository;
        this.rentalRepository = rentalRepository;
        this.bookMappingService = bookMappingService;
        this.rentalMappingService = rentalMappingService;
    }

    @Transactional
    public BookDTO rentBook(String pk, String userId) {
        var book = bookRepository.findByPkAndSk(pk, SORT_KEY_BOOK).orElseThrow();
        book.setUserId(userId);
        book.setRentedDate(LocalDateTime.now());
        book.setStatus(BOOK_RENTED_STATUS);
        book.setReservedTillTimeStamp(Instant.MAX.getEpochSecond());
        return bookMappingService.mapToBookDTO(bookRepository.save(book));
    }

    @Transactional
    public RentalDTO returnBook(String pk) {
        var book = bookRepository.findByPkAndSk(pk, SORT_KEY_BOOK).orElseThrow();
        var rental = rentalMappingService.mapToRental(book);

        book.setUserId(null);
        book.setRentedDate(null);
        book.setStatus(BOOK_AVAILABLE_STATUS);
        book.setReservedTillTimeStamp(0);
        bookRepository.save(book);

        rental.setReturnDate(LocalDateTime.now());
        rental.setSk(SORT_KEY_RENTAL_PREFIX + "#" + LocalDateTime.now());
        var result = rentalRepository.save(rental);

        return rentalMappingService.mapToRentalDTO(result);
    }

    public List<RentalDTO> getBookRentals(String pk, int skip, int take) {
        int pageNumber = skip / take;

        return rentalRepository.findByPkAndSkStartsWith(pk, SORT_KEY_RENTAL_PREFIX + "#",
                PageRequest.of(pageNumber, take, Sort.by("sk").descending()))
                .stream().map(rentalMappingService::mapToRentalDTO)
                .collect(Collectors.toList());
    }

    public List<RentalDTO> getFilteredRentals(String titlePhase) {
        return rentalRepository.findByTitleLike(titlePhase).stream()
                .map(rentalMappingService::mapToRentalDTO)
                .collect(Collectors.toList());
    }

    public List<RentalDTO> getUserOldRentals(String user) {
        return rentalRepository.findByUserIdAndSkStartsWith(user, SORT_KEY_RENTAL_PREFIX + "#").stream()
                .map(rentalMappingService::mapToRentalDTO)
                .collect(Collectors.toList());
    }

    public List<BookDTO> getCurrentRentedBookByUser(String user) {
        return bookRepository.findByUserIdAndSkStartsWith(user, SORT_KEY_BOOK).stream()
                .filter(b -> b.getStatus().equals(BOOK_RENTED_STATUS))
                .map(bookMappingService::mapToBookDTO)
                .collect(Collectors.toList());
    }
}
