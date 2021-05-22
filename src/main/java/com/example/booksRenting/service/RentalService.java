package com.example.booksRenting.service;

import com.example.booksRenting.dto.BookDTO;
import com.example.booksRenting.repository.BookRepository;
import com.example.booksRenting.service.mapping.BookMappingService;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import static com.example.booksRenting.constants.TableConstants.*;

@Service
public class RentalService {
    private final BookRepository bookRepository;
    private final BookMappingService bookMappingService;

    public RentalService(BookRepository bookRepository, BookMappingService bookMappingService) {
        this.bookRepository = bookRepository;
        this.bookMappingService = bookMappingService;
    }

    @Transactional
    public BookDTO rentBook(String pk, String userId) {
        var book = bookRepository.findByPkAndSk(pk, SORT_KEY_BOOK).orElseThrow();
        book.setUserId(userId);
        book.setRentedDate(LocalDateTime.now());
        book.setStatus(BOOK_RENTED_STATUS);
        return bookMappingService.mapToBookDTO(bookRepository.save(book));
    }

    @Transactional
    public BookDTO returnBook(String pk) {
        var book = bookRepository.findByPkAndSk(pk, SORT_KEY_BOOK).orElseThrow();

        var userId = book.getUserId();
        book.setUserId(null);
        var rentedDate = book.getRentedDate();
        book.setRentedDate(null);
        book.setStatus(BOOK_AVAILABLE_STATUS);
        bookRepository.save(book);

        book.setUserId(userId);
        book.setRentedDate(rentedDate);
        book.setReturnDate(LocalDateTime.now());
        book.setSk(SORT_KEY_RENTAL_PREFIX + "#" + LocalDateTime.now());
        var result = bookRepository.save(book);

        return bookMappingService.mapToBookDTO(result);
    }

    public List<BookDTO> getBookRentals(String pk, int skip, int take) {
        int pageNumber = skip / take;

        return bookRepository.findByPkAndSkStartsWith(pk, SORT_KEY_RENTAL_PREFIX + "#",
                PageRequest.of(pageNumber, take, Sort.by("sk").descending()))
                .stream().map(bookMappingService::mapToBookDTO)
                .collect(Collectors.toList());
    }

    public List<BookDTO> getUserOldRentals(String user) {
        return bookRepository.findByUserIdAndSkStartsWith(user, SORT_KEY_RENTAL_PREFIX + "#").stream()
                .map(bookMappingService::mapToBookDTO)
                .collect(Collectors.toList());
    }

    public List<BookDTO> getUserCurrentRentals(String user) {
        return bookRepository.findByUserIdAndSkStartsWith(user, SORT_KEY_BOOK).stream()
                .filter(b -> b.getStatus().equals(BOOK_RENTED_STATUS))
                .map(bookMappingService::mapToBookDTO)
                .collect(Collectors.toList());
    }
}
