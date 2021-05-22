package com.example.booksRenting.service.mapping;

import com.example.booksRenting.dto.LibraryDTO;
import com.example.booksRenting.dto.library.CreateLibraryRequestDTO;
import com.example.booksRenting.model.entity.Library;
import org.springframework.stereotype.Service;

@Service
public class LibraryMappingService {
    public LibraryDTO mapToLibraryDTO(Library library) {
        var result = new LibraryDTO();
        result.setAddress(library.getAddress());
        result.setName(library.getSk());
        return result;
    }

    public Library mapToLibrary(LibraryDTO library) {
        var result = new Library();
        result.setSk(library.getName());
        result.setAddress(library.getAddress());
        return result;
    }

    public Library mapToLibrary(CreateLibraryRequestDTO library) {
        var result = new Library();
        result.setSk(library.getName());
        result.setAddress(library.getAddress());
        return result;
    }
}
