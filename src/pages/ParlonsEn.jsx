import React, { useState, useEffect } from "react";
import * as Realm from "realm-web";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

function ParlonsEn() {
  const [subjects, setSubjects] = useState();
  const getData = async () => {
    const app = new Realm.App({ id: "toxique-qqyje" });
    const credentials = Realm.Credentials.anonymous();
    try {
      const user = await app.logIn(credentials);
      const allSubjects = await user.functions.getAllSubjects();
      setSubjects(allSubjects);
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
        <title> Toxique | Parlons-en </title>
      </Helmet>
      {subjects ? (
        <section>
          <h1>Parlons-en</h1>
          <div>
            {subjects.map((subject) => (
              <Link to={`/Parlons_en/${subject.subject_id}`}>
                <div className="subject">
                  <h3>{subject.title}</h3>
                  <p>{subject.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default ParlonsEn;
