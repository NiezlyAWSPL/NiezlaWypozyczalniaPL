package com.example.booksRenting.model.entity;

import com.amazonaws.services.dynamodbv2.datamodeling.*;
import com.example.booksRenting.model.converters.LocalDateTimeConverter;
import lombok.*;

import java.time.LocalDateTime;

@EqualsAndHashCode(callSuper = true)
@Data
public class Book extends BaseEntity{

    @DynamoDBAttribute
    private String title;

    @DynamoDBAttribute
    private String author;

    @DynamoDBAttribute
    private String libraryId;

    //TODO Sprawdzic czy faktycznie index jest uzywany
    @DynamoDBIndexHashKey(globalSecondaryIndexName = "userId")
    @DynamoDBAttribute
    private String userId;

    @DynamoDBAttribute
    private String status;

    @DynamoDBAttribute
    @DynamoDBTypeConverted(converter = LocalDateTimeConverter.class)
    private LocalDateTime rentedDate;
    @DynamoDBAttribute
    @DynamoDBTypeConverted(converter = LocalDateTimeConverter.class)
    private LocalDateTime returnDate;

    @DynamoDBAttribute
    @DynamoDBTypeConverted(converter = LocalDateTimeConverter.class)
    private LocalDateTime reservationBeginDate;
    @DynamoDBAttribute
    @DynamoDBTypeConverted(converter = LocalDateTimeConverter.class)
    private LocalDateTime reservationExpireDate;

}
