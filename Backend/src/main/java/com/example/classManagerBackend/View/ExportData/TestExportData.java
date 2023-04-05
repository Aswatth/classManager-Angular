package com.example.classManagerBackend.View.ExportData;

import java.util.Date;

public class TestExportData
{

    String studentName;
    String className;
    String boardName;

    String testName;
    float totalMarks;
    float marksScored;
    Date testDate;
    String subject;

    public String getStudentName()
    {
        return studentName;
    }

    public void setStudentName(String studentName)
    {
        this.studentName = studentName;
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

    public String getSubject()
    {
        return subject;
    }

    public void setSubject(String subject)
    {
        this.subject = subject;
    }
}
