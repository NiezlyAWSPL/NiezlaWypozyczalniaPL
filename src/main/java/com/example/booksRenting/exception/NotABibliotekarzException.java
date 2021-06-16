package com.example.booksRenting.exception;

import lombok.Data;

@Data
public class NotABibliotekarzException extends RuntimeException {

    public NotABibliotekarzException(String message) {
        super(message);
    }
}
