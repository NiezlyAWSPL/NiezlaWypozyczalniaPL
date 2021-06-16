package com.example.booksRenting.api;

import com.example.booksRenting.dto.LibraryDTO;
import com.example.booksRenting.dto.library.CreateLibraryRequestDTO;
import com.example.booksRenting.service.LibraryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/libraries")
public class LibraryController {

    private final LibraryService libraryService;

    public LibraryController(LibraryService libraryService) {
        this.libraryService = libraryService;
    }

    @PostMapping
    public LibraryDTO createLibrary(@RequestBody CreateLibraryRequestDTO requestDTO) {
        return libraryService.createLibrary(requestDTO);
    }

    @GetMapping
    public List<LibraryDTO> getAllLibraries() {
        return libraryService.getAllLibraries();
    }

}
