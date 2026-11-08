import type { Metadata } from "next";
import { Terminal } from "@/components/Terminal";
export const metadata: Metadata = { title: "Terminal | Pablo Álvaro Hidalgo" };
export default function TerminalPage() {
  return <Terminal />;
}
