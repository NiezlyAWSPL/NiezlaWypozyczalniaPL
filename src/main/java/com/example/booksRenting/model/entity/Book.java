package com.example.booksRenting.model.entity;

import com.amazonaws.services.dynamodbv2.datamodeling.*;
import com.example.booksRenting.model.converters.LocalDateTimeConverter;
import lombok.*;

import java.time.LocalDateTime;

@EqualsAndHashCode(callSuper = true)
@Data
@DynamoDBTable(tableName = "books")
public class Book extends BaseEntity{

    @Override
    @DynamoDBIndexRangeKey(globalSecondaryIndexName = "userId")
    @DynamoDBRangeKey(attributeName = "sk")
    public String getSk() {
        return super.getSk();
    }

    @DynamoDBAttribute
    @DynamoDBIndexHashKey(globalSecondaryIndexName = "bookDefinitionId")
    private String bookDefinitionId;

    @DynamoDBAttribute
    @DynamoDBIndexRangeKey(globalSecondaryIndexName = "bookDefinitionId")
    private long reservedTillTimeStamp = 0;

    @DynamoDBAttribute
    private String title;

    @DynamoDBAttribute
    private String author;

    @DynamoDBAttribute
    private String libraryId;

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
    private LocalDateTime reservationBeginDate;
    @DynamoDBAttribute
    @DynamoDBTypeConverted(converter = LocalDateTimeConverter.class)
    private LocalDateTime reservationExpireDate;

}
