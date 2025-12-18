package com.example.usermanagement.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "user_master")
public class UserMaster {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;
    
    @NotBlank(message = "Username is required")
    @Column(name = "user_name", nullable = false, unique = true, length = 100)
    private String userName;
    
    @NotBlank(message = "Password is required")
    @Column(name = "user_password", nullable = false)
    private String userPassword;
    
    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^[0-9]{10}$", message = "Phone number must be 10 digits")
    @Column(name = "user_phone_number", nullable = false, length = 15)
    private String userPhoneNumber;
    
    @Column(name = "date_of_registration", nullable = false, updatable = false)
    private LocalDateTime dateOfRegistration;
    
    @Column(name = "status", nullable = false, length = 20)
    private String status; // ACTIVE, INACTIVE, SUSPENDED
    
    @OneToMany(mappedBy = "userMaster", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<UserAddresses> addresses;
    
    @PrePersist
    protected void onCreate() {
        dateOfRegistration = LocalDateTime.now();
        if (status == null) {
            status = "ACTIVE";
        }
    }
    
    // Constructors
    public UserMaster() {}
    
    public UserMaster(String userName, String userPassword, String userPhoneNumber, String status) {
        this.userName = userName;
        this.userPassword = userPassword;
        this.userPhoneNumber = userPhoneNumber;
        this.status = status;
    }
    
    // Getters and Setters
    public Long getUserId() {
        return userId;
    }
    
    public void setUserId(Long userId) {
        this.userId = userId;
    }
    
    public String getUserName() {
        return userName;
    }
    
    public void setUserName(String userName) {
        this.userName = userName;
    }
    
    public String getUserPassword() {
        return userPassword;
    }
    
    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }
    
    public String getUserPhoneNumber() {
        return userPhoneNumber;
    }
    
    public void setUserPhoneNumber(String userPhoneNumber) {
        this.userPhoneNumber = userPhoneNumber;
    }
    
    public LocalDateTime getDateOfRegistration() {
        return dateOfRegistration;
    }
    
    public void setDateOfRegistration(LocalDateTime dateOfRegistration) {
        this.dateOfRegistration = dateOfRegistration;
    }
    
    public String getStatus() {
        return status;
    }
    
    public void setStatus(String status) {
        this.status = status;
    }
    
    public List<UserAddresses> getAddresses() {
        return addresses;
    }
    
    public void setAddresses(List<UserAddresses> addresses) {
        this.addresses = addresses;
    }
}
