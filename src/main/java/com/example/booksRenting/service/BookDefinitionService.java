package com.example.booksRenting.service;

import com.example.booksRenting.dto.BookDefinitionDTO;
import com.example.booksRenting.dto.bookDefinition.BookDefinitionFilterDTO;
import com.example.booksRenting.dto.bookDefinition.CreateBookDefinitionDTO;
import com.example.booksRenting.model.entity.Book;
import com.example.booksRenting.repository.BookDefinitionRepository;
import com.example.booksRenting.service.mapping.BookDefinitionMappingService;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

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

    @Transactional
    public BookDefinitionDTO createBookDefinitionIfNotExist(Book book) {
        var bookDefinitionOptional = bookDefinitionRepository.findByPkAndSk(book.getLibraryId(),
                book.getTitle() + "#" + book.getAuthor());
        if(bookDefinitionOptional.isEmpty()) {
            var bookDefinition = bookDefinitionMappingService.mapToBookDefinition(book);
            return bookDefinitionMappingService.mapToBookDefinitionDTO(bookDefinitionRepository.save(bookDefinition));
        }

        return bookDefinitionMappingService.mapToBookDefinitionDTO(bookDefinitionOptional.get());
    }

    public List<BookDefinitionDTO> findByFilter(BookDefinitionFilterDTO filterDTO) {

        int pageNumber = (int)(filterDTO.getSkip() / filterDTO.getTake());
        var pageable = PageRequest.of(pageNumber, filterDTO.getTake());

        if(filterDTO.getTitlePrefix().isEmpty()) {
            return bookDefinitionRepository.findByPk(
                    filterDTO.getLibraryId(),
                    pageable).stream()
                    .map(bookDefinitionMappingService::mapToBookDefinitionDTO)
                    .collect(Collectors.toList());
        }

        return bookDefinitionRepository.findByPkAndSkStartsWith(
                filterDTO.getLibraryId(),
                filterDTO.getTitlePrefix().toLowerCase(),
                pageable).stream()
                .map(bookDefinitionMappingService::mapToBookDefinitionDTO)
                .collect(Collectors.toList());
    }
}
