package com.breeze_flow.breeze_flow.repository;

import com.breeze_flow.breeze_flow.model.TestModel;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TestRepository extends MongoRepository<TestModel, String> {
} 