// index.js
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(cors());
app.use(express.json());

// Endpoint to fetch books based on genres
// Endpoint to fetch books based on genres
app.post("/search-books", async (req, res) => {
  const { genres } = req.body;
  console.log("Received genres:", genres);

  if (!genres || genres.length === 0) {
    return res.status(400).json({ error: "At least one genre is required." });
  }

  const apiKey = "AIzaSyDWx-KFB9XUeJ7S7b7B0OFzKJ7ZXBqe8NU"; // Replace with your actual API key
  const baseUrl = "https://www.googleapis.com/books/v1/volumes";

  try {
    // Create promises for all genres
    const requests = genres.map((genre) => {
      return axios.get(baseUrl, {
        params: {
          q: `subject:${encodeURIComponent(genre)}`, // Search query for each genre
          maxResults: 12, // Specify the maximum number of results to return for each genre
          key: apiKey, // Include your API key
        },
      });
    });

    // Await all requests to resolve
    const responses = await Promise.all(requests);
    let books = [];

    // Collect all books from responses
    responses.forEach((response) => {
      if (response.data.items) {
        books.push(...response.data.items); // Merge results for all genres
      }
    });

    // Prepare the list of books to return
    const topBooks = books.map((book) => ({
      title: book.volumeInfo.title || "Unknown Title",
      authors: book.volumeInfo.authors || ["Unknown Author"],
      genres: book.volumeInfo.categories || ["Unknown Genre"], // Using categories as genres
      thumbnail: book.volumeInfo.imageLinks?.thumbnail || "No Image",
      pageCount: book.volumeInfo.pageCount || "N/A",
      ratingsCount: book.volumeInfo.ratingsCount || 0,
      averageRating: book.volumeInfo.averageRating || 0, // Set 0 if no rating
      link: book.volumeInfo.previewLink || "N/A",
    }));

    // Sort books by averageRating (descending), putting books without a rating (averageRating 0) at the end
    const sortedBooks = topBooks.sort(
      (a, b) => b.averageRating - a.averageRating
    );


    // Return only the top 12 sorted books
    return res.json({
      topBooks: sortedBooks.slice(0, 12),
    });
  } catch (error) {
    console.error("Error fetching books:", error);
    return res.status(500).json({ error: "Failed to fetch books" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
