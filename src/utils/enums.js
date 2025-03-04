// Gender Enum
const GENDER = {
  MALE: "Male",
  FEMALE: "Female",
  OTHER: "Other",
  PREFER_NOT_TO_SAY: "Prefer Not to Say",
};

// Blood Group Enum
const BLOOD_GROUP = {
  A_POSITIVE: "A+",
  A_NEGATIVE: "A-",
  B_POSITIVE: "B+",
  B_NEGATIVE: "B-",
  AB_POSITIVE: "AB+",
  AB_NEGATIVE: "AB-",
  O_POSITIVE: "O+",
  O_NEGATIVE: "O-",
};

// Appointment Status Enum (from your previous appointment model)
const APPOINTMENT_STATUS = {
  CONFIRMED: "Confirmed",
  PENDING: "Pending",
  RESCHEDULED: "Rescheduled",
  CANCELLED: "Cancelled",
  COMPLETED: "Completed",
};

// Privacy Settings Enum
const PRIVACY_SETTINGS = {
  DATA_SHARING: "dataSharing",
  MARKETING_COMMUNICATION: "marketingCommunication",
};

// Consent Version Enum (for tracking consent versions)
const CONSENT_VERSION = {
  CURRENT: "1.0",
};

module.exports = {
  GENDER,
  BLOOD_GROUP,
  APPOINTMENT_STATUS,
  PRIVACY_SETTINGS,
  CONSENT_VERSION,
};
