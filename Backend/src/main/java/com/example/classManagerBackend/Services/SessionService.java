package com.example.classManagerBackend.Services;

import com.example.classManagerBackend.Models.SessionEntity;
import com.example.classManagerBackend.Repos.SessionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    FeesAuditService feesAuditService;

    @Override
    public void AddSessions(List<SessionEntity> sessionEntityList, int studentId)
    {
        sessionEntityList.forEach(e -> {
            e.setStudentId(studentId);

            //Check if a studentId-Subject combination already exists
            if(sessionRepo.findBySubjectAndStudentId(e.getSubject(), studentId).isEmpty())
            {
                //Insert if not already present
                sessionRepo.save(e);
            }
        });
    }

    @Override
    public List<SessionEntity> UpdateSession(int studentId, List<SessionEntity> sessionEntityList)
    {
        //List of existing subject for the current student's sessions
        List<String> existingSessionSubject = sessionRepo.findByStudentId(studentId).stream().map(SessionEntity::getSubject).collect(Collectors.toList());

        sessionEntityList.forEach(e -> {
            //Check if a session already exists for a particular subject
            if(existingSessionSubject.contains(e.getSubject()))
            {
                SessionEntity existingSession = sessionRepo.findBySubjectAndStudentId(e.getSubject(), studentId).get();
                e.setId(existingSession.getId());

                //Update if already exists
                System.out.println("Updating: "+ e);
                sessionRepo.save(e);

                existingSessionSubject.remove(e.getSubject());
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
        sessionEntityList.forEach(e-> subjectList.add(e.getSubject()));

        feesAuditService.UpdateFeesAudit(studentId, String.join(",",subjectList),sessionEntityList.stream().map(SessionEntity::getFees).mapToDouble(Double::valueOf).sum());

        return sessionRepo.findByStudentId(studentId);
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
        Optional<SessionEntity> sessionModel =sessionRepo.findBySubjectAndStudentId(subject, studentId);
        sessionModel.ifPresent(this::DeleteSession);
    }
}
