export interface UserSimpleResponse {
    id: string;
    username: string;
    avatar_url: string | null;
    fullname: string | null;
}

export interface UserWithFollowResponse {
    id: string;
    username: string;
    avatar_url: string | null;
    fullname: string;
    bio: string | null;
    follow_count: number;
    status: "active" | "banned";
    create_at: string;
}