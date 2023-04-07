package com.example.classManagerBackend.Models;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "feesAudit")
public class FeesAuditEntity
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int id;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    Date feesDate;
    String subjects;

    @ManyToOne
    @JoinColumn(name = "studentId")
    StudentEntity studentEntity;

    String className;
    String boardName;

    double fees;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    Date paidOn;
    String modeOfPayment;
    String comments;

    public FeesAuditEntity()
    {
    }

    public int getId()
    {
        return id;
    }

    public void setId(int id)
    {
        this.id = id;
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

    public StudentEntity getStudentEntity()
    {
        return studentEntity;
    }

    public void setStudentEntity(StudentEntity studentEntity)
    {
        this.studentEntity = studentEntity;
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
