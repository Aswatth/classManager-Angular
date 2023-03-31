package com.example.classManagerBackend.View.ExportData;

import com.example.classManagerBackend.Models.BoardEntity;
import com.example.classManagerBackend.Models.ClassEntity;
import com.example.classManagerBackend.Models.SubjectEntity;
import com.example.classManagerBackend.View.FeesAuditDataModel;
import com.example.classManagerBackend.View.StudentDataModel;
import com.example.classManagerBackend.View.TestDataModel;

import java.util.List;

public class ExportData
{
    List<StudentExportData> studentExportDataList;
    List<SessionExportData> sessionExportDataList;
    List<FeesExportData> feesExportDataList;
    List<TestExportData> testExportDataList;
    List<String> classList;
    List<String> boardList;
    List<String> subjectList;

    public List<StudentExportData> getStudentExportDataList()
    {
        return studentExportDataList;
    }

    public void setStudentExportDataList(List<StudentExportData> studentExportDataList)
    {
        this.studentExportDataList = studentExportDataList;
    }

    public List<SessionExportData> getSessionExportDataList()
    {
        return sessionExportDataList;
    }

    public void setSessionExportDataList(List<SessionExportData> sessionExportDataList)
    {
        this.sessionExportDataList = sessionExportDataList;
    }

    public List<FeesExportData> getFeesExportDataList()
    {
        return feesExportDataList;
    }

    public void setFeesExportDataList(List<FeesExportData> feesExportDataList)
    {
        this.feesExportDataList = feesExportDataList;
    }

    public List<TestExportData> getTestExportDataList()
    {
        return testExportDataList;
    }

    public void setTestExportDataList(List<TestExportData> testExportDataList)
    {
        this.testExportDataList = testExportDataList;
    }

    public List<String> getClassList()
    {
        return classList;
    }

    public void setClassList(List<String> classList)
    {
        this.classList = classList;
    }

    public List<String> getBoardList()
    {
        return boardList;
    }

    public void setBoardList(List<String> boardList)
    {
        this.boardList = boardList;
    }

    public List<String> getSubjectList()
    {
        return subjectList;
    }

    public void setSubjectList(List<String> subjectList)
    {
        this.subjectList = subjectList;
    }
}
