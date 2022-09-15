import React, { useState } from "react";
import points from "../assets/points.png";

function Comments({ commentMap, handleDelete, setModalEdit, setCommentId }) {
  const [modal, setModal] = useState(false);

  const handleClick = (el) => {
    setCommentId(el);
    setModalEdit(true);
  };

  return (
    <div className="voile-container">
      <p className="comment">{commentMap.content}</p>
      <button
        type="button"
        className="comment-update"
        onClick={() => setModal(!modal)}
      >
        <img src={points} alt="3 petits points" className="img-points" />
      </button>
      {modal && (
        <div className="flex flex-col modal">
          <button type="button" onClick={() => handleClick(commentMap.content)}>
            Modifier
          </button>
          <button
            type="button"
            onClick={() => handleDelete(commentMap.content)}
          >
            Supprimer
          </button>
        </div>
      )}
    </div>
  );
}

export default Comments;
