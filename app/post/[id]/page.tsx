"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../../styles/post.module.css";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa6";
import { RiShareForwardLine } from "react-icons/ri";
import { PostWithUserResponse} from "../../../types/post";
import { CommentWithUserResponse } from "../../../types/comment"
import ModalLogin from "../../../components/auth/Login";
import { IoArrowBackCircleOutline } from "react-icons/io5";


const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Fetch post by post_id
const getPostById = async (postId: string): Promise<PostWithUserResponse> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/posts/${postId}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy bài đăng:", error);
    throw new Error("Không thể tải bài đăng");
  }
};

// Fetch comments by post_id
const getCommentsByPostId = async (postId: string): Promise<CommentWithUserResponse[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/comments/post/${postId}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy bình luận:", error);
    throw new Error("Không thể tải bình luận");
  }
};

const PostDetail = () => {
  const { id } = useParams(); 
  const router = useRouter();
  const [post, setPost] = useState<PostWithUserResponse | null>(null);
  const [comments, setComments] = useState<CommentWithUserResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isLoggedIn = false;
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const fetchPostAndComments = async () => {
      if (!id) {
        setError("Không tìm thấy bài đăng");
        setLoading(false);
        return;
      }
      try {
        const postData = await getPostById(id as string);
        const commentsData = await getCommentsByPostId(id as string);
        setPost(postData);
        setComments(commentsData);
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
        setError("Không thể tải dữ liệu");
        setLoading(false);
      }
    };
    fetchPostAndComments();
  }, [id]);

  const getStaticUrl = (path: string | null): string => {
    if (!path) return "/avatar_user.png";
    if (path.startsWith("http")) return path;
    return `${API_BASE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
  };

  const handleClickWhenNotLogin = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
    }
  };

  const renderImages = (images: PostWithUserResponse["images"]) => {
    if (images.length === 0) return null;
    if (images.length === 1) {
      return (
        <Image
          src={getStaticUrl(images[0].image_url)}
          alt="Hình ảnh bài đăng"
          width={500}
          height={300}
          className={`rounded-xl ${styles.objectContain}`}
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
                height={300}
                className="cursor-pointer rounded-xl w-full h-auto object-cover"
              />
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <div className="overflow-x-auto scrollbar-hide ">
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

  const renderCommentImages = (images: CommentWithUserResponse["images"]) => {
    if (images.length === 0) return null;
    return (
      <div className="flex flex-row gap-2 mt-2">
        {images.map((image) => (
          <Image
            key={image.id}
            src={getStaticUrl(image.image_url)}
            alt="Hình ảnh bình luận"
            width={100}
            height={100}
            className="rounded-xl object-cover"
          />
        ))}
      </div>
    );
  };

  if (loading) {
    return <div className="text-center">Đang tải bài đăng...</div>;
  }

  if (error || !post) {
    return <div className="text-center text-red-500">{error || "Không tìm thấy bài đăng"}</div>;
  }

  return (
    <div>
      {/* Nút Quay lại */}
      <div className='sticky top-0 pl-74 py-2 bg-white'>
                <button
                    className=" flex items-center justify-center rounded-full cursor-pointer "
                    onClick={() => router.back()}
                >
                    <IoArrowBackCircleOutline className="w-6 h-6 text-lg text-gray-400 hover:text-black" />
                </button>
            </div>
      <div className="flex flex-col w-6/10 mx-auto">
        {/* List Post */}
        <div className="flex flex-row border-b border-gray-300 pb-4 mt-4">
          <div className="min-w-[50px]">
            <Image
              src={getStaticUrl(post.avatar_url)}
              alt="Ảnh đại diện"
              width={50}
              height={50}
              className="rounded-full border border-gray-300"
            />
          </div>
          <div className="ml-2 w-full">
            <div className="flex flex-row gap-2">
              <div className="font-bold">{post.username}</div>
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
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClickWhenNotLogin();
                  }}
                />
                <p className="text-base">{post.like_count}</p>
              </div>
              <div className="flex flex-row justify-center items-center gap-1">
                <FaRegComment
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClickWhenNotLogin();
                  }}
                />
                <p className="text-base">{post.comment_count}</p>
              </div>
              <div className="flex flex-row justify-center items-center gap-1">
                <RiShareForwardLine
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClickWhenNotLogin();
                  }}
                />
                <p className="text-base">{post.share_count}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Danh sách bình luận */}
        <div className="mt-4">
          <h2 className="text-lg font-bold mb-2">Bình luận</h2>
          {comments.length === 0 ? (
            <div className="text-center">Chưa có bình luận nào</div>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="flex flex-row border-b border-gray-300 py-2">
                <div className="min-w-[40px]">
                  <Image
                    src={getStaticUrl(comment.avatar_url)}
                    alt="Ảnh đại diện bình luận"
                    width={40}
                    height={40}
                    className="rounded-full border border-gray-300"
                  />
                </div>
                <div className="ml-2 w-full">
                  <div className="flex flex-row gap-2">
                    <div className="font-bold">{comment.username}</div>
                    <div>
                      {new Date(comment.created_at).toLocaleString("vi-VN", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                    </div>
                  </div>
                  <div className="whitespace-pre-line">{comment.content}</div>
                  {renderCommentImages(comment.images)}
                </div>
              </div>
            ))
          )}
        </div>

        {showLoginModal && <ModalLogin onClose={() => setShowLoginModal(false)} />}
      </div>
    </div>
  );
};

export default PostDetail;