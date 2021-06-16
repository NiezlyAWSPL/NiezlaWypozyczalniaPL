package com.example.booksRenting.api;

import com.example.booksRenting.dto.user.UserDTO;
import com.example.booksRenting.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

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
    public Principal getCurrentUser(Principal principal) {
        return principal;
    }

}
