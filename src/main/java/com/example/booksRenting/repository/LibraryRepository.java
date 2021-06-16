package com.example.booksRenting.repository;

import com.example.booksRenting.model.entity.BaseEntity;
import com.example.booksRenting.model.entity.Library;
import org.socialsignin.spring.data.dynamodb.repository.EnableScan;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

@EnableScan
public interface LibraryRepository extends PagingAndSortingRepository<Library, BaseEntity.BaseEntityId> {
    List<Library> findByPk(String pk);
}
