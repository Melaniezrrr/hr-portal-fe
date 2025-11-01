type UserRole = 'employee' | 'admin';

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isActive: boolean;
    role: UserRole;
};