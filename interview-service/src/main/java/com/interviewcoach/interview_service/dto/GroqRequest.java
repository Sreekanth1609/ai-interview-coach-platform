package com.interviewcoach.interview_service.dto;


import java.util.List;

public record GroqRequest(
        String model,
        List<Message> messages
) {
}
