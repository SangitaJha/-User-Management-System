package com.example.usermanagement.service;

import com.example.usermanagement.dto.AddressDTO;
import com.example.usermanagement.entity.UserAddresses;
import com.example.usermanagement.entity.UserMaster;
import com.example.usermanagement.repository.UserAddressesRepository;
import com.example.usermanagement.repository.UserMasterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AddressService {
    
    @Autowired
    private UserAddressesRepository addressRepository;
    
    @Autowired
    private UserMasterRepository userMasterRepository;
    
    // Create Address
    @Transactional
    public AddressDTO createAddress(AddressDTO addressDTO) {
        UserMaster user = userMasterRepository.findById(addressDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with id: " + addressDTO.getUserId()));
        
        UserAddresses address = new UserAddresses();
        address.setUserMaster(user);
        address.setFullAddress(addressDTO.getFullAddress());
        address.setAddressType(addressDTO.getAddressType());
        
        UserAddresses savedAddress = addressRepository.save(address);
        return convertToDTO(savedAddress);
    }
    
    // Get All Addresses
    public List<AddressDTO> getAllAddresses() {
        return addressRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    // Get Address by ID
    public AddressDTO getAddressById(Long id) {
        UserAddresses address = addressRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Address not found with id: " + id));
        return convertToDTO(address);
    }
    
    // Get Addresses by User ID
    public List<AddressDTO> getAddressesByUserId(Long userId) {
        return addressRepository.findByUserMaster_UserId(userId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    // Update Address
    @Transactional
    public AddressDTO updateAddress(Long id, AddressDTO addressDTO) {
        UserAddresses existingAddress = addressRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Address not found with id: " + id));
        
        existingAddress.setFullAddress(addressDTO.getFullAddress());
        existingAddress.setAddressType(addressDTO.getAddressType());
        
        UserAddresses updatedAddress = addressRepository.save(existingAddress);
        return convertToDTO(updatedAddress);
    }
    
    // Delete Address
    @Transactional
    public void deleteAddress(Long id) {
        if (!addressRepository.existsById(id)) {
            throw new RuntimeException("Address not found with id: " + id);
        }
        addressRepository.deleteById(id);
    }
    
    // Helper method to convert Entity to DTO
    private AddressDTO convertToDTO(UserAddresses address) {
        AddressDTO dto = new AddressDTO();
        dto.setAddressId(address.getAddressId());
        dto.setUserId(address.getUserId());
        dto.setFullAddress(address.getFullAddress());
        dto.setAddressType(address.getAddressType());
        return dto;
    }
}
