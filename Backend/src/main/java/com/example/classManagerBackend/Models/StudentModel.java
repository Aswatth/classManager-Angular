package com.example.classManagerBackend.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class StudentModel
{
    @Id
    @GeneratedValue
    int id;
    String studentName;
    String schoolName;
    String className;
    String boardName;
    String location;
    String studentMobileNumber;
    String parentMobileNumber1;
    String parentMobileNumber2;

    public int getId()
    {
        return id;
    }

    public void setId(int id)
    {
        this.id = id;
    }

    public String getStudentName()
    {
        return studentName;
    }

    public void setStudentName(String studentName)
    {
        this.studentName = studentName;
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

    public String getStudentMobileNumber()
    {
        return studentMobileNumber;
    }

    public void setStudentMobileNumber(String studentMobileNumber)
    {
        this.studentMobileNumber = studentMobileNumber;
    }

    public String getParentMobileNumber1()
    {
        return parentMobileNumber1;
    }

    public void setParentMobileNumber1(String parentMobileNumber1)
    {
        this.parentMobileNumber1 = parentMobileNumber1;
    }

    public String getParentMobileNumber2()
    {
        return parentMobileNumber2;
    }

    public void setParentMobileNumber2(String parentMobileNumber2)
    {
        this.parentMobileNumber2 = parentMobileNumber2;
    }

}
