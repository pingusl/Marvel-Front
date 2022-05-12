//----Loading Tool----//
import { useEffect, useState } from "react";
import axios from "axios";

//----Loading CSS----//
import "../components/comics.scss";

const Comics = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/comics");
        console.log(response.data);

        //----Testing Sort Methode----//
        // const tab = [];
        // response.data.results
        //   .map((comic, key) => {
        //     tab.push(comic.title);
        //   })
        //   .sort();
        // console.log(tab);
        //----No Success----//
        setData(response.data);

        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <p>En cours de chargement</p>
  ) : (
    <div className="comics-container">
      <h1>Comics</h1>
      <div className="comics-cards">
        {data.results.map((comic, key) => {
          const imgUrl = comic.thumbnail.path + "." + comic.thumbnail.extension;

          return (
            <div className="comic-card">
              <div>
                <img className="card-picture" src={imgUrl} alt={comic.title} />
              </div>
              <div classname="comic-informations">
                <div className="comic-description">{comic.description}</div>
                <div className="card-title">{comic.title}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Comics;
