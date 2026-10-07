"use server";

export type RegisterGuestState = {
  message: string;
  success: boolean;
};

export async function registerGuest(
  _previousState: RegisterGuestState,
  formData: FormData,
): Promise<RegisterGuestState> {
  const name = String(formData.get("name") ?? "").trim();
  const partySize = Number(formData.get("partySize"));

  if (!name) {
    return { message: "Please enter your name.", success: false };
  }

  if (name.length > 80) {
    return {
      message: "Your name must be 80 characters or fewer.",
      success: false,
    };
  }

  if (!Number.isInteger(partySize) || partySize < 1 || partySize > 20) {
    return {
      message: "Choose a party size between 1 and 20.",
      success: false,
    };
  }

  return {
    message: `Thanks, ${name}. We’ve received your party details for ${partySize}.`,
    success: true,
  };
}
