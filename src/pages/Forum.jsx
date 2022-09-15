import React, { useState, useEffect } from "react";
import * as Realm from "realm-web";
import { useParams } from "react-router-dom";
import Comments from "../components/Comments";
import Loading from "../components/Loading";

function Forum({ subjects }) {
  const { id } = useParams();
  const [comments, setComments] = useState();
  const [data, setData] = useState();
  const [commentId, setCommentId] = useState("");
  const [modalEdit, setModalEdit] = useState(false);
  const [newComment, setNewComment] = useState();

  const subjectsData = subjects;

  const getData = async (x) => {
    const app = new Realm.App({ id: "toxique-qqyje" });
    const credentials = Realm.Credentials.anonymous();
    try {
      const user = await app.logIn(credentials);
      const allComments = await user.functions.getAllComments(x);
      setComments(allComments);
    } catch (err) {
      console.error("Failed to log in", err);
    }
  };

  const postData = async (x) => {
    const app = new Realm.App({ id: "toxique-qqyje" });
    const credentials = Realm.Credentials.anonymous();
    try {
      const user = await app.logIn(credentials);
      const allComments = await user.functions.postOneComment(x);
      setData({ ...data, allComments });
    } catch (err) {
      console.error("Failed to log in", err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postData(data);
  };

  const handleDelete = async (el) => {
    setCommentId(el);
    const app = new Realm.App({ id: "toxique-qqyje" });
    const credentials = Realm.Credentials.anonymous();
    try {
      const user = await app.logIn(credentials);
      const allComments = await user.functions.deleteOneComment(el);
      setData({ ...data, allComments });
    } catch (err) {
      console.error("Failed to log in", err);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const app = new Realm.App({ id: "toxique-qqyje" });
    const credentials = Realm.Credentials.anonymous();
    try {
      const user = await app.logIn(credentials);
      const allComments = await user.functions.editOneComment(
        commentId,
        newComment
      );
      setData({ ...data, allComments });
    } catch (err) {
      console.error("Failed to log in", err);
    }
  };

  useEffect(() => {
    getData(id);
  }, [data, commentId]);
  return (
    <div className="container">
      {comments ? (
        <div>
          <h1>Forum</h1>
          <div className="forum-question dark">
            <h2>{subjects && subjectsData[parseInt(id, 10) - 1].title}</h2>
            <p>{subjects && subjectsData[parseInt(id, 10) - 1].description}</p>
          </div>
          <section>
            {comments.map((commentMap) => (
              <Comments
                commentMap={commentMap}
                handleDelete={handleDelete}
                setModalEdit={setModalEdit}
                setCommentId={setCommentId}
              />
            ))}
          </section>
          {modalEdit && (
            <form className="voile modal-edit" onSubmit={(e) => handleEdit(e)}>
              <h4>Modifier le commentaire </h4>
              <input
                type="text"
                onChange={(e) => setNewComment(e.target.value)}
                defaultValue={commentId}
              />
              <button type="submit" className="btn">
                Modifier
              </button>
            </form>
          )}

          <form onSubmit={(e) => handleSubmit(e)} className="form">
            <input
              type="text"
              className="forum-input"
              onChange={(e) =>
                setData({ content: e.target.value, subject_id: id })
              }
            />
            <button type="submit" className="send">
              ...
            </button>
          </form>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default Forum;
