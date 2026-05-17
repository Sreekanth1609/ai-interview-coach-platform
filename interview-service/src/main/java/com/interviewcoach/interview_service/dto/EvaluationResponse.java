package com.interviewcoach.interview_service.dto;

import lombok.Data;

import java.util.List;

@Data
public class EvaluationResponse {

    private Integer score;

    private List<String> strengths;

    private List<String> improvements;

    private String feedback;
}