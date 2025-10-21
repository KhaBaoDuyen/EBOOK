export default interface ICardLibrary {
  book: {
    id: number | string;
    title: string;
    author: string;
    cover: string;
    progress?: number;
    isFinished?: boolean;
    isSaved?: boolean;
    slug?:string;
  };
}