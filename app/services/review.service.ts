export async function getIsReviews(slugBook: string) {
    const res = await fetch(`/api/review/${slugBook}`);

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`API Error:  ${res.status} = ${text}`);
    };
    return await res.json();
}

export async function createReview(data: {
    bookId: string;
    rating: number;
    comment?: string;
}) {
    const formData = new FormData();
    Object.entries(data).forEach(([key, val]) => formData.append(key, String(val)));

    const res = await fetch("/api/create/review", {
        method: "POST",
        body: formData,
    });
    if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Không thể tạo bình luận: ${res.status} - ${errText}`);
    }

    return res.json();
}

export const deleteReview = async (reviewId: string) => {
  const res = await fetch(`/api/delete/${reviewId}/review`, { method: "DELETE" });
  return res.json();
};
