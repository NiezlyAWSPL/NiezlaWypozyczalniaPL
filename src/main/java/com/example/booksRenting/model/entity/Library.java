package com.example.booksRenting.model.entity;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
@DynamoDBTable(tableName = "library")
public class Library extends BaseEntity{

    @DynamoDBAttribute
    private String address;

}
