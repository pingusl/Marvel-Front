import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";

//----Loading CSS----//
import "../components/character.scss";

//----Loading img----//
import heartOff from "../img/heart-off.png";
import heartOn from "../img/heart-on.png";

//----Setting Cookies----//
//Cookies.set("favorisCharacters", "");

const Character = () => {
  const [data, setData] = useState();
  const [dataComics, setDataComics] = useState();
  const [imgUrl, setImgUrl] = useState();
  const [isLoading, setIsLoading] = useState(true);

  //const [fav, setFav] = useState(false);

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

        const responseComics = await axios.get(`${serverUrl}/comics/${id}`);
        // console.log(responseComics.data.comics); //.comics[0].title
        setDataComics(responseComics.data.comics);
        setIsLoading(false);

        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchDataCharacter();
  }, [id]);

  //----Test toogle fav----//
  const favHandleClick = (event) => {
    let listFavorisCharacters = Cookies.get("favorisCharacters");

    //--Console.log----//
    console.log(`Liste id in cookie : ${listFavorisCharacters}`);
    console.log(`Id value : ${id}`);
    console.log(
      `indeOf(id) value : ${Cookies.get("favorisCharacters").indexOf(id)}`
    );

    if (Cookies.get("favorisCharacters").indexOf(id) !== -1) {
      listFavorisCharacters.replace(id + ",", "");
      Cookies.set("favorisCharacters", listFavorisCharacters);
      console.log("remove id in cookie");
      console.log(Cookies.get("favorisCharacters"));
      // setFav(false);
    } else {
      //----Console.log----//
      console.log(`Liste id in cookie : ${Cookies.get("favorisCharacters")}`);

      if (
        Cookies.get("favorisCharacters") === undefined ||
        Cookies.get("favorisCharacters") === ""
      ) {
        Cookies.set("favorisCharacters", id);

        console.log("set cookie");
      } else {
        if (listFavorisCharacters.indexOf(id) === -1) {
          listFavorisCharacters = id + "," + listFavorisCharacters;
          Cookies.set("favorisCharacters", listFavorisCharacters);
        }

        // console.log("list cookies:");
        // console.log(listFavorisCharacters);
      }
      //  setFav(true);
    }
  };

  return isLoading ? (
    <p>Veuillez patienter ...pour ce personnage</p>
  ) : (
    <div className="character-container">
      <h1>{data.name}</h1>
      <div className="character-filmography">
        <div className="col-1">
          <img
            className="fav-on"
            src={
              Cookies.get("favorisCharacters").indexOf(id) === -1
                ? heartOff
                : heartOn
            }
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
