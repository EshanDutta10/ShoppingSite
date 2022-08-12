import React, { useState } from "react";
import { Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

const Cards = ({ data }) => {
  const [heart, setheart] = useState(false);

  const rating = data.rating.rate;

  const full = Math.floor(rating / 1);
  const remainder = rating % 1;
  const half = Math.floor(remainder / 0.5);
  const empty = 5 - full - half;

  return (
    <Col md={4}>
      <Card style={{ width: "100%", marginBottom: "20px" }}>
        <Card.Img variant="top" src={data.image} />
        <div
          onClick={() => {
            setheart((prev) => !prev);
          }}
          style={{
            marginRight: "5px",
            position: "absolute",
            top: "0",
            right: "0",
          }}
        >
          {heart ? (
            <AiFillHeart fontSize="25px" color="red" />
          ) : (
            <AiOutlineHeart fontSize="25px" color="grey" />
          )}
        </div>

        <Card.Body>
          <Card.Title
            style={{
              textAlign: "left",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {data.title}
          </Card.Title>
          <p
            style={{
              textAlign: "left",
              fontSize: "12px",
              color: "grey",
              fontWeight: "600",
            }}
          >
            {data.category}
          </p>

          <div style={{ display: "flex", alignItems: "center" }}>
            {Array.from(Array(full)).map((_) => (
              <BsStarFill style={{ color: "gold" }} />
            ))}
            {Array.from(Array(half)).map((_) => (
              <BsStarHalf style={{ color: "gold" }} />
            ))}
            {Array.from(Array(empty)).map((_) => (
              <BsStar style={{ color: "gold" }} />
            ))}
            <span
              style={{ marginLeft: "5px", fontSize: "12px", color: "grey" }}
            >
              ({data.rating.count})
            </span>
          </div>
          <p style={{ textAlign: "left", fontSize: "20px", fontWeight: "600" }}>
            ${data.price}
          </p>
          {/* <StarRating
        name="react-star-rating"
        caption="Rate this component!"
        totalStars={5}
      /> */}
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Cards;
