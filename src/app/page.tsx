import type { Metadata } from "next";

import Dashboard from "pages/Dashboard";

export const metadata: Metadata = {
  title: "Gojl - Home",
};

export default function Home() {
  return (
    <main>
      <Dashboard />
    </main>
  );
}
