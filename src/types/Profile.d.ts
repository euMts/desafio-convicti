export interface Permission {
  id: number; // 1: Downloads, 2: Avaliações, 3: Erros, 4: Feedbacks, 5: Novas funcionalidades
  name: string;
  created_at: string;
  updated_at: string;
  pivot: {
    profile_id: number;
    permission_id: number;
  };
}

export interface Profile {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  total_users: number;
  permissions: Permission[];
}

export interface FormatedProfiles {
  id: number;
  name: string;
  total_users: number;
  permissions: { id: number; name: string }[];
}

export interface NewProfileData {
  name: string;
  permissions: number[];
}

export interface SimpleProfileData {
  id: number;
  name: string;
}
