package com.example.classManagerBackend.Services;

import com.example.classManagerBackend.Models.FeesAuditEntity;
import com.example.classManagerBackend.Models.SessionEntity;
import com.example.classManagerBackend.Models.StudentEntity;
import com.example.classManagerBackend.Repos.BoardRepo;
import com.example.classManagerBackend.Repos.ClassRepo;
import com.example.classManagerBackend.Repos.StudentRepo;
import com.example.classManagerBackend.Repos.SubjectRepo;
import com.example.classManagerBackend.Utils.FeesAuditMapper;
import com.example.classManagerBackend.Utils.StudentMapper;
import com.example.classManagerBackend.Utils.TestMapper;
import com.example.classManagerBackend.View.*;
import com.example.classManagerBackend.View.ExportData.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class ExportImportService
{
    @Autowired
    StudentService studentService;

    @Autowired
    StudentRepo studentRepo;

    @Autowired
    ClassRepo classRepo;

    @Autowired
    BoardRepo boardRepo;

    @Autowired
    SubjectRepo subjectRepo;

    @Autowired
    FilterService filterService;

    public ExportData Export()
    {
        ExportData exportData = new ExportData();

        List<StudentEntity> studentEntityList = studentRepo.findAll();
        studentEntityList = studentEntityList.stream().filter(StudentEntity::isActive).collect(Collectors.toList());

        //Student export data
        List<StudentExportData> studentExportDataList = new ArrayList<>();

        studentEntityList.forEach(e->{
            StudentExportData studentExportData = new StudentExportData();
            studentExportData.setStudentName(e.getStudentName());
            studentExportData.setDateOfBirth(e.getDateOfBirth());
            studentExportData.setSchoolName(e.getSchoolName());
            studentExportData.setClassName(e.getClassEntity().getClassName());
            studentExportData.setBoardName(e.getBoardEntity().getBoardName());
            studentExportData.setLocation(e.getLocation());
            studentExportData.setStudentPhNum(e.getStudentPhNum());
            studentExportData.setParentPhNum1(e.getParentPhNum1());
            studentExportData.setParentPhNum2(e.getParentPhNum2());

            studentExportDataList.add(studentExportData);
        });

        exportData.setStudentExportDataList(studentExportDataList);

        //Session export data
        List<SessionExportData> sessionExportDataList = new ArrayList<>();
        studentEntityList.forEach(e->{
            List<SessionEntity> sessionEntityList = e.getSessionList();
            sessionEntityList.forEach(ses->{
                SessionExportData sessionExportData = new SessionExportData();
                sessionExportData.setStudentName(e.getStudentName());
                sessionExportData.setClassName(e.getClassEntity().getClassName());
                sessionExportData.setBoardName(e.getBoardEntity().getBoardName());
                sessionExportData.setSubject(ses.getSubjectEntity().getSubject());
                sessionExportData.setDays(String.join(",", ses.getDays()));
                sessionExportData.setFees(ses.getFees());
                sessionExportData.setStartTime(ses.getStartTime());
                sessionExportData.setEndTime(ses.getEndTime());

                sessionExportDataList.add(sessionExportData);
            });
        });
        exportData.setSessionExportDataList(sessionExportDataList);

        //Fees export data
        List<FeesExportData> feesExportDataList = new ArrayList<>();

        studentEntityList.forEach(e->{
            List<FeesAuditEntity> feesAuditEntityList = e.getFeesAuditEntityList();
            feesAuditEntityList.forEach(f->{
                FeesExportData feesExportData = new FeesExportData();
                feesExportData.setStudentName(e.getStudentName());
                feesExportData.setClassName(e.getClassEntity().getClassName());
                feesExportData.setBoardName(e.getBoardEntity().getBoardName());
                feesExportData.setFees(f.getFees());
                feesExportData.setFeesDate(f.getFeesDate());
                feesExportData.setSubjects(f.getSubjects());
                feesExportData.setModeOfPayment(f.getModeOfPayment());
                feesExportData.setPaidOn(f.getPaidOn());
                feesExportData.setComments(f.getComments());

                feesExportDataList.add(feesExportData);
            });
        });

        exportData.setFeesExportDataList(feesExportDataList);

        //Test export data
        List<TestExportData> testExportDataList = new ArrayList<>();
        studentEntityList.forEach(e->{
            e.getTestEntityList().forEach(t->{
                TestExportData testExportData = new TestExportData();
                testExportData.setStudentName(e.getStudentName());
                testExportData.setClassName(e.getClassEntity().getClassName());
                testExportData.setBoardName(e.getBoardEntity().getBoardName());
                testExportData.setTestDate(t.getTestDate());
                testExportData.setTestName(t.getTestName());
                testExportData.setSubject(t.getSubject());
                testExportData.setMarksScored(t.getMarksScored());
                testExportData.setTotalMarks(t.getTotalMarks());
                testExportDataList.add(testExportData);
            });
        });
        exportData.setTestExportDataList(testExportDataList);

        //Get Class-Board-Subject data
        exportData.setClassList(filterService.GetClassList());
        exportData.setBoardList(filterService.GetBoardList());
        exportData.setSubjectList(filterService.GetSubjectList());

        return exportData;
    }

    public void ImportData(ExportData exportData)
    {
        //Import class details
        List<String> classList =  exportData.getClassList();
        classList.forEach(e->{
            filterService.UpdateClassList(classList);
        });

        //Import board details
        List<String> boardList =  exportData.getBoardList();
        boardList.forEach(e->{
            filterService.UpdateBoardList(boardList);
        });

        //Import subject details
        List<String> subjectList =  exportData.getSubjectList();
        subjectList.forEach(e->{
            filterService.UpdateSubjectList(subjectList);
        });

        //Import student-session-fees-test details
        List<StudentExportData> studentExportDataList = exportData.getStudentExportDataList();
        List<SessionExportData> sessionExportDataList = exportData.getSessionExportDataList();
        List<FeesExportData> feesExportDataList = exportData.getFeesExportDataList();
        List<TestExportData> testExportDataList = exportData.getTestExportDataList();

        studentExportDataList.forEach(s->{
            StudentDataModel studentDataModel = new StudentDataModel();

            studentDataModel.setStudentName(s.getStudentName());
            studentDataModel.setDateOfBirth(s.getDateOfBirth());
            studentDataModel.setLocation(s.getLocation());
            studentDataModel.setSchoolName(s.getSchoolName());
            studentDataModel.setClassName(s.getClassName());
            studentDataModel.setBoardName(s.getBoardName());
            studentDataModel.setStudentPhNum(s.getStudentPhNum());
            studentDataModel.setParentPhNum1(s.getParentPhNum1());
            studentDataModel.setParentPhNum2(s.getParentPhNum2());

            //Filter session
            List<SessionExportData> sessionList = sessionExportDataList.stream().filter(f-> (
                    Objects.equals(f.getStudentName(), s.getStudentName())
                            && Objects.equals(f.getClassName(), s.getClassName())
                            && Objects.equals(f.getBoardName(), s.getBoardName()))).collect(Collectors.toList());

            List<SessionDataModel> sessionDataModelList = new ArrayList<>();
            sessionList.forEach(ses->{
                SessionDataModel sessionDataModel = new SessionDataModel();
                sessionDataModel.setSubject(ses.getSubject());
                sessionDataModel.setDays(Arrays.asList(ses.getDays().split(",")));
                sessionDataModel.setFees(ses.getFees());
                sessionDataModel.setStartTime(ses.getStartTime());
                sessionDataModel.setEndTime(ses.getEndTime());

                sessionDataModelList.add(sessionDataModel);
            });

            studentDataModel.setSessionList(sessionDataModelList);

            //Filter fees
            List<FeesExportData> feesList = feesExportDataList.stream().filter(f-> (
                    Objects.equals(f.getStudentName(), s.getStudentName())
                            && Objects.equals(f.getClassName(), s.getClassName())
                            && Objects.equals(f.getBoardName(), s.getBoardName()))).collect(Collectors.toList());

            List<FeesAuditDataModel> feesAuditDataModelList = new ArrayList<>();

            feesList.forEach(f->{
                FeesAuditDataModel feesAuditDataModel = new FeesAuditDataModel();

                feesAuditDataModel.setStudentName(f.getStudentName());
                feesAuditDataModel.setClassName(f.getClassName());
                feesAuditDataModel.setBoardName(f.getBoardName());
                feesAuditDataModel.setFeesDate(f.getFeesDate());
                feesAuditDataModel.setSubjects(f.getSubjects());
                feesAuditDataModel.setFees(f.getFees());
                feesAuditDataModel.setPaidOn(f.getPaidOn());
                feesAuditDataModel.setComments(f.getComments());
                feesAuditDataModel.setModeOfPayment(f.getModeOfPayment());

                feesAuditDataModelList.add(feesAuditDataModel);
            });

            //Filter tests
            List<TestExportData> testList = testExportDataList.stream().filter(f-> (
                    Objects.equals(f.getStudentName(), s.getStudentName())
                            && Objects.equals(f.getClassName(), s.getClassName())
                            && Objects.equals(f.getBoardName(), s.getBoardName()))).collect(Collectors.toList());

            List<TestDataModel> testDataModelList = new ArrayList<>();
            testList.forEach(t->{
                TestDataModel testDataModel = new TestDataModel();

                testDataModel.setTestDate(t.getTestDate());
                testDataModel.setTestName(t.getTestName());
                testDataModel.setSubject(t.getSubject());
                testDataModel.setMarksScored(t.getMarksScored());
                testDataModel.setTotalMarks(t.getTotalMarks());
                testDataModel.setClassName(t.getClassName());
                testDataModel.setBoardName(t.getBoardName());

                testDataModelList.add(testDataModel);
            });

            //studentService.AddStudent(studentDataModel);

            studentService.ImportStudent(studentDataModel, feesAuditDataModelList, testDataModelList);
        });
    }
}
