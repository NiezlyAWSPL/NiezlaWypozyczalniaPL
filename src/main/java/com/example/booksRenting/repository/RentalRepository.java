package com.example.booksRenting.repository;

import com.example.booksRenting.model.entity.BaseEntity;
import com.example.booksRenting.model.entity.Rental;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;
import java.util.Optional;

public interface RentalRepository extends PagingAndSortingRepository<Rental, BaseEntity.BaseEntityId> {
    Optional<Rental> findByPkAndSk(String pk, String sk);

    Page<Rental> findByPkAndSkStartsWith(String pk, String skPrefix, Pageable pageable);

    List<Rental> findByUserIdAndSkStartsWith(String userId, String skPrefix);
}
