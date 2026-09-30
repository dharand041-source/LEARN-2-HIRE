import { redirect } from "next/navigation";

export default function SignupRedirectPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const next = typeof searchParams.next === "string" ? searchParams.next : "";
  const destination = next ? `/login?tab=signup&next=${encodeURIComponent(next)}` : "/login?tab=signup";
  redirect(destination);
}
