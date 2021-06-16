package com.example.booksRenting.service;

import com.example.booksRenting.dto.user.UserDTO;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    public static final List<UserDTO> mockedUsers = List.of(
            new UserDTO("sadasda", "login1", List.of()),
            new UserDTO("bvbvbvv", "login2", List.of()),
            new UserDTO("gdfgdfg", "login3", List.of()),
            new UserDTO("rtytrrr", "login4", List.of()),
            new UserDTO("poipoio", "login5", List.of()),
            new UserDTO("zcxczxc", "login6", List.of()),
            new UserDTO("jfgjdgf", "login7", List.of())
            );

    public List<UserDTO> getFilteredUsers(String loginPhase) {
        var assuredValidLoginPhase = Optional.ofNullable(loginPhase).orElse("");
        return mockedUsers.stream()
                .filter(u -> u.getLogin().contains(assuredValidLoginPhase))
                .collect(Collectors.toList());
    }

}
