import React from "react";
import "./style.css";

function FriendCard(props) {
  return (
    <div className="card" onClick={() => props.handleClick(props.id)}>
      <div className="img-container">
        <img alt={props.id} src={props.image} />
      </div>
      {/* <span onClick={() => props.handleClick(props.id)}>
      </span> */}
    </div>
  );
}

export default FriendCard;
