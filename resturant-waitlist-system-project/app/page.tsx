import Button from "../component/button";

export default function Home() {
  return (
    <main className="grid min-h-screen place-items-center bg-stone-50 p-6 text-stone-900">
      <section className="w-full max-w-md rounded-2xl border border-stone-200 bg-white p-7 shadow-sm sm:p-10">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-emerald-800">
          Restaurant waitlist
        </p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          A simpler way to welcome every guest.
        </h1>
        <p className="mt-4 mb-6 leading-relaxed text-stone-600">
          Your waitlist starts here. Keep things simple while you get set up.
        </p>
        <Button>Get started</Button>
      </section>
    </main>
  );
}
