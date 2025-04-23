// app/post/layout.tsx
import Sidebar from "../../components/admin.SideBar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <div className="fixed w-[70px] top-0 left-0 h-screen z-10">
        <Sidebar />
      </div>
      <div className="flex-1 p-4 bg-white ml-[70px]">{children}</div>
    </div>
  );
}
