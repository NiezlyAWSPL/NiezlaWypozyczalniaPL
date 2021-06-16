package com.example.booksRenting.repository;

import com.example.booksRenting.model.entity.BaseEntity;
import com.example.booksRenting.model.entity.Book;
import com.example.booksRenting.model.entity.Rental;
import org.socialsignin.spring.data.dynamodb.repository.EnableScan;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;
import java.util.Optional;

@EnableScan
public interface BookScanRepository extends PagingAndSortingRepository<Book, BaseEntity.BaseEntityId> {

}
