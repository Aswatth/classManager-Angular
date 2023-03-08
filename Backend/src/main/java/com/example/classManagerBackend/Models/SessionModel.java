package com.example.classManagerBackend.Models;

import java.util.Arrays;
import java.util.List;

public class SessionModel
{
    String subject;
    int studentId;
    List<String> days;
    String startTime;
    String endTime;
    float fees;

    public SessionModel(){};
    public SessionModel(String subject, int studentId, List<String> days, String startTime, String endTime, float fees)
    {
        this.subject = subject;
        this.studentId = studentId;
        this.days = days;
        this.startTime = startTime;
        this.endTime = endTime;
        this.fees = fees;
    }

    public SessionModel(String subject, int studentId, String days, String startTime, String endTime, float fees)
    {
        this.subject = subject;
        this.studentId = studentId;
        this.days = Arrays.asList(days.split(","));
        this.startTime = startTime;
        this.endTime = endTime;
        this.fees = fees;
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
}
