package com.interviewcoach.interview_service.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.interviewcoach.interview_service.entity.InterviewEvaluation;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "interview_sessions")
public class InterviewSession {

    @Id
    private String id;

    private String userEmail;

    private String role;

    private String experience;

    private String techStack;

    private String difficulty;

    private int numberOfQuestions;

    private List<String> Questions;

    private Map<Integer, String> answers;

    private boolean completed;

    private InterviewEvaluation evaluation;

    private LocalDateTime createdAt;
}
