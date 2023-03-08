package com.example.classManagerBackend.Models;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "Student")
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
    String studentPhNum;
    String parentPhNum1;
    String parentPhNum2;
    @OneToMany
    @JoinColumn(name = "StudentId")
    List<SessionModel> sessionList;

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

    public List<SessionModel> getsessionList()
    {
        return sessionList;
    }

    public void setsessionList(List<SessionModel> sessionList)
    {
        this.sessionList = sessionList;
    }

    @Override
    public String toString()
    {
        return "StudentModel{" +
                "id=" + id +
                ", studentName='" + studentName + '\'' +
                ", schoolName='" + schoolName + '\'' +
                ", className='" + className + '\'' +
                ", boardName='" + boardName + '\'' +
                ", location='" + location + '\'' +
                ", studentPhNum='" + studentPhNum + '\'' +
                ", parentPhNum1='" + parentPhNum1 + '\'' +
                ", parentPhNum2='" + parentPhNum2 + '\'' +
                ", sessionList=" + sessionList.toString() +
                '}';
    }
}
