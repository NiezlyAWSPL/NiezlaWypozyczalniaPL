package com.example.booksRenting.api;

import com.example.booksRenting.dto.BookDefinitionDTO;
import com.example.booksRenting.dto.bookDefinition.BookDefinitionFilterDTO;
import com.example.booksRenting.dto.bookDefinition.CreateBookDefinitionDTO;
import com.example.booksRenting.service.BookDefinitionService;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static com.example.booksRenting.constants.RoleConstants.NIEZLY_BIBLIOTEKARZ;

@RestController
@RequestMapping("/books/definitions")
public class BookDefinitionController {

    private final BookDefinitionService bookDefinitionService;

    public BookDefinitionController(BookDefinitionService bookDefinitionService) {
        this.bookDefinitionService = bookDefinitionService;
    }

    @PostMapping
    public BookDefinitionDTO createBookDefinition(@RequestBody CreateBookDefinitionDTO requestDTO) {
        return bookDefinitionService.createBookDefinition(requestDTO);
    }

    @PostMapping("/filtered")
    @Secured(NIEZLY_BIBLIOTEKARZ)
    public List<BookDefinitionDTO> filter(@RequestBody BookDefinitionFilterDTO filterDTO) {
        return bookDefinitionService.findByFilter(filterDTO);
    }
}
