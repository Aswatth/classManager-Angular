package com.example.classManagerBackend;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Converter
public class StringListConverter implements AttributeConverter<List<String>, String>
{
    private String delimiter = ",";

    @Override
    public String convertToDatabaseColumn(List<String> strings)
    {
        return strings != null? String.join(delimiter, strings) : "";
    }

    @Override
    public List<String> convertToEntityAttribute(String s)
    {
        return s != null? Arrays.asList(s.split(",")) : Collections.emptyList();
    }
}
