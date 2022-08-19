import React, { useEffect, useState } from "react";
import "./bookshelf.css";
import axios from "axios";
import FlipCard from "./flipcard";

function BookShelf() {
  let offset = 0;
  const [bookData, setBookData] = useState([]);
  const [newest, setNewest] = useState(false);
  const [popularity, setPopularity] = useState(false);
  const [search, setSearch] = useState("a");
  const [totalItems, setTotalItems] = useState(0);

  const loadMoreData = async () => {
    await axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${search}&maxResults=10&startIndex=${offset}`
      )
      .then(({ data }) => {
        setTotalItems(data.totalItems);
        const newBookData = [...data.items];
        const filterData = newBookData.filter((d) => {
          return d.volumeInfo.hasOwnProperty("imageLinks");
        });
        setBookData((oldData) =>
          [...oldData, ...filterData].map((d) => {
            if (d.volumeInfo.hasOwnProperty("publishedDate") == false) {
              d.volumeInfo["publishedDate"] = "0000";
            }
            if (d.volumeInfo.hasOwnProperty("averageRating") == false) {
              d.volumeInfo["averageRating"] = 0;
            }
            return d;
          })
        );
      });
    offset += 10;
  };

  const handleScroll = (e) => {
    if (
      window.innerHeight + e.target.documentElement.scrollTop + 1 >=
      e.target.documentElement.scrollHeight
    ) {
      loadMoreData();
      setNewest(false);
      setPopularity(false);
    }
  };

  const sortByRating = () => {
    let arr = bookData.sort(
      (a, b) =>
        parseInt(b.volumeInfo.averageRating) -
        parseInt(a.volumeInfo.averageRating)
    );
    setBookData(arr);
    setPopularity(!popularity);
  };

  const sortByDate = () => {
    let arr = bookData.sort(
      (a, b) =>
        parseInt(b.volumeInfo.publishedDate.substring(0, 4)) -
        parseInt(a.volumeInfo.publishedDate.substring(0, 4))
    );
    setBookData(arr);
    setNewest(!newest);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    offset = 0;
    setBookData([]);
    loadMoreData();
  };

  useEffect(() => {
    loadMoreData();
    window.addEventListener("scroll", handleScroll);
  }, [newest, popularity]);

  return (
    <div className="container">
      <div className="head">
        <h1 className="heading">BookShelf</h1>
        <div className="countcontainer">
          <div>Available books: </div>
          <div className="count">{totalItems}</div>
        </div>
        <div className="filtercontainer">
          <div
            className="filter"
            style={
              newest ? { color: "rgb(109, 191, 197)" } : { color: "black" }
            }
            onClick={() => sortByDate()}
          >
            Newest
          </div>
          <div className="separator">/</div>
          <div
            className="filter"
            style={
              popularity ? { color: "rgb(109, 191, 197)" } : { color: "black" }
            }
            onClick={() => sortByRating()}
          >
            Popularity
          </div>
        </div>
        <input
          className="search"
          placeholder="Search"
          value={search}
          onChange={handleSearch}
        />
      </div>
      <div className="cardbody">
        {bookData.map((d, i) => {
          return <FlipCard key={i} book={d} />;
        })}
      </div>
    </div>
  );
}

export default BookShelf;
