package com.example.booksRenting.api;

import com.example.booksRenting.dto.BookDTO;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collection;

@RestController
public class BookController {

    @GetMapping("/books")
    public Collection<BookDTO> getBooks() {
        var list = new ArrayList<BookDTO>();
        var book1 = new BookDTO();
        book1.setAuthor("Wiktorollo");
        book1.setTitle("dupa dupa");
        var book2 = new BookDTO();
        book2.setAuthor("Stefanerro");
        book2.setTitle("fiut fiut");
        var book3 = new BookDTO();
        book3.setAuthor("XDabbo");
        book3.setTitle("picza picza");

        list.add(book1);
        list.add(book2);
        list.add(book3);
        return list;
    }

    @GetMapping("/books/{id}")
    public BookDTO getBook(@PathVariable long id) {
        var book1 = new BookDTO();
        book1.setAuthor("Wiktorollo");
        book1.setTitle("" + id);
        return book1;
    }
}
