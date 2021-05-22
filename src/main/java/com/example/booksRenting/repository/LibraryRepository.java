package com.example.booksRenting.repository;

import com.example.booksRenting.model.entity.BaseEntity;
import com.example.booksRenting.model.entity.Library;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface LibraryRepository extends PagingAndSortingRepository<Library, BaseEntity.BaseEntityId> {
    List<Library> findByPk(String pk);
}
