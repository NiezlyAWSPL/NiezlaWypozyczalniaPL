package com.example.booksRenting.repository;

import com.example.booksRenting.model.entity.BaseEntity;
import com.example.booksRenting.model.entity.BookDefinition;
import jdk.jfr.Enabled;
import org.socialsignin.spring.data.dynamodb.repository.EnableScan;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Optional;

@EnableScan
public interface BookDefinitionRepository extends PagingAndSortingRepository<BookDefinition, BaseEntity.BaseEntityId> {
    Optional<BookDefinition> findByPkAndSk(String pk, String sk);

    Page<BookDefinition> findByPkAndSkStartsWith(String pk, String titlePrefix, Pageable pageable);
}
