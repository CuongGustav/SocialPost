'use client';

import ListPost from './listPost';
import {useState} from 'react';
import ModalLogin from '../../components/auth/Login';
import ModalSignUp from '../../components/auth/SignUp';

const PortPage = () => {
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

    return (
        <div>
            <div className="flex justify-center text-xl font-bold">
                Trang chủ
            </div>
            <div className="flex w-[70%] mx-auto pt-2 gap-4">
                <div className="flex flex-col w-[70%] rounded-[25px] border border-gray-300 pb-8 ">
                    <ListPost />
                </div>
                <div className="flex flex-col w-[30%] h-[300px] rounded-[25px] px-6 py-4 border border-gray-300 sticky top-12">
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
            {showModalLogin && <ModalLogin onClose={closeModalLogin} />}
            {showModalSignUp && <ModalSignUp onClose={closeModalSignUp} />}

        </div>
    );
};

export default PortPage;