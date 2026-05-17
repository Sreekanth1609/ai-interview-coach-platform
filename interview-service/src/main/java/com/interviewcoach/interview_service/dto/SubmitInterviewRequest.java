package com.interviewcoach.interview_service.dto;

import lombok.Data;

import java.util.Map;

@Data
public class SubmitInterviewRequest {

    private Map<Integer, String> answers;
}
