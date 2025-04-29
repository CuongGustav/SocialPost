"use client";

import Image from 'next/image';
import { UserSimpleResponse } from "../../types/user";
import { useRouter } from "next/navigation";


interface ListUserProps {
    users: UserSimpleResponse[];
}

const ListUser = ({ users }: ListUserProps) => {

    const router = useRouter();

    const getAvatarUrl = (path: string | null): string => {
        if (!path) return "/avatar_user.png";
        if (path.startsWith("http")) return path;
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
        return `${API_BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
    };

    if (users.length === 0) {
        return <div className="text-center">Không tìm thấy người dùng nào</div>;
    }

    return (
        <div className="flex flex-col gap-2">
            {users.map((user) => (
                <div
                    key={user.id}
                    className="flex flex-row items-center gap-2 border-b p-2 border-gray-300"
                >
                    <div className="logo border border-gray-300 rounded-full h-[50px] w-[50px] ">
                        <Image
                            src={getAvatarUrl(user.avatar_url)}
                            alt="Ảnh đại diện"
                            width={50}
                            height={50}
                            className="rounded-full"
                        />
                    </div>
                    <div>
                        <button
                                className="font-bold max-w-[128px] overflow-hidden hover:underline text-left cursor-pointer"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    console.log("Navigating to profile with user_id:", user.id);
                                    router.push(`/profile/${user.id}`);
                                }}
                            >
                                {user.username}
                        </button>
                        <div className="font-base overflow-hidden text-gray-400">
                            {user.fullname || ""}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ListUser;