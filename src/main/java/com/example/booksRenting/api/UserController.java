package com.example.booksRenting.api;

import com.example.booksRenting.dto.user.UserDTO;
import com.example.booksRenting.service.UserService;
import com.example.booksRenting.utils.AuthorizationUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/{loginPhase}")
    public List<UserDTO> getFilteredUsers(@PathVariable("loginPhase") String loginPhase) {
        return userService.getFilteredUsers(loginPhase);
    }

    @GetMapping("/current")
    public UserDTO getCurrentUser(Principal principal) {
        return UserDTO.builder()
                .authorities(Optional.ofNullable(AuthorizationUtils.getLoggedUserAuthorities(principal)).orElse(Collections.emptyList()))
                .build();
    }

}
