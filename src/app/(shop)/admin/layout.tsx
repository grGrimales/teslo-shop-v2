import { redirect } from "next/navigation";
import { auth } from "../../../../auth.config";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session?.user.role !== "admin") {
   redirect('/auth/login');
  }
  return <>{children}</>;
}
