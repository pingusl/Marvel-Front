import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";

//----Loading CSS----//
import "../components/character.scss";

//----Loading img----//
import heartOff from "../img/heart-off.png";
import heartOn from "../img/heart-on.png";

const Character = () => {
  const [data, setData] = useState();
  const [dataComics, setDataComics] = useState();
  const [imgUrl, setImgUrl] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const [fav, setFav] = useState(false);

  const { id } = useParams(); //Id character

  //const serverUrl = "http://localhost:3000";
  const serverUrl = "https://marvel-sl.herokuapp.com";

  useEffect(() => {
    const fetchDataCharacter = async () => {
      try {
        const response = await axios.get(`${serverUrl}/character/${id}`);

        setImgUrl(
          response.data.thumbnail.path + "." + response.data.thumbnail.extension
        );
        setData(response.data);

        const responseComics = await axios.get(`${serverUrl}/comics/${id}`);
        // console.log(responseComics.data.comics);
        setDataComics(responseComics.data.comics);
        setIsLoading(false);

        //----Check if this characters is a favoris----//
        if (
          Cookies.get("favorisCharacters").indexOf(id) === -1 ||
          Cookies.get("favorisCharacters").indexOf(id) === undefined
        ) {
          setFav(false);
        } else {
          setFav(true);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchDataCharacter();
  }, [id]);

  const favHandleClick = (event) => {
    event.preventDefault();
    const listFavorisCharacters = Cookies.get("favorisCharacters");
    let newList = "";

    if (Cookies.get("favorisCharacters")) {
      if (Cookies.get("favorisCharacters").indexOf(id) !== -1) {
        setFav(false);
        newList = listFavorisCharacters.replace(id + ",", "");

        Cookies.set("favorisCharacters", newList);
      } else {
        setFav(true);

        if (listFavorisCharacters.indexOf(id) === -1) {
          newList = id + "," + listFavorisCharacters;
          Cookies.set("favorisCharacters", newList);
        }
      }
    } else {
      Cookies.set("favorisCharacters", id + ",");
      setFav(true);
    }
  };

  return isLoading ? (
    <p>Veuillez patienter ...pour ce personnage</p>
  ) : (
    <div className="character-container">
      <div className="character-filmography">
        <div className="col-1">
          <img
            className="fav-on"
            src={fav ? heartOn : heartOff}
            alt="heart-off"
            onClick={(event) => {
              favHandleClick(event);
            }}
          />
          <img className="img-character" src={imgUrl} alt={data.name} />
          <h1>{data.name}</h1>
        </div>
        <div className="col-2"></div>
        <div className="col-3">
          {" "}
          {dataComics.map((comics, key) => {
            return (
              <div className="comics-card" key={key}>
                <h4 className="card" key={comics.title}>
                  {comics.title}
                </h4>
                <img
                  className="comic-card-img"
                  src={comics.thumbnail.path + "." + comics.thumbnail.extension}
                  alt={comics.title}
                  key={comics._id}
                ></img>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Character;
