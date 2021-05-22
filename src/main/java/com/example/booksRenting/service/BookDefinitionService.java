package com.example.booksRenting.service;

import com.example.booksRenting.dto.BookDefinitionDTO;
import com.example.booksRenting.dto.bookDefinition.CreateBookDefinitionDTO;
import com.example.booksRenting.repository.BookDefinitionRepository;
import com.example.booksRenting.service.mapping.BookDefinitionMappingService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class BookDefinitionService {

    private final BookDefinitionRepository bookDefinitionRepository;
    private final BookDefinitionMappingService bookDefinitionMappingService;

    public BookDefinitionService(BookDefinitionRepository bookDefinitionRepository, BookDefinitionMappingService bookDefinitionMappingService) {
        this.bookDefinitionRepository = bookDefinitionRepository;
        this.bookDefinitionMappingService = bookDefinitionMappingService;
    }

    @Transactional
    public BookDefinitionDTO createBookDefinition(CreateBookDefinitionDTO requestDTO) {
        var bookDefinition = bookDefinitionMappingService.mapToBookDefinition(requestDTO);
        return bookDefinitionMappingService.mapToBookDefinitionDTO(bookDefinitionRepository.save(bookDefinition));
    }
}
