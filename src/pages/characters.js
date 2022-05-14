//----Loading TOOLS----//
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

//----Loading CSS----//
import "../components/characters.scss";

//----Loading Img----//
import searchImage from "../img/loupe.svg";
import previousArrow from "../img/Antu_arrow-left.png";
import nextArrow from "../img/Antu_arrow-right.png";

const Characters = () => {
  const [data, setData] = useState();
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [skip, setSkip] = useState(0);
  const limit = 30;
  const serverUrl = "http://localhost:3000";
  //const serverUrl = "https://marvel-sl.herokuapp.com";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${serverUrl}/characters?limit=${limit}&skip=${skip}&name=${searchInput}`
        );
        setData(response.data);
        setTotal(response.data.count);
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
    <div className="characters-container">
      <div className="search-bar-container">
        <nav className="navigate">
          <div
            className={skip < limit ? "previous-nav-hide" : "previous-nav-show"}
            onClick={() => {
              let memPrevious = skip - limit;
              setSkip(memPrevious);
            }}
            key="previous-img"
          >
            <img src={previousArrow} alt="previous" />
            <div className="nav-prev-text">PREV</div>
          </div>
          <div className="search-bar">
            <div className="search-img">
              <img className="search-img" src={searchImage} alt="search" />
            </div>
            <div className="search-characters">
              <input
                className="search-characters"
                placeholder="Find your Favorite Characters"
                type="text"
                onClick={(event) => {
                  setSearchInput("");
                }}
                onChange={(event) => {
                  setSearchInput(event.target.value);
                }}
                value={searchInput}
                key="search-input"
              />
            </div>
          </div>
          <div
            className={skip > total - limit ? "next-nav-hide" : "next-nav-show"}
            onClick={() => {
              let memNext = skip + limit;
              setSkip(memNext);
            }}
            key="next-img"
          >
            <div className="nav-next-text">NEXT</div>
            <img src={nextArrow} alt="next" />
          </div>
        </nav>
      </div>

      <div className="carrousel">
        {data.results.map((character, key) => {
          const imgUrl =
            character.thumbnail.path + "." + character.thumbnail.extension;

          if (imgUrl.indexOf("image_not_available") === -1) {
            if (imgUrl.indexOf("4c002e0305708") === -1) {
              return (
                <Link
                  className="card-container"
                  to={"/character/" + character._id}
                  key={character._id}
                >
                  <div className="character-card">
                    <img className="img-character" src={imgUrl} alt="" />

                    <div className="name-card" key={character.name}>
                      {character.name}
                    </div>
                    <div className="name-description" key={key}>
                      {character.description}
                    </div>
                  </div>
                </Link>
              );
            } else return null;
          } else return null;
        })}
      </div>
    </div>
  );
};
export default Characters;
