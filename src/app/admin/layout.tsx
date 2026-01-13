import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Check authentication
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    // Redirect to login if not authenticated
    if (!session) {
        redirect("/login");
    }

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <Sidebar />
            <main className="flex-1 lg:ml-0">
                <div className="p-6 lg:p-8">{children}</div>
            </main>
        </div>
    );
}
