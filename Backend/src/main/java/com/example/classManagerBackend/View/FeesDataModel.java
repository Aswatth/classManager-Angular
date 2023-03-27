package com.example.classManagerBackend.View;

import com.example.classManagerBackend.Models.FeesAuditEntity;

public class FeesDataModel
{
    int studentId;
    String studentName;
    String className;
    String boardName;

    FeesAuditEntity feesAuditEntity;

    public int getStudentId()
    {
        return studentId;
    }

    public void setStudentId(int studentId)
    {
        this.studentId = studentId;
    }

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

    public FeesAuditEntity getFeesAuditEntity()
    {
        return feesAuditEntity;
    }

    public void setFeesAuditEntity(FeesAuditEntity feesAuditEntity)
    {
        this.feesAuditEntity = feesAuditEntity;
    }
}
