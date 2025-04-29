'use client';

import { FC } from 'react';
import Image from 'next/image';
import { MdClose } from "react-icons/md";

interface ModalSignUpProps {
  onClose: () => void;
}

const ModalSignUp: FC<ModalSignUpProps> = ({ onClose }) => {
    const handleBackdropClick = () => {
        onClose();
    };
    
    const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    return (
        <div 
            className="fixed inset-0 z-100 bg-gray-500/75 flex justify-center items-center h-full"
            onClick={handleBackdropClick}
        >
            <div 
                className="bg-white p-6 rounded-lg w-auto md:w-[600px]"
                onClick={stopPropagation}    
            >
                <div className='flex justify-center relative'>
                    <Image
                        src="/logo.png"
                        alt="Logo"
                        width={100}
                        height={100}
                    />
                    <button 
                        className='absolute text-xl text-gray-500 top-0 right-0 cursor-pointer hover:text-black'
                        onClick={()=>onClose()}
                    >
                        <MdClose />
                    </button>
                </div>
                <div className='text-center px-8 text-gray-500'>
                    Hãy đăng ký để là một trong những thành viên của SocialPost nhé
                </div>
                <div className='px-8'>
                    <form >
                        <div className='grid grid-cols-2 gap-2 pt-4'>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 pb-[2px]">Tên đăng nhập</label>
                                <input
                                    type="text"
                                    name="username"
                                    required
                                    className="h-[32px] px-4 py-2 border rounded-lg focus:outline-none "
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 pb-[2px]">Gmail</label>
                                <input
                                    type="email"
                                    name="gmail"
                                    required
                                    className="h-[32px] px-4 py-2 border rounded-lg focus:outline-none "
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 pb-[2px]">Mật khẩu</label>
                                <input
                                    type="password"
                                    name="password"
                                    required
                                    className="h-[32px] px-4 py-2 border rounded-lg focus:outline-none "
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 pb-[2px]">Nhập lại mật khẩu</label>
                                <input
                                    type="password"
                                    name="re-password"
                                    required
                                    className="h-[32px] px-4 py-2 border rounded-lg focus:outline-none "
                                />
                            </div>
                            <div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 pb-[2px]">Họ và tên</label>
                                    <input
                                        type="text"
                                        name="fullname"
                                        required
                                        className="h-[32px] px-4 py-2 border rounded-lg focus:outline-none "
                                    />
                                </div>
                                <div className='mt-4'>
                                    <label className="block text-sm font-medium text-gray-700 pb-[2px]">Ảnh đại diện</label>
                                    <input
                                        type="file"
                                        name="avatar"
                                        accept="image/*"
                                        required
                                        className='cursor-pointer w-[230px] px-4 py-2 overflow-hidden border rounded-lg'
                                    />
                                </div>
                                
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 pb-[2px]">Giới thiệu bản thân</label>
                                <textarea
                                    name="bio"
                                    rows={4}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none "
                                ></textarea>
                            </div>
                            
                        </div>
                        <button className='mt-6 w-full h-[40px]  rounded-xl border-gray-400 text-black border-2 cursor-pointer hover:border-black hover:bg-gray-200'>
                                Đăng Ký
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ModalSignUp;