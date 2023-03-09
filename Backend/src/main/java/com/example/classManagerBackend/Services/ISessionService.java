package com.example.classManagerBackend.Services;

import com.example.classManagerBackend.Models.SessionModel;

import java.util.List;

public interface ISessionService
{
    public void AddSessions(List<SessionModel> sessionModelList, int studentId);
    public void DeleteSession(SessionModel sessionModel);
    public void DeleteSessionBySubject(String subject, int studentId);
}
