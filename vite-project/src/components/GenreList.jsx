function GenreList({ genres, removeGenre }) {
  return (
    <div className="mt-4 flex text-white flex-wrap">
      {genres.map((genre, index) => (
        <div
          key={index}
          className="flex items-center border p-2 pr-3 gap-2 rounded-lg m-2 bg-black hover:bg-slate-100 hover:text-black transition ease-in-out duration-600"
        >
          <div
            onClick={() => removeGenre(index)}
            className="cursor-pointer mt-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="12"
              height="12"
              color="#000000"
              fill="none"
              className="group-hover:stroke-black"
            >
              <path
                d="M19.0005 4.99988L5.00049 18.9999M5.00049 4.99988L19.0005 18.9999"
                stroke="gray"
                strokeWidth="4.0"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="text-center">{genre}</span>
        </div>
      ))}
    </div>
  );
}

export default GenreList;
