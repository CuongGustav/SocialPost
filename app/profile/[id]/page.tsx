'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import ListPost from '../../profile/listPost';
import ListPostShare from '../../profile/listPostShare';
import ListViolation from '../../profile/listViolation';
import { UserWithFollowResponse } from '../../../types/user';
import axios from 'axios';
import { useParams, useRouter } from "next/navigation"; 
import ModalLogin from '../../../components/auth/Login';
import ModalSignUp from '../../../components/auth/SignUp';
import { IoArrowBackCircleOutline } from "react-icons/io5";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Get user by user ID
const getUserByUserId = async (userId: string): Promise<UserWithFollowResponse> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users/${userId}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 404) {
                throw new Error('Không tìm thấy người dùng');
            } else if (error.response?.status === 400) {
                throw new Error('ID người dùng không hợp lệ');
            }
            throw new Error('Không thể tải thông tin người dùng');
        }
        throw new Error('Lỗi không xác định khi tải thông tin người dùng');
    }
};

const ProfilePageDetail = () => {
    const { id } = useParams();
    const router = useRouter();
    const [user, setUser] = useState<UserWithFollowResponse | null>(null);
    const [activeTab, setActiveTab] = useState<'post' | 'postshare' | 'violation'>('post');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showModalSignUp, setShowModalSignUp] = useState(false);

    // Fetch user profile whenever id changes
    useEffect(() => {
        const fetchProfileUser = async () => {
            setLoading(true);
            setError(null); 
            setUser(null); 

            if (!id || typeof id !== 'string') {
                setError('ID người dùng không hợp lệ');
                setLoading(false);
                return;
            }

            try {
                const userData = await getUserByUserId(id);
                setUser(userData);
                setLoading(false);
            } catch (error) {
                console.error('Lỗi khi tải dữ liệu:', error);
                setError(error instanceof Error ? error.message : 'Không thể tải dữ liệu');
                setLoading(false);
            }
        };

        fetchProfileUser();
    }, [id]);

    // Generate a complete URL from a path or return a default avatar if path is missing
    const getStaticUrl = (path: string | null): string => {
        if (!path) return '/avatar_user.png';
        if (path.startsWith('http')) return path;
        return `${API_BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
    };

    // Handle click when not logged in
    const handleClickWhenNotLogin = () => {
        setShowLoginModal(true);
    };

    // Render loading state
    if (loading) {
        return <div className="text-center">Đang tải hồ sơ người dùng...</div>;
    }

    // Render error state
    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    // Render when user is not found (should not happen since error handles 404)
    if (!user) {
        return <div className="text-center text-red-500">Không tìm thấy người dùng</div>;
    }

    return (
        <div>
            {/* Nút Quay lại */}
            <div className="sticky top-0 left-0 right-0 bg-white py-2 z-10 w-full">
                <button
                    className="ml-60 flex items-center justify-center rounded-full cursor-pointer"
                    onClick={() => router.back()}
                >
                    <IoArrowBackCircleOutline className="w-6 h-6 text-lg text-gray-400 hover:text-black" />
                </button>
            </div>
            <div className="flex w-7/10 mx-auto gap-4 ">
                <div className="w-7/10 flex flex-col rounded-[25px] border border-gray-300 pb-8 justify-center mx-auto">
                    <div className="flex flex-col w-full p-8 pt-4">
                        <div className="flex flex-row justify-between w-full items-center">
                            <div className="flex flex-col gap-1">
                                <div className="font-bold text-2xl">{user.fullname}</div>
                                <div>{user.username}</div>
                            </div>
                            <div>
                                <Image
                                    src={getStaticUrl(user.avatar_url)}
                                    alt="Ảnh đại diện"
                                    width={84}
                                    height={84}
                                    className="rounded-full border border-gray-400"
                                />
                            </div>
                        </div>
                        <div className="pt-4">{user.bio}</div>
                        <div className="pt-4 text-gray-400">{user.follow_count} người theo dõi</div>
                        <div className="w-full flex flex-row gap-2 mt-8 h-[40px]">
                            <button
                                className="w-1/2 bg-black text-white border-none rounded-[12px] cursor-pointer"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleClickWhenNotLogin();
                                }}
                            >
                                Nhắn tin
                            </button>
                            <button
                                className="w-1/2 text-black border border-gray-300 rounded-[12px] cursor-pointer"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleClickWhenNotLogin();
                                }}
                            >
                                Theo dõi
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex flex-row border-b border-gray-300">
                            <button
                                className={`flex flex-1 items-center justify-center pb-4 cursor-pointer ${
                                    activeTab === 'post' ? 'border-b-2 border-black text-black' : 'text-gray-400'
                                }`}
                                onClick={() => setActiveTab('post')}
                            >
                                Bài viết
                            </button>
                            <button
                                className={`flex flex-1 items-center justify-center pb-4 cursor-pointer ${
                                    activeTab === 'postshare' ? 'border-b-2 border-black text-black' : 'text-gray-400'
                                }`}
                                onClick={() => setActiveTab('postshare')}
                            >
                                Bài viết đăng lại
                            </button>
                            <button
                                className={`flex flex-1 items-center justify-center pb-4 cursor-pointer ${
                                    activeTab === 'violation' ? 'border-b-2 border-black text-black' : 'text-gray-400'
                                }`}
                                onClick={() => setActiveTab('violation')}
                            >
                                Vi phạm
                            </button>
                        </div>
                        <div>
                            {activeTab === 'post' && <ListPost />}
                            {activeTab === 'postshare' && <ListPostShare />}
                            {activeTab === 'violation' && <ListViolation />}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-[30%] h-[300px] rounded-[25px] px-6 py-4 pt- 0 border border-gray-300 sticky top-10">
                    <div className="text-center w-full text-lg font-bold">Đăng nhập hoặc đăng ký SocialPost</div>
                    <p className="text-center w-full text-gray-500">
                        Xem mọi người đang nói về điều gì và tham gia cuộc trò chuyện.
                    </p>
                    <button
                        className="mt-8 w-full h-[50px] rounded-3xl border-gray-400 text-gray-400 border-2 cursor-pointer hover:border-black hover:text-black"
                        onClick={() => setShowLoginModal(true)}
                    >
                        Đăng Nhập
                    </button>
                    <button
                        className="mt-4 w-full h-[50px] rounded-3xl border-gray-400 text-gray-400 border-2 cursor-pointer hover:border-black hover:text-black"
                        onClick={() => setShowModalSignUp(true)}
                    >
                        Đăng Ký
                    </button>
                </div>
                {showLoginModal && <ModalLogin onClose={() => setShowLoginModal(false)} />}
                {showModalSignUp && <ModalSignUp onClose={() => setShowModalSignUp(false)} />}
            </div>
        </div>
    );
};

export default ProfilePageDetail;