package com.example.booksRenting.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class BookDTO {
    private String pk;
    private String bookDefinitionId;
    private String author;
    private String title;
    private String libraryId;
    private String userId;
    private String status;
    private LocalDateTime rentedDate;
    private LocalDateTime reservationBeginDate;
    private LocalDateTime reservationExpireDate;
}
