package com.example.classManagerBackend.Services;

import com.example.classManagerBackend.Models.SessionEntity;
import com.example.classManagerBackend.Models.StudentEntity;
import com.example.classManagerBackend.Models.SubjectEntity;
import com.example.classManagerBackend.Repos.SessionRepo;
import com.example.classManagerBackend.Repos.StudentRepo;
import com.example.classManagerBackend.Repos.SubjectRepo;
import com.example.classManagerBackend.Utils.SessionMapper;
import com.example.classManagerBackend.View.SessionDataModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SessionService implements ISessionService
{
    @Autowired
    SessionRepo sessionRepo;

    @Autowired
    SubjectRepo subjectRepo;

    @Autowired
    FeesAuditService feesAuditService;

    @Autowired
    StudentRepo studentRepo;

    @Override
    public List<SessionEntity> AddSessions(List<SessionEntity> sessionEntityList, int studentId)
    {
        List<SessionEntity> savedSessions = new ArrayList<>();
        sessionEntityList.forEach(e -> {
            StudentEntity studentEntity = studentRepo.findById(studentId).get();
            e.setStudentEntity(studentEntity);

            //Check if a studentId-Subject combination already exists
            if(sessionRepo.findBySubjectEntityAndStudentEntity(e.getSubjectEntity(), studentEntity).isEmpty())
            {
                //Insert if not already present
                savedSessions.add(sessionRepo.save(e));
            }
        });
        return savedSessions;
    }

    @Override
    public List<SessionDataModel> UpdateSession(int studentId, List<SessionDataModel> sessionDataModelList)
    {
        StudentEntity studentEntity = studentRepo.findById(studentId).get();

        //List of existing subject for the current student's sessions
        List<String> existingSessionSubject = sessionRepo.findByStudentEntity(studentEntity).stream().map(e-> e.getSubjectEntity().getSubject()).collect(Collectors.toList());

        List<SessionEntity> sessionEntityList = new ArrayList<>();
        sessionDataModelList.forEach(e-> sessionEntityList.add(SessionMapper.DataToEntity(e,subjectRepo.findBySubject(e.getSubject()), studentRepo.findById(studentId).get())));

        sessionEntityList.forEach(e -> {
            //Check if a session already exists for a particular subject
            if(existingSessionSubject.contains(e.getSubjectEntity().getSubject()))
            {
                SessionEntity existingSession = sessionRepo.findBySubjectEntityAndStudentEntity(e.getSubjectEntity(), studentEntity).get();
                e.setId(existingSession.getId());

                //Update if already exists
                System.out.println("Updating: "+ e);

                sessionRepo.save(e);

                existingSessionSubject.remove(e.getSubjectEntity().getSubject());
            }
            else
            {
                sessionRepo.save(e);
            }
        });

        //If any session's subject is left out then delete it
        if(existingSessionSubject.size() > 0)
        {
            existingSessionSubject.forEach(e -> DeleteSessionBySubject(e, studentId));
        }

        //If sessions are updated then update fees audit
        List<String> subjectList = new ArrayList<>();
        sessionEntityList.forEach(e-> subjectList.add(e.getSubjectEntity().getSubject()));

        feesAuditService.UpdateFeesAudit(studentId, String.join(",",subjectList),sessionEntityList.stream().map(SessionEntity::getFees).mapToDouble(Double::valueOf).sum());

        return sessionDataModelList;
    }

    @Override
    public void DeleteSession(SessionEntity sessionEntity)
    {
        sessionRepo.delete(sessionEntity);
    }

    @Override
    public void DeleteSessions(List<SessionEntity> sessionEntityList)
    {
        sessionRepo.deleteAll(sessionEntityList);
    }

    @Override
    public void DeleteSessionBySubject(String subject, int studentId){
        SubjectEntity subjectEntity = subjectRepo.findBySubject(subject);
        StudentEntity studentEntity = studentRepo.findById(studentId).get();
        Optional<SessionEntity> sessionModel =sessionRepo.findBySubjectEntityAndStudentEntity(subjectEntity, studentEntity);
        sessionModel.ifPresent(this::DeleteSession);
    }
}
