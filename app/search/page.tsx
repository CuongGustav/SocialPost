'use client'

import { FiSearch } from "react-icons/fi";
import { MdCancel } from "react-icons/md";
import { useState } from "react";
import ListPost from "../post/listPost";
import ListUser from "./listUser";

const SearchLayout = () => {
    const [activeTab, setActiveTab] = useState("post");
    const [searchInput, setSearchInput] = useState("");

    const handleClearInput = () => {
        setSearchInput("");
    };

    return (
        <div>
            <div className="flex justify-center text-xl font-bold">
                Tìm kiếm
            </div>
            <div className="flex w-[70%] mx-auto pt-2 gap-4 ">
                <div className="flex flex-col w-[70%] rounded-[25px] border border-gray-300 p-4 ">
                    <div className="flex flex-row items-center border border-gray-300 h-[45px] rounded-2xl">
                        <FiSearch className="ml-6 text-gray-500"/>
                        <input
                            className="flex-1 bg-transparent outline-none ml-3 "
                            placeholder="Tìm kiếm ..."
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                        <MdCancel 
                            className="ml-6 text-gray-500 mr-3 cursor-pointer"
                            onClick={handleClearInput}
                        />
                    </div>
                    <div className="flex gap-4 border-b border-gray-300 mb-4">
                        <button
                            className={`px-4 py-2 font-semibold ${
                                activeTab === "post"
                                    ? "border-b-2 border-black text-black"
                                    : "text-gray-400"
                            }`}
                            onClick={() => setActiveTab("post")}
                        >
                            Post
                        </button>
                        <button
                            className={`px-4 py-2 font-semibold ${
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
                        {activeTab === "post" && <ListPost/>}
                        {activeTab === "user" && <ListUser/>}
                    </div>
                </div>
                <div className="flex flex-col w-[30%] h-[300px] rounded-[25px] px-6 py-4 border border-gray-300">
                    <div className="text-center w-full text-lg font-bold">
                        Đăng nhập hoặc đăng ký SocialPost
                    </div>
                    <p className="text-center w-full text-gray-500">
                        Xem mọi người đang nói về điều gì và tham gia cuộc trò chuyện.
                    </p>
                    <button className="mt-8 w-full h-[50px] rounded-3xl border-gray-400 text-gray-400 border-2 cursor-pointer 
                                    hover:border-black hover:text-black">
                        Đăng Nhập
                    </button>
                    <button className="mt-4 w-full h-[50px] rounded-3xl border-gray-400 text-gray-400 border-2 cursor-pointer
                                    hover:border-black hover:text-black">
                        Đăng Ký
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SearchLayout;