package com.example.classManagerBackend.View;

import java.util.Date;

public class TestDataModel
{
    int id;
    String testName;
    float totalMarks;
    float marksScored;
    Date testDate;
    String className;
    String boardName;
    String subject;
    int studentId;

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
}
