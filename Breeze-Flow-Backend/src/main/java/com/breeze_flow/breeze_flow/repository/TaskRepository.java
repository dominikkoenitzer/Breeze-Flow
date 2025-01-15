package com.breeze_flow.breeze_flow.repository;

import com.breeze_flow.breeze_flow.model.Task;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TaskRepository extends MongoRepository<Task, String> {
    // Add custom queries if needed
} 