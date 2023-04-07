package com.example.classManagerBackend.View.ExportData;

import java.util.Date;

public class StudentExportData
{
    String studentName;
    Date dateOfBirth;
    String className;
    String boardName;

    String schoolName;
    String location;
    String studentPhNum;
    String parentPhNum1;
    String parentPhNum2;

    public String getStudentName()
    {
        return studentName;
    }

    public void setStudentName(String studentName)
    {
        this.studentName = studentName;
    }

    public Date getDateOfBirth()
    {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth)
    {
        this.dateOfBirth = dateOfBirth;
    }

    public String getSchoolName()
    {
        return schoolName;
    }

    public void setSchoolName(String schoolName)
    {
        this.schoolName = schoolName;
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

    public String getLocation()
    {
        return location;
    }

    public void setLocation(String location)
    {
        this.location = location;
    }

    public String getStudentPhNum()
    {
        return studentPhNum;
    }

    public void setStudentPhNum(String studentPhNum)
    {
        this.studentPhNum = studentPhNum;
    }

    public String getParentPhNum1()
    {
        return parentPhNum1;
    }

    public void setParentPhNum1(String parentPhNum1)
    {
        this.parentPhNum1 = parentPhNum1;
    }

    public String getParentPhNum2()
    {
        return parentPhNum2;
    }

    public void setParentPhNum2(String parentPhNum2)
    {
        this.parentPhNum2 = parentPhNum2;
    }
}
