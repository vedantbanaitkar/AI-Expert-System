import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BookList from "./components/BookList";
import Banner from "./components/Banner"; // Adjust the path if necessary
import Navbar from "./components/Navbar";
import LoadingAnimation from "./components/ui/loading.gif"
import "./App.css";

function App() {
  const [inputValue, setInputValue] = useState(""); // For the current input
  const [genres, setGenres] = useState([]); // For the list of genres
  const [toastMessage, setToastMessage] = useState(""); // For the toast message
  const [showToast, setShowToast] = useState(false); // For showing the toast
  const [books, setBooks] = useState([]); // For the fetched books
  const [loading, setLoading] = useState(false);

  // List of valid genres for validation
  const validGenres = [
    "fiction",
    "fantasy",
    "drama",
    "romance",
    "thriller",
    "mystery",
    "happy",
    "sad",
    "excited",
    "relaxed",
    "short",
    "crime",
    "marathi",
    "hindi",
    "growth",
    "money",
    "economy",
    "finance",
    "politics",
    "science",
    "AI",
    "tragic",
    "technology",
    "it",
    "internet",
    "nature",
    "story",
    "literature",
    "novel",
  ]; // Add more as needed

  // Handle input changes
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Handle pressing 'Enter' to add genre/mood
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addGenre();
    }
  };

  const searchBooks = async () => {
    if (genres.length === 0) {
      triggerToast("Please add at least one genre.");
      return;
    }

    setLoading(true); // Start loading

    try {
      const response = await fetch("http://localhost:5000/search-books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ genres }),
      });

      if (!response.ok) {
        throw new Error("Error fetching books");
      }

      const data = await response.json();
      setBooks(data.topBooks);
  
    } catch (error) {
      console.error("Failed to fetch books:", error);
      triggerToast("Failed to fetch books.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Add genre/mood to the list
  const addGenre = () => {
    const genreToAdd = inputValue.trim().toLowerCase(); // Trim and lowercase for uniformity

    if (genreToAdd) {
      if (genres.length >= 3) {
        // If there are already 3 genres, show a toast message
        triggerToast("You can only add up to 3 genres.");
      } else if (validGenres.includes(genreToAdd)) {
        // Check for duplicates
        if (genres.includes(genreToAdd)) {
          triggerToast("Genre already added.");
        } else {
          setGenres((prevGenres) => [...prevGenres, genreToAdd]);
          setInputValue(""); // Clear the input field
        }
      } else {
        triggerToast("Invalid genre, please enter a valid one.");
      }
    }
  };

  // Trigger the toast with a message
  const triggerToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000); // Hide after 3 seconds
  };

  // Remove genre/mood from the list
  const removeGenre = (indexToRemove) => {
    setGenres((prevGenres) =>
      prevGenres.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <div id="outer" className="w-[100vw] max-w-[100vw]">
      <Navbar />
      <Banner />
      <div className=" border-[1px] border-gray-400 rounded-lg p-10 mx-auto w-[40vw]">
        {/* Input and Add Button */}
        <div className="flex gap-2 rounded-full overflow-hidden border border-gray-500  mx-auto">
          <Input
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            placeholder={"Enter genre or mood"}
            className="border-none m-3 mr-0 focus:outline-none"
          />
          <Button
            onClick={addGenre}
            className="rounded-r-3xl  m-3 ml-0 hover:bg-slate-200 hover:text-black transition ease-in-out duration-600"
          >
            Add
          </Button>
        </div>

        {/* List of genres */}
        <div className="mt-4 flex justify-center text-white flex-wrap">
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

        <div className="h-2 border-t-2 my-3"></div>

        <div className="w-[100%] flex justify-center">
          <button
            className="text-white mx-auto h-12 w-40 rounded-3xl mt- text-center hover:bg-slate-100 hover:text-black transition ease-in-out duration-600"
            onClick={searchBooks}
          >
            Search
          </button>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center items-center">
          <img
            src={LoadingAnimation}
            alt="Loading..."
            style={{ width: 100, height: 100 }}
          />
        </div>
      )}

      {books.length > 0 && <BookList books={books} />}

      {showToast && (
        <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-red-400 text-white py-2 px-4 rounded-md shadow-md transition-opacity duration-500 ">
          {toastMessage}
        </div>
      )}
    </div>
  );
}

export default App;
