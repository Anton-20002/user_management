
import { User, UserRole, UserStatus, UserAction } from './types';

export const INITIAL_USERS: User[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    email: 'sarah.chen@example.com',
    role: UserRole.ADMIN,
    status: UserStatus.ACTIVE,
    lastActive: '2 mins ago',
    joinedAt: '2023-10-12',
    avatar: 'https://picsum.photos/seed/sarah/200'
  },
  {
    id: '2',
    name: 'Marcus Rodriguez',
    email: 'marcus.r@example.com',
    role: UserRole.EDITOR,
    status: UserStatus.ACTIVE,
    lastActive: '1 hour ago',
    joinedAt: '2023-11-05',
    avatar: 'https://picsum.photos/seed/marcus/200'
  },
  {
    id: '3',
    name: 'Elena Gilbert',
    email: 'elena.g@example.com',
    role: UserRole.VIEWER,
    status: UserStatus.INACTIVE,
    lastActive: '3 days ago',
    joinedAt: '2024-01-20',
    avatar: 'https://picsum.photos/seed/elena/200'
  },
  {
    id: '4',
    name: 'James Wilson',
    email: 'j.wilson@example.com',
    role: UserRole.MODERATOR,
    status: UserStatus.ACTIVE,
    lastActive: 'Just now',
    joinedAt: '2023-08-15',
    avatar: 'https://picsum.photos/seed/james/200'
  },
  {
    id: '5',
    name: 'Aisha Patel',
    email: 'aisha.p@example.com',
    role: UserRole.ADMIN,
    status: UserStatus.SUSPENDED,
    lastActive: '2 weeks ago',
    joinedAt: '2023-05-30',
    avatar: 'https://picsum.photos/seed/aisha/200'
  }
];

export const INITIAL_ACTIONS: UserAction[] = [
  {
    id: 'a1',
    userId: '1',
    userName: 'Sarah Chen',
    action: 'Password Changed',
    category: 'Security',
    timestamp: '2024-05-20T10:30:00Z',
    details: 'Security update initiated by system'
  },
  {
    id: 'a2',
    userId: '2',
    userName: 'Marcus Rodriguez',
    action: 'Profile Updated',
    category: 'Update',
    timestamp: '2024-05-20T11:15:00Z',
    details: 'Changed profile picture and bio'
  },
  {
    id: 'a3',
    userId: '4',
    userName: 'James Wilson',
    action: 'New Login',
    category: 'Access',
    timestamp: '2024-05-20T12:00:00Z',
    details: 'Logged in from IP 192.168.1.45'
  },
  {
    id: 'a4',
    userId: '1',
    userName: 'Sarah Chen',
    action: 'Exported User List',
    category: 'Content',
    timestamp: '2024-05-20T14:45:00Z',
    details: 'Exported full JSON dump of user records'
  }
];
