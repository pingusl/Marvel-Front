//----Loading Tool----//
import { useEffect, useState } from "react";
import axios from "axios";

//----Loading CSS----//
import "../components/comics.scss";

//----Loading searchImg----//
import searchImage from "../img/loupe.svg";
import previousArrow from "../img/Antu_arrow-left.png";
import nextArrow from "../img/Antu_arrow-right.png";
const Comics = () => {
  const [data, setData] = useState();
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [skip, setSkip] = useState(0);
  const [totalComics, setTotalComics] = useState(0);
  const limit = 50;
  //const serverUrl = "http://localhost:3000";
  const serverUrl = "https://marvel-sl.herokuapp.com";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${serverUrl}/comics?limit=${limit}&skip=${skip}&title=${searchInput}`
        );
        //console.log(response.data);
        console.log(response.data.count);
        console.log(skip);
        setTotalComics(response.data.count);
        //----Sort Methode----//
        // const tab = [];
        // response.data.results
        //   .map((comic, key) => {
        //     tab.push(comic.title);
        //     return false;
        //   })
        //   .sort();
        // console.log(tab);

        setData(response.data);

        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [searchInput, skip]);

  return isLoading ? (
    <p>En cours de chargement</p>
  ) : (
    <div className="comics-container">
      <div className="search-bar-container">
        <nav className="navigate">
          <div className="previous-nav">
            <img
              className={
                skip < 2 * limit
                  ? "img-previous-cards-hide"
                  : "img-previous-cards-show"
              }
              src={previousArrow}
              alt="previous"
              onClick={() => {
                setSkip(skip - limit);
              }}
              key="previous"
            />
          </div>
          <div className="search-bar">
            <div className="search-img">
              <img className="search-img" src={searchImage} alt="search" />
            </div>
            <div className="search-characters">
              <input
                className="search-characters"
                placeholder="Find your Favorite Title"
                type="text"
                onClick={(event) => {
                  setSearchInput("");
                }}
                onChange={(event) => {
                  setSearchInput(event.target.value);
                }}
                value={searchInput}
                key="next"
              />
            </div>
          </div>
          <div className="next-nav">
            <img
              className={
                skip > totalComics
                  ? "img-next-cards-hide"
                  : "img-next-cards-show"
              }
              src={nextArrow}
              alt="next"
              onClick={() => {
                setSkip(skip + limit);
              }}
            />
          </div>
        </nav>
      </div>

      <div className="comics-cards">
        {data.results.map((comic, key) => {
          const imgUrl = comic.thumbnail.path + "." + comic.thumbnail.extension;

          return (
            <div className="comic-card">
              <div>
                <img className="card-picture" src={imgUrl} alt={comic.title} />
              </div>
              <div classname="comic-informations">
                <div className="card-title">{comic.title}</div>
                <div className="comic-description">{comic.description}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Comics;
