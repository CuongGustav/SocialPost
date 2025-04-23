export interface PostCreate {
    content: string;
}

export interface PostImageResponse {
    id: string;
    image_url: string;
    created_at: string;
}

export interface PostWithUserResponse {
    id: string;
    user_id: string;
    username: string;
    avatar_url: string | null;
    content: string;
    status: "valid" | "hidden" | "deleted";
    images: PostImageResponse[];
    like_count: number; 
    comment_count: number; 
    share_count: number; 
    created_at: string;
    updated_at: string | null;
  }
    