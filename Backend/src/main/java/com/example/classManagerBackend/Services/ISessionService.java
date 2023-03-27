package com.example.classManagerBackend.Services;

import com.example.classManagerBackend.Models.SessionEntity;
import com.example.classManagerBackend.View.SessionDataModel;

import java.util.List;

public interface ISessionService
{
    public List<SessionEntity> AddSessions(List<SessionEntity> sessionEntityList, int studentId);
    public void DeleteSession(SessionEntity sessionEntity);
    public void DeleteSessionBySubject(String subject, int studentId);
    public void DeleteSessions(List<SessionEntity> sessionEntityList);
    public List<SessionDataModel> UpdateSession(int studentId, List<SessionDataModel> sessionDataModelList);
}
