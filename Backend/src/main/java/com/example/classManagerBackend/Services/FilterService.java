package com.example.classManagerBackend.Services;

import com.example.classManagerBackend.Models.BoardEntity;
import com.example.classManagerBackend.Models.ClassEntity;
import com.example.classManagerBackend.Models.SubjectEntity;
import com.example.classManagerBackend.Repos.BoardRepo;
import com.example.classManagerBackend.Repos.ClassRepo;
import com.example.classManagerBackend.Repos.SubjectRepo;
import com.example.classManagerBackend.View.SessionDataModel;
import com.example.classManagerBackend.View.StudentDataModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.stream.Collectors;

@Service
public class FilterService
{
    @Autowired
    BoardRepo boardRepo;

    @Autowired
    ClassRepo classRepo;

    @Autowired
    SubjectRepo subjectRepo;

    @Autowired
    StudentService studentService;

    public List<String> GetClassList()
    {
        return classRepo.findAll().stream().map(ClassEntity::getClassName).collect(Collectors.toList());
    }

    public void UpdateClassList(List<String> classList)
    {
        List<String> existing = classRepo.findAll().stream().map(ClassEntity::getClassName).collect(Collectors.toList());

        List<String> toAdd = new ArrayList<>();

        classList.forEach(e->{
            if(!existing.contains(e))
            {
                //Save if it does not already exist
                ClassEntity classEntity = new ClassEntity();
                classEntity.setClassName(e);
                classRepo.save(classEntity);
            }
            existing.remove(e);
        });

        if((long) existing.size() > 0)
        {
            existing.forEach(e->classRepo.delete(classRepo.findByClassName(e)));
        }
    }

    public List<String> GetBoardList()
    {
        return boardRepo.findAll().stream().map(BoardEntity::getBoardName).collect(Collectors.toList());
    }

    public void UpdateBoardList(List<String> boardList)
    {
        List<String> existing = boardRepo.findAll().stream().map(BoardEntity::getBoardName).collect(Collectors.toList());

        List<String> toAdd = new ArrayList<>();

        boardList.forEach(e->{
            if(!existing.contains(e))
            {
                //Save if it does not already exist
                BoardEntity boardEntity = new BoardEntity();
                boardEntity.setBoardName(e);
                boardRepo.save(boardEntity);
            }
            existing.remove(e);
        });

        if((long) existing.size() > 0)
        {
            existing.forEach(e->boardRepo.delete(boardRepo.findByBoardName(e)));
        }
    }

    public List<String> GetSubjectList()
    {
        return subjectRepo.findAll().stream().map(SubjectEntity::getSubject).collect(Collectors.toList());
    }

    public void UpdateSubjectList(List<String> subjectList)
    {
        List<String> existing = subjectRepo.findAll().stream().map(SubjectEntity::getSubject).collect(Collectors.toList());

        List<String> toAdd = new ArrayList<>();

        subjectList.forEach(e->{
            if(!existing.contains(e))
            {
                //Save if it does not already exist
                SubjectEntity subjectEntity = new SubjectEntity();
                subjectEntity.setSubject(e);
                subjectRepo.save(subjectEntity);
            }
            existing.remove(e);
        });

        if((long) existing.size() > 0)
        {
            existing.forEach(e->subjectRepo.delete(subjectRepo.findBySubject(e)));
        }
    }

    public boolean IsSafeToDelete(String itemToDelete, String cbsType)
    {
        AtomicBoolean isSafe = new AtomicBoolean(true);

        List<StudentDataModel> studentDataModelList = studentService.GetAllStudents(false);

        studentDataModelList.forEach(e->{
            if(Objects.equals(cbsType, "class"))
            {
                if(Objects.equals(e.getClassName(), itemToDelete))
                {
                    isSafe.set(false);
                }
            }
            else if(Objects.equals(cbsType, "board"))
            {
                if(Objects.equals(e.getBoardName(), itemToDelete))
                {
                    isSafe.set(false);
                }
            }
            else if(Objects.equals(cbsType, "subject"))
            {
                List<SessionDataModel> sessionDataModelList = e.getSessionList();
                sessionDataModelList.forEach(s->{
                    if(Objects.equals(s.getSubject(), itemToDelete))
                    {
                        isSafe.set(false);
                    }
                });
            }
        });

        return isSafe.get();
    }
}
