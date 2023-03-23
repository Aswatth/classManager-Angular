package com.example.classManagerBackend.Models;

import jakarta.persistence.*;

@Entity
@Table(name = "Subject")
public class SubjectEntity
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int id;
    String subject;

    public int getId()
    {
        return id;
    }

    public void setId(int id)
    {
        this.id = id;
    }

    public String getSubject()
    {
        return subject;
    }

    public void setSubject(String subject)
    {
        this.subject = subject;
    }
}
