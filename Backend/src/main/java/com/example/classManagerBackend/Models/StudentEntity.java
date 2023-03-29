package com.example.classManagerBackend.Models;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "Student")
public class StudentEntity
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int id;
    String studentName;
    String schoolName;
    //String className;

    @OneToOne
    @JoinColumn(name = "classId")
    ClassEntity classEntity;
    @OneToOne
    @JoinColumn(name = "boardId")
    BoardEntity boardEntity;
    //String boardName;
    String location;
    String studentPhNum;
    String parentPhNum1;
    String parentPhNum2;
    @OneToMany
    @JoinColumn(name = "StudentId")
    List<SessionEntity> sessionList;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "StudentId")
    List<FeesAuditEntity> feesAuditEntityList;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "studentId")
    List<TestEntity> testEntityList;

    boolean isActive;

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

    public ClassEntity getClassEntity()
    {
        return classEntity;
    }

    public void setClassEntity(ClassEntity classEntity)
    {
        this.classEntity = classEntity;
    }

    public BoardEntity getBoardEntity()
    {
        return boardEntity;
    }

    public void setBoardEntity(BoardEntity boardEntity)
    {
        this.boardEntity = boardEntity;
    }

    /*public int getBoardId()
    {
        return boardId;
    }

    public void setBoardId(int boardId)
    {
        this.boardId = boardId;
    }*/

    /*public String getClassName()
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
    }*/

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

    public List<SessionEntity> getSessionList()
    {
        return sessionList;
    }

    public void setSessionList(List<SessionEntity> sessionList)
    {
        this.sessionList = sessionList;
    }

    public List<FeesAuditEntity> getFeesAuditEntityList()
    {
        return feesAuditEntityList;
    }

    public void setFeesAuditEntityList(List<FeesAuditEntity> feesAuditEntityList)
    {
        this.feesAuditEntityList = feesAuditEntityList;
    }

    public boolean isActive()
    {
        return isActive;
    }

    public void setActive(boolean active)
    {
        isActive = active;
    }

    public List<TestEntity> getTestEntityList()
    {
        return testEntityList;
    }

    public void setTestEntityList(List<TestEntity> testEntityList)
    {
        this.testEntityList = testEntityList;
    }
}
