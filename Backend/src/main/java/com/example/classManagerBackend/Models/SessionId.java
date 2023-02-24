package com.example.classManagerBackend.Models;

import java.io.Serializable;

public class SessionId implements Serializable
{
    String subject;
    int studentId;

    public SessionId()
    {
    }

    public SessionId(String subject, int studentId)
    {
        this.subject = subject;
        this.studentId = studentId;
    }
}
