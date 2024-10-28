import axiosInstance from 'utils/Axios'; // Axios 인스턴스 임포트

export interface Notice {
    id: number; // 공지사항 ID
    title: string; // 공지사항 제목
    content: string; // 공지사항 내용
    createdAt: Date; // 작성 날짜 (Date 객체로 변경)
    importance: 'HIGH' | 'MEDIUM' | 'LOW'; // 중요도 (대문자로 변경)
    expirationDate?: Date; // 만료 날짜 (선택적, Date 객체로 변경)
}

// 공지사항 가져오기
export const fetchNotices = async (): Promise<Notice[]> => {
    const response = await axiosInstance.get('v2/notices');
    const notices: Notice[] = response.data.map((notice: any) => {
        return {
            ...notice,
            createdAt: new Date(notice.createdAt[0], notice.createdAt[1] - 1, notice.createdAt[2], notice.createdAt[3], notice.createdAt[4], notice.createdAt[5]), // 배열을 Date 객체로 변환
            expirationDate: notice.expirationDate ? new Date(notice.expirationDate[0], notice.expirationDate[1] - 1, notice.expirationDate[2]) : undefined, // 선택적 필드 처리
        };
    });
    return notices;
};
