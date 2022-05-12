import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Character = () => {
  const [data, setData] = useState();
  const [dataComics, setDataComics] = useState();
  const [imgUrl, setImgUrl] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams(); //Id character
  // console.log(id);
  useEffect(() => {
    const fetchDataCharacter = async () => {
      try {
        // Je fais une requête à mon serveur en donnent l'id du personnage en params
        const response = await axios.get(
          `http://localhost:3000/character/${id}`
        );
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
        // Je fais une requête à mon serveur en donnent l'id du personnage en params
        const responseComics = await axios.get(
          `http://localhost:3000/comics/${id}`
        );
        console.log(responseComics.data.comics); //.comics[0].title
        setDataComics(responseComics.data.comics);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchDataComics();
  }, [id]);

  return isLoading ? (
    <p>Veuillez patienter ...pour ce personnage</p>
  ) : (
    <div className="character-container">
      <h1>{data.name}</h1>
      <div className="character-filmography">
        <div className="col-1">
          <img className="img-character" src={imgUrl} alt={data.name} />
        </div>
        <div className="col-2">
          {dataComics.map((comics, key) => {
            return (
              <button className="card" key={key}>
                {comics.title}
              </button>
            );
          })}
        </div>
        <div className="col-3"></div>
      </div>
    </div>
  );
};

export default Character;
