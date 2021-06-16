package com.example.booksRenting.utils;

import com.example.booksRenting.exception.NotABibliotekarzException;
import lombok.experimental.UtilityClass;
import org.springframework.security.core.context.SecurityContextHolder;

@UtilityClass
public class AuthorizationUtils {

    public static final void assureIsNiezlyBibliotekarz() {
        SecurityContextHolder.getContext().getAuthentication().getAuthorities().stream()
                .filter(a -> a.equals("SCOPE_books-renting/librarian"))
                .findFirst()
                .orElseThrow(() -> new NotABibliotekarzException("Totally not a kurwa bibliotekarz B)"));
    }
}
