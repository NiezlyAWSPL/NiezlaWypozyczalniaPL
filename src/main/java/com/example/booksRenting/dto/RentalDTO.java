package com.example.booksRenting.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class RentalDTO {
    private String pk;
    private String author;
    private String title;
    private String libraryId;
    private String userId;
    private LocalDateTime rentedDate;
    private LocalDateTime returnDate;
}
