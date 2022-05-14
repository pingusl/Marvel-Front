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
  const [total, setTotal] = useState(0);
  const [tab, setTab] = useState([]);
  const [skip, setSkip] = useState(0);
  const limit = 50;

  const serverUrl = "http://localhost:3000";
  //const serverUrl = "https://marvel-sl.herokuapp.com";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${serverUrl}/comics?limit=${limit}&skip=${skip}&title=${searchInput}`
        );
        //console.log(response.data.results);
        //console.log(response.data.count);

        setTotal(response.data.count);
        let completion = [];
        //----Autocompletion Methode----//
        //console.log(tab);
        if (searchInput === "") {
          setTab([]);
        } else {
          for (let i = 0; i < response.data.results.length; i++) {
            // console.log(response.data.results[i].title);
            if (response.data.results[i].title.indexOf(searchInput) !== -1) {
              if (completion.length < 3) {
                completion.push(
                  <p key={response.data.results[i].title}>
                    {response.data.results[i].title}
                  </p>
                );
              }
            }
          }
        }

        setTab(completion);

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
              <img
                className="search-img"
                src={searchImage}
                alt="search"
                key="search-img"
              />
            </div>

            <div className="search-characters-container">
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
      <div className="search-and-autocomplet">
        <div className="col-1"></div>
        <ul className="autocomplet-container">
          {tab.map((autocomplet) => {
            return (
              <li className="item-autocomplet">{autocomplet.props.children}</li>
            );
          })}
        </ul>
        <div className="col-2"></div>
      </div>
      <div className="comics-cards">
        {data.results.map((comic, key) => {
          const imgUrl = comic.thumbnail.path + "." + comic.thumbnail.extension;
          if (imgUrl.indexOf("image_not_available") === -1) {
            if (imgUrl.indexOf("4c002e0305708") === -1) {
              const card = (
                <div className="comic-card">
                  <div>
                    <img
                      className="card-picture"
                      src={imgUrl}
                      alt={comic.title}
                      key={comic.title}
                    />
                  </div>
                  <div className="comic-informations">
                    <div className="card-title">
                      <h4>{comic.title}</h4>
                    </div>
                    <div className="comic-description">{comic.description}</div>
                  </div>
                </div>
              );
              return card;
            } else return null;
          } else return null;
        })}
      </div>
    </div>
  );
};
export default Comics;
