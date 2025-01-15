package com.breeze_flow.breeze_flow.repository;

import com.breeze_flow.breeze_flow.model.Settings;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface SettingsRepository extends MongoRepository<Settings, String> {
    Optional<Settings> findFirstByOrderByIdAsc();
} 