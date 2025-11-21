import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    country?: string;
    phoneNumber?: string;
    businessName?: string;
    role?: UserRole;
}
