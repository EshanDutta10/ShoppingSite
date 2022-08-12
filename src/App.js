import { useEffect, useState } from "react";
import { Container, Row, Col, FloatingLabel, Form } from "react-bootstrap";
import "./App.css";
import { data } from "./db/data";
import logo from "./images/company.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { GoSearch } from "react-icons/go";
import { BsPersonCircle } from "react-icons/bs";
import { AiOutlineUnorderedList, AiFillBell } from "react-icons/ai";
// import Card from "react-bootstrap/Card";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import StarRating from "react-star-rating";
import Cards from "./components/card";
import Filters from "./components/Filters";

function App() {
  const [apiData, setApiData] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  const setPrice = (e) => {
    setPriceRange(e.target.id);
  };
  const setCat = (e) => {
    setCategory(e.target.id);
  };

  useEffect(() => {
    const newdata = data.filter(function (ele) {
      return ele.title.toLowerCase().includes(searchVal.toLowerCase());
    });
    setApiData(newdata);
  }, [searchVal]);

  useEffect(() => {
    if (sort == 1) {
      setApiData(data);
      return;
    }
    if (sort == 2) {
      const newdata = [...data].sort(function (a, b) {
        return b.price - a.price;
      });
      setApiData(newdata);
      return;
    }
    if (sort == 3) {
      const newdata = [...data].sort(function (a, b) {
        return a.price - b.price;
      });
      setApiData(newdata);
      return;
    }
  }, [sort]);

  useEffect(() => {
    if (category == "" && priceRange == "") {
      setApiData(data);
      return;
    }
    if (category == "" && priceRange != "") {
      let prices = priceRange.split(" - ").map((ele) => parseInt(ele));
      const newdata = data.filter(function (ele) {
        return ele.price >= prices[0] && ele.price <= prices[1];
      });
      setApiData(newdata);
      return;
    }
    if (category != "" && priceRange == "") {
      const newdata = data.filter(function (ele) {
        return ele.category == category;
      });
      setApiData(newdata);
      return;
    }
    if (category != "" && priceRange != "") {
      let prices = priceRange.split(" - ").map((ele) => parseInt(ele));
      const newdata = data.filter(function (ele) {
        return (
          ele.price >= prices[0] &&
          ele.price <= prices[1] &&
          ele.category == category
        );
      });
      setApiData(newdata);
      return;
    }
  }, [category, priceRange]);

  // useEffect(() => {
  //   if (priceRange == "") {
  //     setApiData(data);
  //     return;
  //   }
  //   let prices = priceRange.split(" - ").map((ele) => parseInt(ele));
  //   const newdata = data.filter(function (ele) {
  //     return ele.price >= prices[0] && ele.price <= prices[1];
  //   });
  //   setApiData(newdata);
  // }, [priceRange]);

  useEffect(() => {
    setApiData(data);
  }, []);
  console.log(data);

  return (
    <div className="App">
      <Container className="header">
        <Row>
          <Col md={2}>
            <img src={logo} alt="company logo" />
          </Col>
          <Col md={3}>
            <div className="search-input">
              <Form.Control
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                type="text"
                placeholder="Search"
                style={{ border: "none", outline: "none" }}
                className="form-control"
              />
              <GoSearch />
            </div>
          </Col>
          <Col
            md={{ span: 4, offset: 3 }}
            style={{ display: "flex", alignItems: "center" }}
          >
            <div className="categories">
              <AiOutlineUnorderedList style={{ marginRight: "5px" }} />
              Categories
            </div>
            <div className="categories">
              <AiFillBell fontSize="30px" style={{ marginRight: "5px" }} />
              <div className="notificationAlert" />
            </div>
            <div className="categories">
              <BsPersonCircle fontSize="30px" style={{ marginRight: "5px" }} />
            </div>
          </Col>
        </Row>
      </Container>

      <Container className="hero" style={{ marginTop: "20px" }}>
        <Row>
          <Col md={3}>
            <Filters
              setPrice={setPrice}
              checkedPrice={priceRange}
              selectedCat={category}
              setCat={setCat}
            />
          </Col>
          <Col md={9}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Breadcrumb>
                <Breadcrumb.Item active>Home</Breadcrumb.Item>
                <Breadcrumb.Item active>Home Decoration</Breadcrumb.Item>
                <Breadcrumb.Item active>Artificial</Breadcrumb.Item>
              </Breadcrumb>
              <Form.Select
                style={{ width: "150px", marginBottom: "10px" }}
                aria-label="Default select example"
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="1">Sort By</option>
                <option value="2">Price high to low</option>
                <option value="3">Price low to high</option>
              </Form.Select>
            </div>
            <Row>
              {apiData.map((ele) => (
                <Cards data={ele} />
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
