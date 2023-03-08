package com.example.classManagerBackend.Models;

import com.example.classManagerBackend.StringListConverter;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "Session")
public class SessionModel
{
    @Id
    @GeneratedValue
    int id;

    int studentId;
    String subject;
    @Convert(converter = StringListConverter.class)
    List<String> days;
    String startTime;
    String endTime;
    float fees;

    public int getId()
    {
        return id;
    }

    public void setId(int id)
    {
        this.id = id;
    }

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

    @Override
    public String toString()
    {
        return "SessionModel{" +
                "id=" + id +
                ", studentId=" + studentId +
                ", subject='" + subject + '\'' +
                ", days=" + days +
                ", startTime='" + startTime + '\'' +
                ", endTime='" + endTime + '\'' +
                ", fees=" + fees +
                '}';
    }
}
