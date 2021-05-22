package com.example.booksRenting.service.mapping;

import com.example.booksRenting.dto.BookDefinitionDTO;
import com.example.booksRenting.dto.bookDefinition.CreateBookDefinitionDTO;
import com.example.booksRenting.model.entity.BookDefinition;
import org.springframework.stereotype.Service;

@Service
public class BookDefinitionMappingService {

    public BookDefinitionDTO mapToBookDefinitionDTO(BookDefinition bookDefinition) {
        var result = new BookDefinitionDTO();
        result.setId(bookDefinition.getPk() + "#" + bookDefinition.getSk());
        result.setTitle(bookDefinition.getTitle());
        result.setAuthor(bookDefinition.getAuthor());
        result.setLibraryId(bookDefinition.getPk());
        return result;
    }

    public BookDefinition mapToBookDefinition(CreateBookDefinitionDTO request) {
        var result = new BookDefinition();
        result.setPk(request.getLibraryId());
        result.setTitle(request.getTitle());
        result.setAuthor(request.getAuthor());
        result.setSk(request.getAuthor() + "#" + request.getTitle());
        return result;
    }
}
