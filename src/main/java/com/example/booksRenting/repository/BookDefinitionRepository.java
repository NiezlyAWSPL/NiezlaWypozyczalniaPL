package com.example.booksRenting.repository;

import com.example.booksRenting.model.entity.BaseEntity;
import com.example.booksRenting.model.entity.BookDefinition;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface BookDefinitionRepository extends PagingAndSortingRepository<BookDefinition, BaseEntity.BaseEntityId> {
    List<BookDefinition> findByPk(String pk);
}
