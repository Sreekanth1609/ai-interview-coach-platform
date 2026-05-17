package com.interviewcoach.interview_service.repository;


import com.interviewcoach.interview_service.entity.InterviewSession;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface InterviewSessionRepository extends MongoRepository<InterviewSession, String> {

        List<InterviewSession> findByUserEmailOrderByCreatedAtDesc(String userEmail);

}