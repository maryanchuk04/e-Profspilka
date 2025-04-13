export enum ErrorCodes {
    userNotFound = 'user_not_found',
    roleAlreadyAssignedToUser = 'role_already_assigned_for_user',

    unhandledError = 'unhandled_server_error',
}

export interface OperationResponse {
    success: boolean;
    errorCode: ErrorCodes;
}