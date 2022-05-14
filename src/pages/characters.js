//----Loading TOOLS----//
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

//----Loading CSS----//
import "../components/characters.scss";

//----Loading searchImg----//
import searchImage from "../img/loupe.svg";

const Characters = () => {
  const [data, setData] = useState();
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [skip, setSkip] = useState(0);
  const limit = 50;
  const serverUrl = "http://localhost:3000";
  //const serverUrl = "https://marvel-sl.herokuapp.com";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${serverUrl}/characters?limit=${limit}&skip=${skip}&name=${searchInput}`
        );
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
    <div className="characters-container">
      <div className="search-bar-container">
        <div className="search-bar">
          <div className="search-img">
            <img className="search-img" src={searchImage} alt="search" />
          </div>
          <div className="search-characters">
            <input
              className="search-characters"
              placeholder="Find your Favorite character"
              type="text"
              onClick={(event) => {
                setSearchInput("");
              }}
              onChange={(event) => {
                setSearchInput(event.target.value);
              }}
              value={searchInput}
            />
          </div>
        </div>
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
