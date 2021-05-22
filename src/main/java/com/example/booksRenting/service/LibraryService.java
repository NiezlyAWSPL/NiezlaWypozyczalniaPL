package com.example.booksRenting.service;

import com.example.booksRenting.constants.TableConstants;
import com.example.booksRenting.dto.LibraryDTO;
import com.example.booksRenting.dto.library.CreateLibraryRequestDTO;
import com.example.booksRenting.repository.LibraryRepository;
import com.example.booksRenting.service.mapping.LibraryMappingService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LibraryService {

    private final LibraryRepository libraryRepository;
    private final LibraryMappingService libraryMappingService;

    public LibraryService(LibraryRepository libraryRepository, LibraryMappingService libraryMappingService) {
        this.libraryRepository = libraryRepository;
        this.libraryMappingService = libraryMappingService;
    }

    @Transactional
    public LibraryDTO createLibrary(CreateLibraryRequestDTO requestDTO) {
        var library = libraryMappingService.mapToLibrary(requestDTO);
        library.setPk(TableConstants.HASH_KEY_LIBRARY);
        return libraryMappingService.mapToLibraryDTO(libraryRepository.save(library));
    }

    public List<LibraryDTO> getAllLibraries() {
        return  libraryRepository.findByPk(TableConstants.HASH_KEY_LIBRARY).stream()
                .map(libraryMappingService::mapToLibraryDTO)
                .collect(Collectors.toList());
    }
}
