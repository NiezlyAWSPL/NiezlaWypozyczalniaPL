package com.example.booksRenting.api;

import com.example.booksRenting.dto.BookDTO;
import com.example.booksRenting.dto.book.CreateBookRequestDTO;
import com.example.booksRenting.service.BookService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/books")
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }
    
    @GetMapping("/{id}")
    public BookDTO getBook(@PathVariable String id) {
        return bookService.findByPk(id);
    }

    @PostMapping
    public BookDTO createBook(@RequestBody CreateBookRequestDTO bookDTO) {
        return bookService.createBook(bookDTO);
    }

    @GetMapping
    public BookDTO getFirstAvailableByBookDefinition(@RequestParam("bookDefinitionId") String bookDefinitionId) {
        return bookService.findFirstAvailableByBookDefinitionId(bookDefinitionId);
    }

    @GetMapping("/filter/{titlePhase}")
    public List<BookDTO> getFilteredBooks(@PathVariable String titlePhase) {
        return List.of();
    }
}
