package com.example.usermanagement.service;

import com.example.usermanagement.dto.UserMasterDTO;
import com.example.usermanagement.dto.AddressDTO;
import com.example.usermanagement.entity.UserMaster;
import com.example.usermanagement.entity.UserAddresses;
import com.example.usermanagement.repository.UserMasterRepository;
import com.example.usermanagement.repository.UserAddressesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {
    
    @Autowired
    private UserMasterRepository userMasterRepository;
    
    @Autowired
    private UserAddressesRepository userAddressesRepository;
    
    // Create User
    @Transactional
    public UserMasterDTO createUser(UserMasterDTO userDTO) {
        if (userMasterRepository.existsByUserName(userDTO.getUserName())) {
            throw new RuntimeException("Username already exists");
        }
        
        UserMaster user = convertToEntity(userDTO);
        UserMaster savedUser = userMasterRepository.save(user);
        
        // Save addresses if provided
        if (userDTO.getAddresses() != null && !userDTO.getAddresses().isEmpty()) {
            for (AddressDTO addressDTO : userDTO.getAddresses()) {
                UserAddresses address = new UserAddresses();
                address.setUserMaster(savedUser);
                address.setFullAddress(addressDTO.getFullAddress());
                address.setAddressType(addressDTO.getAddressType());
                userAddressesRepository.save(address);
            }
        }
        
        return convertToDTO(savedUser);
    }
    
    // Get All Users
    public List<UserMasterDTO> getAllUsers() {
        return userMasterRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    // Get User by ID
    public UserMasterDTO getUserById(Long id) {
        UserMaster user = userMasterRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        return convertToDTO(user);
    }
    
    // Update User
    @Transactional
    public UserMasterDTO updateUser(Long id, UserMasterDTO userDTO) {
        UserMaster existingUser = userMasterRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        
        // Check if username is being changed and if it already exists
        if (!existingUser.getUserName().equals(userDTO.getUserName()) &&
            userMasterRepository.existsByUserName(userDTO.getUserName())) {
            throw new RuntimeException("Username already exists");
        }
        
        existingUser.setUserName(userDTO.getUserName());
        existingUser.setUserPassword(userDTO.getUserPassword());
        existingUser.setUserPhoneNumber(userDTO.getUserPhoneNumber());
        existingUser.setStatus(userDTO.getStatus());
        
        UserMaster updatedUser = userMasterRepository.save(existingUser);
        return convertToDTO(updatedUser);
    }
    
    // Delete User
    @Transactional
    public void deleteUser(Long id) {
        if (!userMasterRepository.existsById(id)) {
            throw new RuntimeException("User not found with id: " + id);
        }
        userMasterRepository.deleteById(id);
    }
    
    // Get Users by Status
    public List<UserMasterDTO> getUsersByStatus(String status) {
        return userMasterRepository.findByStatus(status).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    // Helper method to convert Entity to DTO
    private UserMasterDTO convertToDTO(UserMaster user) {
        UserMasterDTO dto = new UserMasterDTO();
        dto.setUserId(user.getUserId());
        dto.setUserName(user.getUserName());
        dto.setUserPassword("******"); // Don't expose password
        dto.setUserPhoneNumber(user.getUserPhoneNumber());
        dto.setDateOfRegistration(user.getDateOfRegistration());
        dto.setStatus(user.getStatus());
        
        // Get addresses
        List<UserAddresses> addresses = userAddressesRepository.findByUserMaster_UserId(user.getUserId());
        List<AddressDTO> addressDTOs = addresses.stream()
                .map(this::convertAddressToDTO)
                .collect(Collectors.toList());
        dto.setAddresses(addressDTOs);
        
        return dto;
    }
    
    // Helper method to convert DTO to Entity
    private UserMaster convertToEntity(UserMasterDTO dto) {
        UserMaster user = new UserMaster();
        user.setUserName(dto.getUserName());
        user.setUserPassword(dto.getUserPassword()); // In production, hash this password
        user.setUserPhoneNumber(dto.getUserPhoneNumber());
        user.setStatus(dto.getStatus() != null ? dto.getStatus() : "ACTIVE");
        return user;
    }
    
    private AddressDTO convertAddressToDTO(UserAddresses address) {
        AddressDTO dto = new AddressDTO();
        dto.setAddressId(address.getAddressId());
        dto.setUserId(address.getUserId());
        dto.setFullAddress(address.getFullAddress());
        dto.setAddressType(address.getAddressType());
        return dto;
    }
}
