package com.example.usermanagement.dto;

import jakarta.validation.constraints.NotBlank;

public class AddressDTO {
    
    private Long addressId;
    
    private Long userId;
    
    @NotBlank(message = "Address is required")
    private String fullAddress;
    
    private String addressType;
    
    // Constructors
    public AddressDTO() {}
    
    // Getters and Setters
    public Long getAddressId() {
        return addressId;
    }
    
    public void setAddressId(Long addressId) {
        this.addressId = addressId;
    }
    
    public Long getUserId() {
        return userId;
    }
    
    public void setUserId(Long userId) {
        this.userId = userId;
    }
    
    public String getFullAddress() {
        return fullAddress;
    }
    
    public void setFullAddress(String fullAddress) {
        this.fullAddress = fullAddress;
    }
    
    public String getAddressType() {
        return addressType;
    }
    
    public void setAddressType(String addressType) {
        this.addressType = addressType;
    }
}
