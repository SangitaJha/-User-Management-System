package com.example.usermanagement.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "user_addresses")
public class UserAddresses {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "address_id")
    private Long addressId;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private UserMaster userMaster;
    
    @NotBlank(message = "Address is required")
    @Column(name = "full_address", nullable = false, columnDefinition = "TEXT")
    private String fullAddress;
    
    @Column(name = "address_type", length = 50)
    private String addressType; // HOME, OFFICE, OTHER
    
    // Constructors
    public UserAddresses() {}
    
    public UserAddresses(UserMaster userMaster, String fullAddress, String addressType) {
        this.userMaster = userMaster;
        this.fullAddress = fullAddress;
        this.addressType = addressType;
    }
    
    // Getters and Setters
    public Long getAddressId() {
        return addressId;
    }
    
    public void setAddressId(Long addressId) {
        this.addressId = addressId;
    }
    
    public UserMaster getUserMaster() {
        return userMaster;
    }
    
    public void setUserMaster(UserMaster userMaster) {
        this.userMaster = userMaster;
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
    
    @Transient
    public Long getUserId() {
        return userMaster != null ? userMaster.getUserId() : null;
    }
}
