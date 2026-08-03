import { redirect } from "next/navigation";

export default function HomePage() {
  // Automatically redirects visitors hitting the main URL to /login
  redirect("/login");
}
