export enum UserRole {
    ADMIN = 'ADMIN',
    USER = 'USER',
    GUEST = 'GUEST',
}

export interface User {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    country?: string;
    phoneNumber?: string;
    businessName?: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
}
