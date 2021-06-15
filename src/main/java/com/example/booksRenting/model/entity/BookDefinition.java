package com.example.booksRenting.model.entity;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBRangeKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
@DynamoDBTable(tableName = "books")
public class BookDefinition extends BaseEntity{

    @Override
    @DynamoDBRangeKey(attributeName = "sk")
    public String getSk() {
        return super.getSk();
    }

    @DynamoDBAttribute
    private String definitionTitle;

    @DynamoDBAttribute
    private String authorTitle;

}
