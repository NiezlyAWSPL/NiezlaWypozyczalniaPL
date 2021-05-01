package com.example.booksRenting.repository;

import com.example.booksRenting.model.entity.Book;
import org.socialsignin.spring.data.dynamodb.repository.EnableScan;
import org.springframework.data.repository.CrudRepository;

@EnableScan
public interface BookRepository extends CrudRepository<Book, String> {
}
