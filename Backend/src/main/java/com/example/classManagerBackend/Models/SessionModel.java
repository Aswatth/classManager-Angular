package com.example.classManagerBackend.Models;

import com.example.classManagerBackend.StringListConverter;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "Session")
@IdClass(SessionId.class)
public class SessionModel
{
    @Id
    String subject;

    @Id
    int studentId;

    @Convert(converter = StringListConverter.class)
    List<String> days;
    String startTime;
    String endTime;
    float fees;

    public int getStudentId()
    {
        return studentId;
    }

    public void setStudentId(int studentId)
    {
        this.studentId = studentId;
    }

    public String getSubject()
    {
        return subject;
    }

    public void setSubject(String subject)
    {
        this.subject = subject;
    }

    public List<String> getDays()
    {
        return days;
    }

    public void setDays(List<String> days)
    {
        this.days = days;
    }

    public String getStartTime()
    {
        return startTime;
    }

    public void setStartTime(String startTime)
    {
        this.startTime = startTime;
    }

    public String getEndTime()
    {
        return endTime;
    }

    public void setEndTime(String endTime)
    {
        this.endTime = endTime;
    }

    public float getFees()
    {
        return fees;
    }

    public void setFees(float fees)
    {
        this.fees = fees;
    }
}
