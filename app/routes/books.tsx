import type { LoaderFunctionArgs } from "react-router";
import { useLoaderData } from "@remix-run/react";
import db from "~/utils/db.server";
import Book from "~/models/book.server";

export async function loader({ request }: LoaderFunctionArgs) {
  await db;
  const books = await Book.find().lean();

   return new Response(JSON.stringify(books), {
    headers: { "Content-Type": "application/json" },
  });
}

export default function BooksPage() {
  const books = useLoaderData<typeof loader>();

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Danh sách sách</h1>
      <ul className="mt-4">
        {books.map((book: any) => (
          <li key={book._id}>{book.title} - {book.author}</li>
        ))}
      </ul>
    </div>
  );
}
