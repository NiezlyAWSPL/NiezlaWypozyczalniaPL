package com.example.booksRenting.utils;

import com.example.booksRenting.exception.NotABibliotekarzException;
import lombok.experimental.UtilityClass;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;

import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

import static com.example.booksRenting.constants.RoleConstants.NIEZLY_BIBLIOTEKARZ;

@UtilityClass
public class AuthorizationUtils {

    public static final void assureIsNiezlyBibliotekarz() {
        SecurityContextHolder.getContext().getAuthentication().getAuthorities().stream()
                .filter(a -> a.getAuthority().contains(NIEZLY_BIBLIOTEKARZ))
                .findFirst()
                .orElseThrow(() -> new NotABibliotekarzException("Totally not a bibliotekarz B)"));
    }

    public static final List<String> getLoggedUserAuthorities(Principal principal) {
        return ((Jwt)((JwtAuthenticationToken)principal).getPrincipal()).getClaim("cognito:groups");
    }

    public static String getUserName(Principal principal) {
        return ((Jwt)((JwtAuthenticationToken)principal).getPrincipal()).getClaim("username");
    }

    public static List<String> getGroups(Principal principal) {
        return ((Jwt)((JwtAuthenticationToken)principal).getPrincipal()).getClaim("cognito:groups");
    }
}
