
export enum UserRole {
  ADMIN = 'Admin',
  EDITOR = 'Editor',
  VIEWER = 'Viewer',
  MODERATOR = 'Moderator'
}

export enum UserStatus {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
  SUSPENDED = 'Suspended'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  lastActive: string;
  joinedAt: string;
  avatar: string;
}

export interface UserAction {
  id: string;
  userId: string;
  userName: string;
  action: string;
  category: 'Security' | 'Update' | 'Access' | 'Content';
  timestamp: string;
  details: string;
}

export interface DashboardStats {
  totalUsers: number;
  activeNow: number;
  newThisWeek: number;
  avgEngagement: number;
}
