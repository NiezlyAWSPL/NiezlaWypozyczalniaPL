package com.example.booksRenting.model.entity;

import com.amazonaws.services.dynamodbv2.datamodeling.*;
import com.example.booksRenting.model.converters.LocalDateTimeConverter;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;

@EqualsAndHashCode(callSuper = true)
@Data
@DynamoDBTable(tableName = "books")
public class Rental extends BaseEntity{

    @Override
    @DynamoDBRangeKey(attributeName = "sk")
    @DynamoDBIndexRangeKey(globalSecondaryIndexName = "userId")
    public String getSk() {
        return super.getSk();
    }

    @DynamoDBAttribute
    @DynamoDBIndexHashKey(globalSecondaryIndexName = "bookDefinitionId")
    private String bookDefinitionId;

    @DynamoDBAttribute
    @DynamoDBIndexRangeKey(globalSecondaryIndexName = "bookDefinitionId")
    private String statusReservationExpireDate;

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
    @DynamoDBTypeConverted(converter = LocalDateTimeConverter.class)
    private LocalDateTime rentedDate;
    @DynamoDBAttribute
    @DynamoDBTypeConverted(converter = LocalDateTimeConverter.class)
    private LocalDateTime returnDate;

}
