import type {
  StaffLoginRecord,
  StaffUser,
  UserRole,
  WaitlistEntry,
} from "@/database/types";

export interface UserRepository {
  findRoleByUsername(username: string): UserRole | undefined;
  findStaffByUsername(username: string): StaffLoginRecord | undefined;
  findStaffById(id: number): StaffUser | undefined;
  createStaff(staff: {
    name: string;
    username: string;
    passwordHash: string;
  }): void;
}

export interface WaitlistRepository {
  registerEntry(name: string, partySize: number): number;
  findEntry(ticket: number): WaitlistEntry | undefined;
  countPartiesAhead(ticket: number): number | null;
  listEntries(): WaitlistEntry[];
}

export type RepositoryBundle = {
  users: UserRepository;
  waitlist: WaitlistRepository;
};
