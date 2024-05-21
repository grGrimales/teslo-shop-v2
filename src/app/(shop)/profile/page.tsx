import { redirect } from "next/navigation";
import { auth } from "../../../../auth.config";
import { Title } from "@/app/components";
import Link from "next/link";
import { IoTicketOutline } from "react-icons/io5";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }

  const placeholderImage = "https://via.placeholder.com/150"; // URL de una imagen de perfil genérica

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center pt-10">
      <Title title="Profile Page" />

      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
        <img
          src={session.user.image || placeholderImage}
          alt="Profile"
          className="h-40 w-40 rounded-full mx-auto mb-4"
        />
        <h2 className="text-2xl font-semibold text-center mb-4">
          {session.user.name}
        </h2>
        <p className="text-gray-700 text-center mb-1">{session.user.email}</p>
        <p className="text-gray-600 text-center mb-4">{session.user.role}</p>

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
          <Link
            href="/orders"
            className="flex items-center "
          >
            <IoTicketOutline size={30} />
            <span className="ml-3 text-xl"> Ver mis órdenes</span>
          </Link>
        </button>
      </div>
    </div>
  );
}
