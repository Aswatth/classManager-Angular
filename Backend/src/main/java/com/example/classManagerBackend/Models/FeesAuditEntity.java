package com.example.classManagerBackend.Models;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "feesAudit")
public class FeesAuditEntity
{
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    int id;
    Date feesDate;
    int studentId;
    double fees;
    Date paidOn;
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

    public int getStudentId()
    {
        return studentId;
    }

    public void setStudentId(int studentId)
    {
        this.studentId = studentId;
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

    public String getComments()
    {
        return comments;
    }

    public void setComments(String comments)
    {
        this.comments = comments;
    }

    @Override
    public String toString()
    {
        return "FeesAuditEntity{" +
                "id=" + id +
                ", feesDate=" + feesDate +
                ", studentId=" + studentId +
                ", fees=" + fees +
                ", paidOn=" + paidOn +
                ", comments='" + comments + '\'' +
                '}';
    }
}
