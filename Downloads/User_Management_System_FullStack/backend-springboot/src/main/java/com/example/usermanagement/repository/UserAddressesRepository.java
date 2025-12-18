package com.example.usermanagement.repository;

import com.example.usermanagement.entity.UserAddresses;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface UserAddressesRepository extends JpaRepository<UserAddresses, Long> {
    List<UserAddresses> findByUserMaster_UserId(Long userId);
    void deleteByUserMaster_UserId(Long userId);
}
