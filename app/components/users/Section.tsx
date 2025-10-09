import CardRanking from "./Cards/CardRanking";

const Section = ({ title, books }) => (
  
  <div className="!mx-auto py-2">
    <span className="flex items-center group">
      <h1 className="font-bold text-2xl">{title}</h1>
      <a
        href="/thien-dinh-tim-binh-an"
        className="font-bold flex items-center ml-3 font-pri opacity-0 translate-x-[-10px] transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
      >
        Khám phá
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-5 h-5 ml-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </a>
    </span>
    <div className="flex flex-row overflow-x-auto scrollbar-hide w-full gap-7 p-5">
      {books.map((book, i) => (
        <CardRanking
          key={i}
          cover={book.cover}
          title={book.title}
          author={book?.authorId?.name}
          category={book.categories}
          description={book.description}
          slug={book.link}
        />
      ))}
    </div>
  </div>
);
export default Section;