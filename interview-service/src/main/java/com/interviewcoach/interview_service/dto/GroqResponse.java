package com.interviewcoach.interview_service.dto;

import java.util.List;

public record GroqResponse(
        List<Choice> choices
) {
}
