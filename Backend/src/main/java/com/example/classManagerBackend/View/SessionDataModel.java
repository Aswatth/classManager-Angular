package com.example.classManagerBackend.View;

import com.example.classManagerBackend.Models.SubjectEntity;
import com.example.classManagerBackend.Utils.StringListConverter;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Convert;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;

import java.util.Date;
import java.util.List;

public class SessionDataModel
{
    int id;
    int studentId;
    String subject;
    List<String> days;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    Date startTime;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    Date endTime;
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

    public Date getStartTime()
    {
        return startTime;
    }

    public void setStartTime(Date startTime)
    {
        this.startTime = startTime;
    }

    public Date getEndTime()
    {
        return endTime;
    }

    public void setEndTime(Date endTime)
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
