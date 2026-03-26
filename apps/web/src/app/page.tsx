import { Button } from "@piart/ui";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-4xl font-bold tracking-tight text-violet-700">
        PiArt Exchange
      </h1>
      <p className="max-w-md text-center text-lg text-gray-600">
        The marketplace for physical fine art, powered by Pi Network.
      </p>
      <Button variant="primary" size="lg">
        Explore Art
      </Button>
    </main>
  );
}
