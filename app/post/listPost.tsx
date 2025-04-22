import Image from 'next/image';
import styles from "../../styles/post.module.css";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa6";
import { RiShareForwardLine } from "react-icons/ri";

const ListPost = () => {
    const images = [
        "/2e98d8b6-a483-405a-88d9-67171f71b379.jpg",
        "/2-7996-1640236604.png",
        "/2-7996-1640236604.png"
    ];

    const renderImages = (images: string[]) => {
        if (images.length === 1) {
            return (
                <Image
                    src={images[0]}
                    alt="Ảnh"
                    width={500}
                    height={200}
                    className={`cursor-pointer rounded-xl ${styles.objectContain}`}
                />
            );
        } else if (images.length === 2) {
            return (
                <div className="flex gap-2 w-full">
                    {images.map((src, index) => (
                        <div className="w-1/2" key={index}>
                            <Image
                                src={src}
                                alt={`Ảnh ${index + 1}`}
                                width={500}
                                height={200}
                                className="cursor-pointer rounded-xl w-full h-auto object-cover"
                            />
                        </div>
                    ))}
                </div>
            );
        } else if (images.length > 2) {
            return (
                <div className="overflow-x-auto scrollbar-hide">
                    <div className="flex flex-row gap-2 min-w-full">
                        {images.map((src, index) => (
                            <Image
                                key={index}
                                src={src}
                                alt={`Ảnh ${index + 1}`}
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

    const posts = [
        {
            id: 1,
            username: "Nameaaaaaaaaaaaaa",
            time: "Gio",
            content: "post\na\na\na\na\na",
            images: images
        },
        {
            id: 2,
            username: "Nameaaaaaaaaaaaaa",
            time: "Gio",
            content: "post\na\na\na\na\na",
            images: images
        }
    ];

    return (
        <div className="flex flex-col">
            {posts.map((post) => (
                <div key={post.id} className="px-4 mt-2 flex flex-row border-b border-gray-300">
                    <div className="min-w-[50px]">
                        <div className="logo border border-gray-300 rounded-full h-[50px] cursor-pointer">
                            <Image
                                src="/2e98d8b6-a483-405a-88d9-67171f71b379.jpg"
                                alt="Logo"
                                width={50}
                                height={50}
                                className="cursor-pointer rounded-full"
                            />
                        </div>
                    </div>
                    <div className="ml-2 mt-2 w-full">
                        <div className="flex flex-row gap-2">
                            <div className="font-bold max-w-[128px] overflow-hidden">{post.username}</div>
                            <div>{post.time}</div>
                        </div>
                        <div className="whitespace-pre-line">{post.content}</div>
                        <div className="mt-2">{renderImages(post.images)}</div>
                        <div className="flex flex-row gap-12 my-2 text-2xl">
                            <div className="flex flex-row justify-center items-center gap-1">
                                <FaRegHeart className="cursor-pointer" />
                                <p className="text-base"></p>
                            </div>
                            <div className="flex flex-row justify-center items-center gap-1">
                                <FaRegComment className="cursor-pointer" />
                                <p className="text-base"></p>
                            </div>
                            <div className="flex flex-row justify-center items-center gap-1">
                                <RiShareForwardLine className="cursor-pointer" />
                                <p className="text-base"></p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ListPost;