package com.example.classManagerBackend.Models;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "test")
public class TestEntity
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int id;

    String testName;
    float totalMarks;
    float marksScored;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    Date testDate;

    String className;
    String boardName;
    String subject;

    @ManyToOne
    @JoinColumn(name = "studentId")
    StudentEntity studentEntity;

    public int getId()
    {
        return id;
    }

    public void setId(int id)
    {
        this.id = id;
    }

    public String getTestName()
    {
        return testName;
    }

    public void setTestName(String testName)
    {
        this.testName = testName;
    }

    public float getTotalMarks()
    {
        return totalMarks;
    }

    public void setTotalMarks(float totalMarks)
    {
        this.totalMarks = totalMarks;
    }

    public float getMarksScored()
    {
        return marksScored;
    }

    public void setMarksScored(float marksScored)
    {
        this.marksScored = marksScored;
    }

    public Date getTestDate()
    {
        return testDate;
    }

    public void setTestDate(Date testDate)
    {
        this.testDate = testDate;
    }

    public String getClassName()
    {
        return className;
    }

    public void setClassName(String className)
    {
        this.className = className;
    }

    public String getBoardName()
    {
        return boardName;
    }

    public void setBoardName(String boardName)
    {
        this.boardName = boardName;
    }

    public String getSubject()
    {
        return subject;
    }

    public void setSubject(String subject)
    {
        this.subject = subject;
    }

    public StudentEntity getStudentEntity()
    {
        return studentEntity;
    }

    public void setStudentEntity(StudentEntity studentEntity)
    {
        this.studentEntity = studentEntity;
    }
}
