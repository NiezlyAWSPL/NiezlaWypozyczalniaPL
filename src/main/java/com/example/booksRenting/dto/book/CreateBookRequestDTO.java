package com.example.booksRenting.dto.book;

import lombok.Data;

@Data
public class CreateBookRequestDTO {
    private String author;
    private String title;
    private String libraryId;
}
