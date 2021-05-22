package com.example.booksRenting.dto.bookDefinition;

import lombok.Data;

@Data
public class CreateBookDefinitionDTO {
    private String libraryId;
    private String title;
    private String author;
}
