import React from "react";

function FlipCard({ book }) {
  return (
    <div align="center">
      <div className="flip-card">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <img
              src={book.volumeInfo.imageLinks.thumbnail}
              alt="iExperimen"
              title="iExperimen"
              style={{ width: "250px", height: "300px", borderRadius: "20px" }}
            />
          </div>
          <div
            className="flip-card-back"
            style={{ width: "250px", height: "300px", borderRadius: "20px" }}
          >
            <h3>{book.volumeInfo.title}</h3>
            {book.volumeInfo.hasOwnProperty("description") ? (
              <p>{book.volumeInfo.description.substring(0, 50)}</p>
            ) : (
              <p>No description available</p>
            )}
            {book.volumeInfo.hasOwnProperty("publishedDate") ? (
              <p>Publishen on: {book.volumeInfo.publishedDate}</p>
            ) : (
              <p>Published Date unknown</p>
            )}
            {book.volumeInfo.hasOwnProperty("authors") ? (
              <p>Author : {book.volumeInfo.authors[0]}</p>
            ) : (
              <p>Author unknown</p>
            )}

            <p>Average Rating : {book.volumeInfo.averageRating}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlipCard;
