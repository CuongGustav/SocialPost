"use client";

import Image from "next/image";
import { useRouter } from "next/navigation"; 
import styles from "../../styles/post.module.css";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa6";
import { RiShareForwardLine } from "react-icons/ri";
import { PostWithUserResponse } from "../../types/post";
import ModalLogin from "../../components/auth/Login";
import { useState } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface ListPostProps {
    posts: PostWithUserResponse[];
}

const ListPost = ({ posts }: ListPostProps) => {
    const router = useRouter(); 
    const isLoggedIn = false;
    const [showLoginModal, setShowLoginModal] = useState(false);

    const handleClickWhenNotLogin = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!isLoggedIn) {
            setShowLoginModal(true);
        }
    };

    const getStaticUrl = (path: string | null): string => {
        if (!path) return "/avatar_user.png";
        if (path.startsWith("http")) return path;
        return `${API_BASE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
    };

    const renderImages = (images: PostWithUserResponse["images"]) => {
        if (images.length === 0) return null;
        if (images.length === 1) {
        return (
            <Image
                src={getStaticUrl(images[0].image_url)}
                alt="Hình ảnh bài đăng"
                width={500}
                height={200}
                className={`cursor-pointer rounded-xl ${styles.objectContain}`}
            />
        );
        } else if (images.length === 2) {
            return (
                <div className="flex gap-2 w-full">
                    {images.map((image) => (
                        <div className="w-1/2" key={image.id}>
                            <Image
                                src={getStaticUrl(image.image_url)}
                                alt="Hình ảnh bài đăng"
                                width={500}
                                height={200}
                                className="cursor-pointer rounded-xl w-full h-auto object-cover"
                            />
                        </div>
                    ))}
                </div>
            );
        } else {
            return (
                <div className="overflow-x-auto scrollbar-hide">
                    <div className="flex flex-row gap-2 min-w-full">
                        {images.map((image) => (
                            <Image
                                key={image.id}
                                src={getStaticUrl(image.image_url)}
                                alt="Hình ảnh bài đăng"
                                width={500}
                                height={200}
                                className={`cursor-pointer rounded-xl ${styles.objectContain}`}
                            />
                        ))}
                    </div>
                </div>
            );
        }
    };

    if (posts.length === 0) {
        return <div className="text-center">Không tìm thấy bài đăng nào</div>;
    }

    return (
        <div className="flex flex-col">
            {posts.map((post) => (
                <div
                    key={post.id}
                    className="px-4 mt-2 flex flex-row border-b border-gray-300 cursor-pointer"
                    onClick={() => router.push(`/post/${post.id}`)} 
                >
                    <div className="min-w-[50px]">
                        <div className="logo border border-gray-300 rounded-full h-[50px]">
                            <Image
                                src={getStaticUrl(post.avatar_url)}
                                alt="Ảnh đại diện"
                                width={50}
                                height={50}
                                className="rounded-full"
                            />
                        </div>
                    </div>
                    <div className="ml-2 mt-2 w-full">
                        <div className="flex flex-row gap-2">
                            <button
                                className="font-bold max-w-[128px] overflow-hidden hover:underline text-left cursor-pointer"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    router.push(`/profile/${post.user_id}`);
                                }}
                            >
                                {post.username}
                            </button>
                            <div>
                                {new Date(post.created_at).toLocaleString("vi-VN", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit",
                                })}
                            </div>
                        </div>
                        <div className="whitespace-pre-line">{post.content}</div>
                        <div className="mt-2">{renderImages(post.images)}</div>
                        <div className="flex flex-row gap-12 my-2 text-2xl">
                            <div className="flex flex-row justify-center items-center gap-1">
                                <FaRegHeart
                                className="cursor-pointer"
                                onClick={handleClickWhenNotLogin}
                                />
                                <p className="text-base">{post.like_count}</p>
                            </div>
                            <div className="flex flex-row justify-center items-center gap-1">
                                <FaRegComment
                                    className="cursor-pointer"
                                    onClick={handleClickWhenNotLogin}
                                />
                                <p className="text-base">{post.comment_count}</p>
                            </div>
                            <div className="flex flex-row justify-center items-center gap-1">
                                <RiShareForwardLine
                                    className="cursor-pointer"
                                    onClick={handleClickWhenNotLogin}
                                />
                                <p className="text-base">{post.share_count}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            {showLoginModal && <ModalLogin onClose={() => setShowLoginModal(false)} />}
        </div>
    );
};

export default ListPost;