package com.example.booksRenting.mock;

import com.example.booksRenting.dto.book.CreateBookRequestDTO;
import com.example.booksRenting.dto.library.CreateLibraryRequestDTO;
import com.example.booksRenting.repository.BookRepository;
import com.example.booksRenting.repository.BookScanRepository;
import com.example.booksRenting.repository.LibraryRepository;
import com.example.booksRenting.service.BookService;
import com.example.booksRenting.service.LibraryService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;
import java.util.Spliterator;
import java.util.Spliterators;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static com.example.booksRenting.constants.TableConstants.HASH_KEY_LIBRARY;

@Service
@RequiredArgsConstructor
@Profile("dev")
public class MockInitializerService implements ApplicationRunner {

    private final LibraryService libraryService;
    private final BookService bookService;
    private final BookScanRepository bookScanRepository;
    private final LibraryRepository libraryRepository;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        purge();
        initializeLibraries();
        initializeBooks();
    }

    private void purge() {
        bookScanRepository.deleteAll();
    }

    private void initializeLibraries() {
        var requests = List.of(
                new CreateLibraryRequestDTO("niezlabiblioteka1", "niezlyadres1"),
                new CreateLibraryRequestDTO("niezlabiblioteka2", "niezlyadres2"),
                new CreateLibraryRequestDTO("niezlabiblioteka3", "niezlyadres3")
        );
        requests.forEach(libraryService::createLibrary);
    }

    private void initializeBooks() {
        var libraryOne = libraryRepository.findByPk(HASH_KEY_LIBRARY);
        var rand = new Random();
        var requests = List.of(
                new CreateBookRequestDTO("niezlyautor1", "niezlytytul1", libraryOne.get(rand.nextInt(libraryOne.size())).getSk()),
                new CreateBookRequestDTO("niezlyautor2", "niezlytytul2", libraryOne.get(rand.nextInt(libraryOne.size())).getSk()),
                new CreateBookRequestDTO("niezlyautor3", "niezlytytul3", libraryOne.get(rand.nextInt(libraryOne.size())).getSk()),
                new CreateBookRequestDTO("niezlyautor4", "niezlytytul4", libraryOne.get(rand.nextInt(libraryOne.size())).getSk()),
                new CreateBookRequestDTO("niezlyautor5", "niezlytytul5", libraryOne.get(rand.nextInt(libraryOne.size())).getSk()),
                new CreateBookRequestDTO("niezlyautor6", "niezlytytul6", libraryOne.get(rand.nextInt(libraryOne.size())).getSk())
        );
        requests.forEach(bookService::createBook);
    }
}

