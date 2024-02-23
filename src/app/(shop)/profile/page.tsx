import { redirect } from "next/navigation";
import { auth } from "../../../../auth.config";
import { Title } from "@/app/components";



export default  async function ProfilePage() {

    const session = await auth();
    if(!session?.user) {
        redirect('/');
    }
    return (
        <div>
            <Title title="Profile Page" />

            <pre>{JSON.stringify(session.user, null, 2)}</pre>
            Profile Page
        </div>
    )
}