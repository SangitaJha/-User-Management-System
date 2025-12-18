package com.example.usermanagement.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import java.time.LocalDateTime;
import java.util.List;

public class UserMasterDTO {
    
    private Long userId;
    
    @NotBlank(message = "Username is required")
    private String userName;
    
    @NotBlank(message = "Password is required")
    private String userPassword;
    
    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^[0-9]{10}$", message = "Phone number must be 10 digits")
    private String userPhoneNumber;
    
    private LocalDateTime dateOfRegistration;
    
    @NotBlank(message = "Status is required")
    private String status;
    
    private List<AddressDTO> addresses;
    
    // Constructors
    public UserMasterDTO() {}
    
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
    
    public List<AddressDTO> getAddresses() {
        return addresses;
    }
    
    public void setAddresses(List<AddressDTO> addresses) {
        this.addresses = addresses;
    }
}
