package com.example.booksRenting.api.advice;

import com.example.booksRenting.dto.error.DisplayableErrorDTO;
import com.example.booksRenting.exception.NotABibliotekarzException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@Slf4j
@ControllerAdvice(annotations = RestController.class)
public class RestControllerAdvice {

    @ResponseBody
    @ResponseStatus(HttpStatus.FORBIDDEN)
    @ExceptionHandler(NotABibliotekarzException.class)
    public DisplayableErrorDTO handleArgumentNotValidException(Exception ex) {
        return new DisplayableErrorDTO(ex.getMessage());
    }


}
