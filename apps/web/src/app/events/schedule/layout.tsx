import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Schedule Page",
  // other metadata
};

export default function ScheduleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
