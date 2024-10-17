import React from "react";
import BookCard from "./BookCard";

const BookList = ({ books }) => {
  return (
    <div className="mt-12 mx-auto border-[1px] border-black px-10 rounded-xl flex flex-col items-center w-[80vw]  overflow-x-hidden mb-28 pb-10">
      <h2 className="text-4xl font-light my-10">Book Recommendations</h2>
      <ul className="flex flex-wrap justify-evenly gap-y-8 w-full">
        {books.map((book, index) => (
          <li key={index} className="my-2">
            <BookCard
              title={book.title}
              author={book.authors}
              genres={book.genres}
              thumbnail={book.thumbnail}
              pageCount={book.pageCount}
              ratingsCount={book.ratingsCount}
              averageRating={book.averageRating}
              link={book.link}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
