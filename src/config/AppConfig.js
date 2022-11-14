// Application global configuration variables
export const APP_NAME = "TELE ICU";
export const SESSION_KEY = "user";
export const NOTIFICATION_TOKEN = "notify";
export const AUTH_KEY = "authkey";
export const AUTH_ACCESS = "authaccess";

// Data list action handler
export const MODULE_ACTION = {
  ADD: "CREATE",
  EDIT: "UPDATE",
  DELETE: "DELETE",
  VIEW: "VIEW",
  MULTI_DELETE: "MULTI_DELETE",
};

// Status text enum
export const STATUS_VALUE = {
  INACTIVE: 0,
  ACTIVE: 1,
  DELETED: 2,
  OPEN: 5,
  READ: 6,
  CLOSED: 7,
  NO_ACTION_REQUIRED: 8,
};
export const STATUS_TEXT = {
  INACTIVE: "Inactive",
  ACTIVE: "Active",
  DELETED: "Deleted",
  OPEN: "Open",
  READ: "Read",
  CLOSED: "Closed",
  NO_ACTION_REQUIRED: "No Action Required",
};
export const getStatusText = (val) => {
  switch (val) {
    case STATUS_VALUE.INACTIVE:
      return STATUS_TEXT.INACTIVE;
    case STATUS_VALUE.ACTIVE:
      return STATUS_TEXT.ACTIVE;
    case STATUS_VALUE.DELETED:
      return STATUS_TEXT.DELETED;
    case STATUS_VALUE.OPEN:
      return STATUS_TEXT.OPEN;
    case STATUS_VALUE.READ:
      return STATUS_TEXT.READ;
    case STATUS_VALUE.CLOSED:
      return STATUS_TEXT.CLOSED;
    case STATUS_VALUE.NO_ACTION_REQUIRED:
      return STATUS_TEXT.NO_ACTION_REQUIRED;
    default:
      return "NA";
  }
};

export const DATE_TIME_FORMAT = {
  DDMMYYYY: "DD/MM/YYYY",
  DDMMYYYYHHmm : "DD/MM/YYYY HH:mm",
  DATEPICKERDATE: "dd/MM/yyyy",
  DATEPICKERDATETIME: "dd/MM/yyyy hh:mm a",
  DDMMYYYYhhmma : "DD/MM/YYYY hh:mm a"
};

export const COMMON_MESSAGES = {
  SOMETHING_WRONG: "Something went wrong, please reload again!",
  DELETE_SUCCESS: "Row deleted successfully!",
};
