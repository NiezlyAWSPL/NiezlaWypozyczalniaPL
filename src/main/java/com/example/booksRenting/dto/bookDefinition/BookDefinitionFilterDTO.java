package com.example.booksRenting.dto.bookDefinition;

import lombok.Data;

@Data
public class BookDefinitionFilterDTO {
    private String libraryId;
    private String titlePrefix;
    private long skip;
    private int take;
}
