package com.breeze_flow.breeze_flow.repository;

import com.breeze_flow.breeze_flow.model.Event;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.time.LocalDateTime;
import java.util.List;

public interface EventRepository extends MongoRepository<Event, String> {
    List<Event> findByDateBetween(LocalDateTime start, LocalDateTime end);
    List<Event> findByStatus(String status);
} 