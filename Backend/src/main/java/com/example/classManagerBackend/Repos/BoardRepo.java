package com.example.classManagerBackend.Repos;

import com.example.classManagerBackend.Models.BoardEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardRepo extends JpaRepository<BoardEntity, Integer>
{
    public BoardEntity findByBoardName(String boardName);
    public BoardEntity findByBoardNameIgnoreCase(String boardName);
}
