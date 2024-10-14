// components/BookCard.js
import React from "react";

const BookCard = ({ title, author, genres, thumbnail, pageCount, ratingsCount, averageRating, link }) => {
  return (
    <div className="border rounded p-4 shadow-md w-60 h-[420px] flex flex-col justify-between cursor-pointer hover:shadow-md hover:shadow-gray-500 transition ease-in-out duration-500">
      <h3 className="text-lg font-semibold">{title}</h3>
      <img
        className="w-24 mx-auto border-[1px] border-black my-3 h-36"
        src={thumbnail}
        alt="cover photo"
      />
      <div className="text-left">
        <p className="pl-4">
          {" "}
          <span className="font-semibold">Author:</span> {author}
        </p>
        <p className="pl-4">
          {" "}
          <span className="font-semibold">Categories:</span>{" "}
          {Array.isArray(genres) ? genres.join(", ") : "N/A"}
        </p>
        <p className="pl-4">
          {" "}
          <span className="font-semibold">Page Count:</span>{" "}
          {typeof pageCount === "number" ? pageCount : "N/A"}
        </p>
        <p className="pl-4">
          {" "}
          <span className="font-semibold">Ratings Count:</span> {ratingsCount}
        </p>
        <p className="pl-4">
          {" "}
          <span className="font-semibold">Average Rating:</span> {averageRating}
        </p>
        <p className="pl-4 text-center mt-3 px-3">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline mx"
          >
            Preview Book
          </a>
        </p>

        {/* Add any other book details you want to display */}
      </div>
    </div>
  );
};

export default BookCard;
