


// https://tailwindcomponents.com/component/hoverable-table
export const revalidate = 0;

import {   getPaginatedUsers } from "@/actions";
import {  Pagination, Title } from "@/app/components";
import { redirect } from "next/navigation";
import { UsersTable } from "./ui/UsersTable";

export default async function OrdersPage() {
  const response = await getPaginatedUsers();
  const { ok, users = [] } = response || {};

  if (!ok) redirect("/auth/login");

  return (
    <>
      <Title title="Mantenimiento de Usuarios" />

      <div className="mb-10">
       <UsersTable users={users} />
       <Pagination totalPages={1} />
      </div>
    </>
  );
}
