package com.example.booksRenting.utils;

import com.example.booksRenting.exception.NotABibliotekarzException;
import lombok.experimental.UtilityClass;
import org.springframework.security.core.context.SecurityContextHolder;

import static com.example.booksRenting.constants.RoleConstants.NIEZLY_BIBLIOTEKARZ;

@UtilityClass
public class AuthorizationUtils {

    public static final void assureIsNiezlyBibliotekarz() {
        SecurityContextHolder.getContext().getAuthentication().getAuthorities().stream()
                .filter(a -> a.getAuthority().contains(NIEZLY_BIBLIOTEKARZ))
                .findFirst()
                .orElseThrow(() -> new NotABibliotekarzException("Totally not a kurwa bibliotekarz B)"));
    }
}
