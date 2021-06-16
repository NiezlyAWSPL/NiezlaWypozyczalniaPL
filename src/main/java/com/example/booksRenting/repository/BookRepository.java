package com.example.booksRenting.repository;

import com.example.booksRenting.model.entity.BaseEntity;
import com.example.booksRenting.model.entity.Book;
import org.socialsignin.spring.data.dynamodb.repository.EnableScan;
import org.socialsignin.spring.data.dynamodb.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;
import java.util.Optional;

@EnableScan
public interface BookRepository extends PagingAndSortingRepository<Book, BaseEntity.BaseEntityId> {
    Optional<Book> findByPkAndSk(String pk, String sk);

    Optional<Book> findFirstByBookDefinitionIdAndReservedTillTimeStampLessThan(String bookDefinitionId, long now);

    List<Book> findByUserIdAndSkStartsWith(String userId, String skPrefix);


}
