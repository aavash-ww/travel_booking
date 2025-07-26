export default function AdminInitializer({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen">
            <main className="overflow-y-auto">
                {children}
            </main>
        </div>
    )
}