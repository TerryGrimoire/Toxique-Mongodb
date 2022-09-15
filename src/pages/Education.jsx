import React, { useState, useEffect } from "react";
import * as Realm from "realm-web";
import { Helmet } from "react-helmet";
import Faq from "../components/Faq";
import Loading from "../components/Loading";

function Education() {
  const [faq, setFaq] = useState();

  const getData = async () => {
    const app = new Realm.App({ id: "toxique-qqyje" });
    const credentials = Realm.Credentials.anonymous();
    try {
      const user = await app.logIn(credentials);
      const allFaq = await user.functions.getAllFaq();
      setFaq(allFaq);
    } catch (err) {
      console.error("Failed to log in", err);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container">
      <Helmet>
        <title> Toxique | Education </title>
      </Helmet>
      {faq ? (
        <section>
          <h1>Eduquons-nous</h1>
          <div>
            {faq.map((el) => (
              <Faq el={el} />
            ))}
          </div>
        </section>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default Education;
