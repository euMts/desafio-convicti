import type { Permission } from "./Profile";

interface Profile {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  total_users: number;
  permissions: Permission[];
}

export interface UserData {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  active: boolean;
  created_at: string;
  updated_at: string;
  profile_id: number;
  profile: Profile;
}

export interface FormatedUser {
  name: string;
  email: string;
  profileName: string;
  active: bool;
}

export interface NewUserData {
  name: string;
  profile_id: number;
  email: string;
}
