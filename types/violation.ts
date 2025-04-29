export enum ViolationTargetType {
    post = "post",
    comment = "comment",
}
  
export interface ViolationResponse {
    id: string;
    target_type: ViolationTargetType;
    reason: string;
    created_at: string; 
}