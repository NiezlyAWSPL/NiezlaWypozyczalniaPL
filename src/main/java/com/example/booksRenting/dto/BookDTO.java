package com.example.booksRenting.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BookDTO {
    private String id;
    private String author;
    private String title;
}
