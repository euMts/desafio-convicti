import type { Profile } from "@/types/Profile";

export const checkIfUserIsAdmin = (userProfile: Profile): boolean => {
  const requiredPermissions = new Set([1, 2, 3, 4, 5]);
  const userPermissions = new Set(userProfile.permissions.map((p) => p.id));

  return [...requiredPermissions].every((id) => userPermissions.has(id));
};
