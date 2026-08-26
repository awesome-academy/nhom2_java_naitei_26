package com.sunbooking.domain.user.entity;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class UserStatusConverter implements AttributeConverter<UserStatus, String> {

    @Override
    public String convertToDatabaseColumn(UserStatus status) {
        if (status == null) {
            return UserStatus.ACTIVE.name();
        }
        return status.name();
    }

    @Override
    public UserStatus convertToEntityAttribute(String dbData) {
        if (dbData == null || dbData.trim().isEmpty()) {
            return UserStatus.ACTIVE;
        }
        String clean = dbData.trim().toUpperCase();
        if (clean.equals("INACTIVE") || clean.equals("DELETED")) {
            return UserStatus.INACTIVE;
        }
        if (clean.equals("LOCKED") || clean.equals("BANNED")) {
            return UserStatus.LOCKED;
        }
        return UserStatus.ACTIVE;
    }
}
