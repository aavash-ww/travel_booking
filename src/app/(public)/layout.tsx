import Navbar from "@/components/layout/Navbar"

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Navbar />
            <main className="w-full max-w-[80%] mx-auto px-4">
                {children}
            </main>
        </>

    )
}