import React from "react";
import { Card, Container } from "react-bootstrap";
import { TbAdjustmentsHorizontal } from "react-icons/tb";
import Form from "react-bootstrap/Form";
import { data } from "../db/data";

const Filters = ({ checkedPrice, setPrice, selectedCat, setCat }) => {
  const uniqueTags = [];
  data.map((e) => {
    if (uniqueTags.indexOf(e.category) === -1) {
      uniqueTags.push(e.category);
    }
  });

  let low = 0;
  let high = 0;
  const price = [];
  data.map((e) => {
    if (price.indexOf(e.price) === -1) {
      parseFloat(price.push(e.price));
    }
  });
  low = Math.min(...price);
  // console.log(low);

  high = Math.max(...price);
  console.log(high, data[13]);

  const range = (high - low) / 4;
  console.log(range);

  return (
    <div>
      <Container>
        <Card
          style={{
            fontSize: "25px",
            fontWeight: "600",
            padding: "10px 10px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>Filters</div>
            <TbAdjustmentsHorizontal style={{ marginTop: "5px" }} />
          </div>
        </Card>
        <Card
          style={{
            padding: "10px 10px",
            textAlign: "left",
          }}
        >
          Category
          <Form>
            <Form.Check
              type="radio"
              onChange={setCat}
              checked={selectedCat == ``}
              id={``}
              label={`all`}
            />
            {uniqueTags.map((ele) => (
              <div key={ele}>
                <Form.Check
                  type="radio"
                  onChange={setCat}
                  checked={selectedCat == ele}
                  id={ele}
                  label={ele}
                />
              </div>
            ))}
          </Form>
        </Card>
        <Card
          style={{
            padding: "10px 10px",
            textAlign: "left",
          }}
        >
          Price
          <Form>
            <Form.Check
              type="radio"
              onChange={setPrice}
              checked={checkedPrice == ``}
              id={``}
              label={`all`}
            />
            {Array.from(Array(4)).map((_, id) => (
              <Form.Check
                type="radio"
                onChange={setPrice}
                checked={
                  checkedPrice ==
                  `${Math.round(low + range * id)} - ${Math.round(
                    low + range * (id + 1)
                  )}`
                }
                id={`${Math.round(low + range * id)} - ${Math.round(
                  low + range * (id + 1)
                )}`}
                label={`${Math.round(low + range * id)} - ${Math.round(
                  low + range * (id + 1)
                )}`}
              />
            ))}
          </Form>
        </Card>
      </Container>
    </div>
  );
};

export default Filters;
