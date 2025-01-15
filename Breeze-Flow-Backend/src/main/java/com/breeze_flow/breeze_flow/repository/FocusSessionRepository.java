package com.breeze_flow.breeze_flow.repository;

import com.breeze_flow.breeze_flow.model.FocusSession;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.time.LocalDateTime;
import java.util.List;

public interface FocusSessionRepository extends MongoRepository<FocusSession, String> {
    List<FocusSession> findByStartTimeBetween(LocalDateTime start, LocalDateTime end);
    List<FocusSession> findByStatus(String status);
} 