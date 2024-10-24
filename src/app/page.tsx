import type { Metadata } from "next";
import Dashboard from "screens/Dashboard";

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
