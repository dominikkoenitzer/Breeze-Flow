package com.breeze_flow.breeze_flow.repository;

import com.breeze_flow.breeze_flow.model.FocusSession;
import java.util.List;

public interface FocusSessionRepository {
    List<FocusSession> findAll();
    FocusSession findById(String id);
    void save(FocusSession session);
    void deleteById(String id);
}