// app/post/layout.tsx
import Sidebar from "@/components/SideBar";

export default function MessageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 bg-white">{children}</main>
    </div>
  );
}
