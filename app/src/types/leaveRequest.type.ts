export type LeaveRequestStatus = 'pending' | 'approved' | 'rejected';

export interface LeaveRequest {
    id: number;
    userId: number;
    startDate: string;
    endDate: string;   
    reason: string;
    status: LeaveRequestStatus;
}