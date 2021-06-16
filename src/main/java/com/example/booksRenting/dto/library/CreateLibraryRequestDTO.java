package com.example.booksRenting.dto.library;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateLibraryRequestDTO {
    private String name;
    private String address;
}
