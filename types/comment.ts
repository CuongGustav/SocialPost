export interface CommentImageResponse {
    id: string;
    image_url: string;
    created_at: string;
}

export interface CommentWithUserResponse {
    id: string;
    post_id: string;
    user_id: string;
    username: string;
    avatar_url: string | null;
    content: string;
    status: string;
    images: CommentImageResponse[];
    created_at: string;
    updated_at: string | null;
}