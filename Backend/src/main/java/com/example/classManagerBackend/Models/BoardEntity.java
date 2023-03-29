package com.example.classManagerBackend.Models;

import jakarta.persistence.*;
import org.springframework.lang.NonNull;

@Entity
@Table(name = "Board")
public class BoardEntity
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int id;

    @NonNull
    String boardName;

    public int getId()
    {
        return id;
    }

    public void setId(int id)
    {
        this.id = id;
    }

    public String getBoardName()
    {
        return boardName;
    }

    public void setBoardName(String boardName)
    {
        this.boardName = boardName;
    }
}
