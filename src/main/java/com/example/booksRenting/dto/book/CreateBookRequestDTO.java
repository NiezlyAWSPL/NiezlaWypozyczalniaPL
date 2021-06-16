package com.example.booksRenting.dto.book;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateBookRequestDTO {
    private String author;
    private String title;
    private String libraryId;
}
