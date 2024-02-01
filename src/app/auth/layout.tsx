
export default function ShopLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="bg-cyan-100 min-h-screen">
        {children}
        </main>
    );
    }