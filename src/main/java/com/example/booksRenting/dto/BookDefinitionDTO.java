package com.example.booksRenting.dto;

import lombok.Data;

@Data
public class BookDefinitionDTO {
    private String id;
    private String libraryId;
    private String title;
    private String author;
}
