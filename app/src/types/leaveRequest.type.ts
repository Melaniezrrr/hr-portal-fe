export type LeaveRequestStatus = 'pending' | 'approved' | 'rejected';

export interface LeaveRequest {
    id: number;
    userId: number;
    startDate: number; // unix timestamp
    endDate: number;   // unix timestamp
    reason: string;
    status: LeaveRequestStatus;
}