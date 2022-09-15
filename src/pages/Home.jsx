import React, { useState, useEffect } from "react";
import * as Realm from "realm-web";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

function Home() {
  const [articles, setArticles] = useState();

  const getData = async () => {
    const app = new Realm.App({ id: "toxique-qqyje" });
    const credentials = Realm.Credentials.anonymous();
    try {
      const user = await app.logIn(credentials);
      const allArticles = await user.functions.getAllArticles();
      setArticles(allArticles);
    } catch (err) {
      console.error("Failed to log in", err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="articles-container">
      <Helmet>
        <title> Toxique | Accueil </title>
      </Helmet>
      {articles &&
        articles.map((article) => (
          <article className="flex justify-start items-center" key={article.id}>
            <div className="voile-container">
              <iframe
                src={article.image}
                width="480"
                height="320"
                frameBorder="0"
                className="giphy-embed"
                allowFullScreen
                title={article.title}
              />
              <div className="voile" />
            </div>
            <section className="flex flex-col items-around">
              <h2>{article.titre}</h2>
              <p>{article.text}</p>
            </section>
          </article>
        ))}

      {articles ? (
        <article className="flex flex-col justify-center items-center choice">
          <h2>Maintenant, c'est à vous de choisir</h2>
          <div className="flex">
            <Link to="/Education">
              <button type="button" className="btn educate">
                S'éduquer
              </button>
            </Link>
            <Link to="/Error404">
              <button type="button" className="btn boomer">
                Toxique et fier
              </button>
            </Link>
          </div>
        </article>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default Home;
