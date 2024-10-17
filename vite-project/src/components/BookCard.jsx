// components/BookCard.js
import React from "react";

const BookCard = ({ title, author, genres, thumbnail, pageCount, ratingsCount, averageRating, link }) => {
  const handleCardClick = () => {
    const searchQuery = encodeURIComponent(title);
    const amazonSearchUrl = `https://www.amazon.in/s?k=${searchQuery}`;
    window.open(amazonSearchUrl, "_blank");
  };

  return (
    <div
      className="border rounded-lg p-4 shadow-md w-60 h-[560px] flex flex-col justify-between cursor-pointer hover:shadow-md hover:shadow-gray-500 transition ease-in-out duration-500"
      onClick={handleCardClick} // Open Amazon search URL on click
    >
      <img
        className="w-36 mx-auto border-[1px] rounded-lg  my-3 h-56"
        src={thumbnail}
        alt="cover photo"
      />
      <h3 className=" mx-auto text-lg font-semibold">{title}</h3>
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
        <div className="flex justify-center my-4 ">
          <button
            onClick={(e) => {
              e.preventDefault();
              window.open(link, "_blank");
            }}
            className="text-white mx-auto hover:text-black hover:bg-slate-200"
          >
            Preview Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
