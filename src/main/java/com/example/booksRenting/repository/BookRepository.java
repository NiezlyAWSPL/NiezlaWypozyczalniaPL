package com.example.booksRenting.repository;

import com.example.booksRenting.model.entity.BaseEntity;
import com.example.booksRenting.model.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;
import java.util.Optional;

public interface BookRepository extends PagingAndSortingRepository<Book, BaseEntity.BaseEntityId> {
    Optional<Book> findByPkAndSk(String pk, String sk);

    Page<Book> findByPkAndSkStartsWith(String pk, String skPrefix, Pageable pageable);

    List<Book> findByUserIdAndSkStartsWith(String userId, String skPrefix);


}
