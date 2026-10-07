"use client";

import { useActionState } from "react";
import Button from "../../component/button";
import {
  registerGuest,
  type RegisterGuestState,
} from "./actions/register-guest/action";

const initialState: RegisterGuestState = { message: "", success: false };

export default function WaitlistRegisterPage() {
  const [state, formAction, isPending] = useActionState(
    registerGuest,
    initialState,
  );

  return (
    <div className="min-h-screen bg-[#f7f5f0] text-stone-900">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 sm:px-10">
        <a
          className="flex items-center gap-3"
          href="/waitlist-register"
          aria-label="Juniper dining room home"
        >
          <span className="grid size-10 place-items-center rounded-full bg-emerald-950 text-sm font-semibold text-white">
            J
          </span>
          <span>
            <span className="block text-sm font-semibold tracking-wide">
              JUNIPER
            </span>
            <span className="block text-[10px] tracking-[0.2em] text-stone-500 uppercase">
              Dining room
            </span>
          </span>
        </a>
        <span className="hidden items-center gap-2 text-sm text-stone-500 sm:flex">
          <span className="size-2 rounded-full bg-emerald-700" />
          Taking walk-ins
        </span>
      </header>

      <section className="mx-auto grid w-full max-w-6xl gap-12 px-6 pt-10 pb-16 sm:px-10 sm:pt-16 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-20 lg:pt-20">
        <div className="max-w-xl">
          <p className="mb-5 text-xs font-semibold tracking-[0.22em] text-emerald-800 uppercase">
            A seat is worth the wait
          </p>
          <h1 className="font-serif text-5xl leading-[1.08] tracking-tight text-stone-900 sm:text-6xl">
            Good things
            <br />
            are <span className="text-emerald-800 italic">gathering.</span>
          </h1>
          <p className="mt-6 max-w-md text-base leading-7 text-stone-600 sm:text-lg">
            Add your party to the waitlist and we&apos;ll get your table ready
            as soon as we can.
          </p>
          <div className="mt-10 flex items-center gap-4 border-t border-stone-200 pt-6 text-sm text-stone-600">
            <span className="grid size-10 place-items-center rounded-full bg-[#e9e8de] text-emerald-900">
              <svg
                aria-hidden="true"
                className="size-5"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 7v5l3 2m6-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.6"
                />
              </svg>
            </span>
            <span>
              <span className="block font-medium text-stone-800">
                A little time, a lovely meal
              </span>
              <span className="mt-1 block text-stone-500">
                We&apos;ll be with you as soon as a table opens up.
              </span>
            </span>
          </div>
        </div>

        <div className="w-full max-w-lg justify-self-center lg:justify-self-end">
          <div className="rounded-3xl border border-stone-200/80 bg-white p-6 shadow-[0_24px_80px_-40px_rgba(35,45,29,0.28)] sm:p-9">
            <div className="mb-8">
              <p className="text-xs font-semibold tracking-[0.18em] text-emerald-800 uppercase">
                Join the waitlist
              </p>
              <h2 className="mt-3 font-serif text-3xl tracking-tight text-stone-900">
                Let&apos;s get you a table.
              </h2>
              <p className="mt-2 text-sm leading-6 text-stone-500">
                Just a couple of details to get started.
              </p>
            </div>

            <form action={formAction} className="space-y-5">
              <div>
                <label
                  className="mb-2 block text-sm font-medium text-stone-800"
                  htmlFor="name"
                >
                  Your name
                </label>
                <input
                  autoComplete="name"
                  className="min-h-12 w-full rounded-xl border border-stone-300 bg-white px-4 text-base text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-emerald-800 focus:ring-4 focus:ring-emerald-900/10"
                  id="name"
                  maxLength={80}
                  name="name"
                  placeholder="e.g. Alex Morgan"
                  required
                />
              </div>

              <div>
                <label
                  className="mb-2 block text-sm font-medium text-stone-800"
                  htmlFor="partySize"
                >
                  Party size
                </label>
                <select
                  className="min-h-12 w-full appearance-none rounded-xl border border-stone-300 bg-white px-4 text-base text-stone-900 outline-none transition focus:border-emerald-800 focus:ring-4 focus:ring-emerald-900/10"
                  defaultValue=""
                  id="partySize"
                  name="partySize"
                  required
                >
                  <option disabled value="">
                    How many guests?
                  </option>
                  {Array.from({ length: 20 }, (_, index) => index + 1).map(
                    (size) => (
                      <option key={size} value={size}>
                        {size} {size === 1 ? "guest" : "guests"}
                      </option>
                    ),
                  )}
                </select>
              </div>

              {state.message && (
                <p
                  aria-live="polite"
                  className={`rounded-xl px-4 py-3 text-sm ${
                    state.success
                      ? "bg-emerald-50 text-emerald-900"
                      : "bg-red-50 text-red-800"
                  }`}
                  role={state.success ? "status" : "alert"}
                >
                  {state.message}
                </p>
              )}

              <Button className="w-full" disabled={isPending} type="submit">
                {isPending ? "Adding your party..." : "Join the waitlist"}
                {!isPending && (
                  <svg
                    aria-hidden="true"
                    className="ml-2 size-4"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M4 10h12m-5-5 5 5-5 5"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.6"
                    />
                  </svg>
                )}
              </Button>
            </form>

            <p className="mt-6 text-center text-xs leading-5 text-stone-500">
              Your evening starts here. We can&apos;t wait to welcome you.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}