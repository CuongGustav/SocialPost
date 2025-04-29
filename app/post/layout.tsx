// app/post/layout.tsx
import Sidebar from "@/components/SideBar";

export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <div className="fixed w-[70px] top-0 left-0 h-screen z-10">
        <Sidebar />
      </div>
      <div className="flex-1 p-4 pt-0 bg-white ml-[70px]">{children}</div>
    </div>
  );
}
