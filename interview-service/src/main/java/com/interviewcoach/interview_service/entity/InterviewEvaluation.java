package com.interviewcoach.interview_service.entity;

import lombok.Data;

import java.util.List;

@Data
public class InterviewEvaluation {

    private Integer score;

    private List<String> strengths;

    private List<String> improvements;

    private String feedback;
}