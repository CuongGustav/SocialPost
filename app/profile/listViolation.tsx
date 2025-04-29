'use client'
import axios from "axios";
import { useEffect, useState } from "react";
import { ViolationResponse, ViolationTargetType } from "../../types/violation";
import { useParams } from "next/navigation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const getAllViolationByUserId = async (userId: string): Promise<ViolationResponse[]> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/violations/user/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách vi phạm", error);
        throw new Error("Không thể lấy danh sách vi phạm");
    }
};

const ListViolationPage = () => {
    const { id } = useParams();
    const [violations, setViolations] = useState<ViolationResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchViolations = async () => {
            try {
                const data = await getAllViolationByUserId(id as string);
                setViolations(data);
                setLoading(false);
            } catch (error) {
                console.error("Lỗi khi tải danh sách vi phạm: ", error);
                setError("Không thể tải danh sách vi phạm");
                setLoading(false);
            }
        };
        fetchViolations();
    }, [id]);

    const getTargetTypeLabel = (targetType: ViolationTargetType): string => {
        switch (targetType) {
            case ViolationTargetType.post:
                return "Bài viết";
            case ViolationTargetType.comment:
                return "Bình luận";
            default:
                return targetType; 
        }
    };

    if (loading) {
        return <div className="text-center py-10">Đang tải danh sách vi phạm...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500 py-10">{error}</div>;
    }

    if (violations.length === 0) {
        return <div className="text-center py-10">Không có vi phạm nào</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                    Tổng số vi phạm: {violations.length}
                </h2>
            </div>

            <div className="bg-white rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-gray-50 pl-10">
                            <tr>
                                <th className="py-3 pr-1 text-left font-medium text-[16px] text-gray-500 tracking-wider">
                                    Loại
                                </th>
                                <th className="py-3 text-left font-medium text-[16px] text-gray-500 tracking-wider">
                                    Lý do
                                </th>
                                <th className="py-3 text-left font-medium text-[16px] text-gray-500 tracking-wider">
                                    Thời gian
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {violations.map((violation) => (
                                <tr key={violation.id}>
                                    <td className="py-4 whitespace-nowrap text-sm text-gray-900 pr-1">
                                        {getTargetTypeLabel(violation.target_type)}
                                    </td>
                                    <td className="pl-2 py-4 text-sm text-gray-900">
                                        {violation.reason}
                                    </td>
                                    <td className="pl-2 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {new Date(violation.created_at).toLocaleString("vi-VN", {
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            second: "2-digit",
                                        })}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ListViolationPage;