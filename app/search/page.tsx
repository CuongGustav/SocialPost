"use client";

import { FiSearch } from "react-icons/fi";
import { MdCancel } from "react-icons/md";
import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import ListPost from "./listPost";
import ListUser from "./listUser";
import { PostWithUserResponse } from "../../types/post";
import { UserSimpleResponse } from "../../types/user";
import ModalLogin from "../../components/auth/Login";
import ModalSignUp from "@/components/auth/SignUp";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

const SearchLayout = () => {
    const [activeTab, setActiveTab] = useState<"post" | "user">("post");
    const [searchInput, setSearchInput] = useState("");
    const [posts, setPosts] = useState<PostWithUserResponse[]>([]);
    const [users, setUsers] = useState<UserSimpleResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showModalLogin, setShowModalLogin] = useState(false);
    const [showModalSignUp, setShowModalSignUp] = useState(false);
    
    const openModalLogin = () => {
        setShowModalLogin(true);
    }
    const closeModalLogin = () => {
        setShowModalLogin(false);
    }

    const openModalSignUp = () => {
        setShowModalSignUp(true);
    }
    const closeModalSignUp = () => {
        setShowModalSignUp(false);
    }

    const searchPosts = useCallback(async (query: string) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/posts/search`, {
                params: { query },
            });
            setPosts(response.data);
            setError(null);
        } catch (error) {
            console.error("Lỗi khi tìm kiếm bài đăng:", error);
            setError("Không thể tải bài đăng");
            setPosts([]);
        }
    }, []);

    const searchUsers = useCallback(async (query: string) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/users/search`, {
                params: { search: query },
            });
            setUsers(response.data);
            setError(null);
        } catch (error) {
            console.error("Lỗi khi tìm kiếm người dùng:", error);
            setError("Không thể tải người dùng");
            setUsers([]);
        }
    }, []);

    const debouncedSearchRef = useRef(
        debounce((query: string, active: "post" | "user") => {
            if (query.trim() === "") {
                setPosts([]);
                setUsers([]);
                setError(null);
                setLoading(false);
                return;
            }
            setLoading(true);
            if (active === "post") {
                searchPosts(query).finally(() => setLoading(false));
            } else {
                searchUsers(query).finally(() => setLoading(false));
            }
        }, 400)
    );

    useEffect(() => {
        const debounced = debouncedSearchRef.current;
        debounced(searchInput, activeTab);
    
        return () => {
            debounced.cancel();
        };
    }, [searchInput, activeTab]);
  

    const handleClearInput = () => {
        setSearchInput("");
        setPosts([]);
        setUsers([]);
        setError(null);
        setLoading(false);
    };

    return (
        <div>
            <div className="flex justify-center text-xl font-bold sticky top-0 py-2 bg-white shadow-b-md shadow-black/20">
                Tìm kiếm
            </div>
            <div className="flex w-[70%] mx-auto pt-2 gap-4">
                <div className="flex flex-col w-[70%] rounded-[25px] border border-gray-300 p-4">
                    <div className="flex flex-row items-center border border-gray-300 h-[45px] rounded-2xl">
                        <FiSearch className="ml-6 text-gray-500" />
                        <input
                            className="flex-1 bg-transparent outline-none ml-3"
                            placeholder="Tìm kiếm ..."
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                        <MdCancel
                            className="ml-6 text-gray-500 mr-3 cursor-pointer"
                            onClick={handleClearInput}
                        />
                    </div>
                    <div className="flex gap-4 border-b border-gray-300 mb-4 mt-3">
                        <button
                            className={`px-4 py-2 font-semibold cursor-pointer ${
                                activeTab === "post"
                                ? "border-b-2 border-black text-black"
                                : "text-gray-400"
                            }`}
                            onClick={() => setActiveTab("post")}
                        >
                            Post
                        </button>
                        <button
                            className={`px-4 py-2 font-semibold cursor-pointer ${
                                activeTab === "user"
                                ? "border-b-2 border-black text-black"
                                : "text-gray-400"
                            }`}
                            onClick={() => setActiveTab("user")}
                        >
                            UserName
                        </button>
                    </div>
                    <div>
                        {loading && <div className="text-center">Đang tải...</div>}
                        {error && <div className="text-center text-red-500">{error}</div>}
                        {activeTab === "post" && <ListPost posts={posts} />}
                        {activeTab === "user" && <ListUser users={users} />}
                    </div>
                </div>
                <div className="flex flex-col w-[30%] h-[300px] rounded-[25px] px-6 py-4 border border-gray-300 sticky top-10">
                    <div className="text-center w-full text-lg font-bold">
                        Đăng nhập hoặc đăng ký SocialPost
                    </div>
                    <p className="text-center w-full text-gray-500">
                        Xem mọi người đang nói về điều gì và tham gia cuộc trò chuyện.
                    </p>
                    <button
                        className="mt-8 w-full h-[50px] rounded-3xl border-gray-400 text-gray-400 border-2 cursor-pointer hover:border-black hover:text-black"
                        onClick={()=> openModalLogin()}
                    >
                        Đăng Nhập
                    </button>
                    <button 
                        className="mt-4 w-full h-[50px] rounded-3xl border-gray-400 text-gray-400 border-2 cursor-pointer hover:border-black hover:text-black"
                        onClick={()=> openModalSignUp()}
                    >
                        Đăng Ký
                    </button>
                </div>
            </div>
            {showModalLogin && <ModalLogin onClose={closeModalLogin}/>}
            {showModalSignUp && <ModalSignUp onClose={closeModalSignUp}/>}

        </div>
    );
};

export default SearchLayout;
