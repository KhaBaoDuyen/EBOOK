import { useLoaderData } from "@remix-run/react";

export async function loader() {
  const res = await fetch("http://localhost:3000/api/pdf-to-text");
  return res.json();
}

export default function DocSachPage() {
  const { chapters } = useLoaderData<{ chapters: any[] }>();

  return (
    <div className="bg-[#111827] text-white p-6 max-w-3xl mx-auto space-y-6 leading-relaxed">
      <h1 className="text-2xl font-bold mb-4">📖 Sách “Mưa đỏ”</h1>

      {chapters.map((ch) => (
        <div key={ch.id}>
          <h2 className="text-lg font-bold mb-2">{ch.title}</h2>
          <p className="whitespace-pre-line">{ch.content}</p>
        </div>
      ))}
    </div>
  );
}
