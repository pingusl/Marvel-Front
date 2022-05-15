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
  //console.log(id);

  useEffect(() => {
    const fetchDataCharacter = async () => {
      try {
        // Je fais une requête à mon serveur en donnent l'id du personnage en params
        const response = await axios.get(`${serverUrl}/character/${id}`);
        //  console.log(response.data.comics);
        setImgUrl(
          response.data.thumbnail.path + "." + response.data.thumbnail.extension
        );
        setData(response.data);

        //  setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchDataCharacter();
  }, [id]);

  useEffect(() => {
    const fetchDataComics = async () => {
      try {
        const responseComics = await axios.get(`${serverUrl}/comics/${id}`);
        // console.log(responseComics.data.comics); //.comics[0].title
        setDataComics(responseComics.data.comics);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchDataComics();
  }, [id]);
  //----Test toogle fav----//
  const favHandleClick = (event) => {
    //event.preventDefault();
    if (fav === true) {
      console.log(fav);
      setFav(false);
    } else {
      if (Cookies.get("favorisCharacters") === undefined) {
        Cookies.set("favorisCharacters", id);
        console.log("set cookie");
      } else {
        let listFavorisCharacters = Cookies.get("favorisCharacters");
        listFavorisCharacters = listFavorisCharacters + "," + id;
        Cookies.set("favorisCharacters", listFavorisCharacters);
        console.log("list cookies:");
        console.log(listFavorisCharacters);
      }
      setFav(true);
    }
  };

  // useEffect(() => {

  //   };
  //   favHandleClick();
  // }, []);

  return isLoading ? (
    <p>Veuillez patienter ...pour ce personnage</p>
  ) : (
    <div className="character-container">
      <h1>{data.name}</h1>
      <div className="character-filmography">
        <div className="col-1">
          <img
            className="fav-on"
            src={fav === true ? heartOn : heartOff}
            alt="heart-off"
            onClick={() => {
              //fav === true ? setFav(false) : setFav(true);
              favHandleClick();
            }}
          />
          <img className="img-character" src={imgUrl} alt={data.name} />
        </div>
        <div className="col-2">
          {dataComics.map((comics, key) => {
            return (
              <p className="card" key={key}>
                {comics.title}
              </p>
            );
          })}
        </div>
        <div className="col-3"></div>
      </div>
    </div>
  );
};

export default Character;
