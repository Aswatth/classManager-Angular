package com.example.classManagerBackend.View;

import com.example.classManagerBackend.Models.BoardEntity;
import com.example.classManagerBackend.Models.ClassEntity;
import com.example.classManagerBackend.Models.SubjectEntity;

import java.util.List;

public class ExportData
{
    List<StudentDataModel> studentModelList;
    List<FeesAuditDataModel> feesModelList;
    List<TestDataModel> testModelList;
    List<String> classList;
    List<String> boardList;
    List<String> subjectList;

    public List<StudentDataModel> getStudentModelList()
    {
        return studentModelList;
    }

    public void setStudentModelList(List<StudentDataModel> studentModelList)
    {
        this.studentModelList = studentModelList;
    }

    public List<FeesAuditDataModel> getFeesModelList()
    {
        return feesModelList;
    }

    public void setFeesModelList(List<FeesAuditDataModel> feesModelList)
    {
        this.feesModelList = feesModelList;
    }

    public List<TestDataModel> getTestModelList()
    {
        return testModelList;
    }

    public void setTestModelList(List<TestDataModel> testModelList)
    {
        this.testModelList = testModelList;
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
