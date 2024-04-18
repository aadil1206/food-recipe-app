import { useState } from "react";
import React from "react";
import { FaSearch } from "react-icons/fa";
import "./Search.css";
import { Form, useNavigate } from "react-router-dom";
import {
  Button,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  Label,
} from "reactstrap";

const Search = () => {
  const [input, setInput] = useState();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    navigate("/search/" + input);
  };
  return (
    <div className="mb-5">
      <form onSubmit={submitHandler}>
        <InputGroup className="inpGrp col-12" style={{ marginBottom: "0rem" }}>
          <InputGroupText
            style={{ backgroundColor: "#F36A40", border: "none" }}
          >
            <FaSearch size="1.5rem" color="white" />
          </InputGroupText>
          <Input
            name="name"
            id="name"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="name"
            className="col-11 inp"
            style={{ marginLeft: "1rem" }}
          />
        </InputGroup>
      </form>
    </div>
  );
};

export default Search;
