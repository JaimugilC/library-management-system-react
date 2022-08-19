import BookShelf from "./components/bookshelf/bookshelf";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import SideBar from "./components/sidebar/sidebar";
import Favourites from "./components/favourites/favourites";

function App() {
  return (
    <BrowserRouter>
      <div className="maincontainer">
        <SideBar />
        <div className="maincontent">
          <Routes>
            <Route path="/" element={<BookShelf />} />
            <Route path="/favourites" element={<Favourites />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
