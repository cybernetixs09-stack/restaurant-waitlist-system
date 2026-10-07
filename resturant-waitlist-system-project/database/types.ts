export type StaffUser = {
  id: number;
  name: string;
  username: string;
  role: "staff";
};

export type StaffLoginRecord = StaffUser & { passwordHash: string };

export type UserRole = "staff" | "customer";

export type WaitlistEntry = {
  ticket: number;
  name: string;
  partySize: number;
  createdAt: string;
};
