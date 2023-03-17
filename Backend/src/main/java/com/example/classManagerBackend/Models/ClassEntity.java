package com.example.classManagerBackend.Models;

import jakarta.persistence.*;

@Entity
@Table(name = "Class")
public class ClassEntity
{
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    int id;
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
