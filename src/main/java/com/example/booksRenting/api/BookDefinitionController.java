package com.example.booksRenting.api;

import com.example.booksRenting.dto.BookDefinitionDTO;
import com.example.booksRenting.dto.bookDefinition.CreateBookDefinitionDTO;
import com.example.booksRenting.service.BookDefinitionService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
