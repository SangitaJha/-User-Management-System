package com.example.usermanagement.repository;

import com.example.usermanagement.entity.UserMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface UserMasterRepository extends JpaRepository<UserMaster, Long> {
    Optional<UserMaster> findByUserName(String userName);
    List<UserMaster> findByStatus(String status);
    boolean existsByUserName(String userName);
}
