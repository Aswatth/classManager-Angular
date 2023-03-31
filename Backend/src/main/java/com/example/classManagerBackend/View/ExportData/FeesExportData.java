package com.example.classManagerBackend.View.ExportData;

import java.util.Date;

public class FeesExportData
{
    String studentName;
    String className;
    String boardName;

    Date feesDate;
    String subjects;
    double fees;
    Date paidOn;
    String modeOfPayment;
    String comments;

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

    public Date getFeesDate()
    {
        return feesDate;
    }

    public void setFeesDate(Date feesDate)
    {
        this.feesDate = feesDate;
    }

    public String getSubjects()
    {
        return subjects;
    }

    public void setSubjects(String subjects)
    {
        this.subjects = subjects;
    }

    public double getFees()
    {
        return fees;
    }

    public void setFees(double fees)
    {
        this.fees = fees;
    }

    public Date getPaidOn()
    {
        return paidOn;
    }

    public void setPaidOn(Date paidOn)
    {
        this.paidOn = paidOn;
    }

    public String getModeOfPayment()
    {
        return modeOfPayment;
    }

    public void setModeOfPayment(String modeOfPayment)
    {
        this.modeOfPayment = modeOfPayment;
    }

    public String getComments()
    {
        return comments;
    }

    public void setComments(String comments)
    {
        this.comments = comments;
    }
}
