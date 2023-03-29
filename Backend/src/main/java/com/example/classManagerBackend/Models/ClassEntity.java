package com.example.classManagerBackend.Models;

import jakarta.persistence.*;
import org.springframework.lang.NonNull;

@Entity
@Table(name = "Class")
public class ClassEntity
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int id;

    @NonNull
    String className;
    public int getId()
    {
        return id;
    }

    public void setId(int id)
    {
        this.id = id;
    }

    public String getClassName()
    {
        return className;
    }

    public void setClassName(String className)
    {
        this.className = className;
    }
}
