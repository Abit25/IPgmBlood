import React, { Component } from "react";
import { Navbar, Nav, Alert, Form } from "react-bootstrap";
import img2 from "./heart.png";
import { Button } from "@material-ui/core";
import axios from "axios";

class Hospital extends Component {
  state = { show: true, messages: [] };
  constructor(props) {
    super(props);
    if (!localStorage.getItem("user_id")) {
      this.props.history.push("");
    }
    console.log(this.props.match.params.repo);
    const formData = new FormData();
    formData.append("hospital", this.props.match.params.repo);
    axios.post("http://127.0.0.1:8000/messages/", formData).then(res => {
      console.log(res.data.messages);
      this.setState({ messages: res.data.messages });
    });
  }

  render() {
    var messages;
    if (this.state.messages.length > 0) {
      console.log(this.state.messages);
      messages = this.state.messages.map(message => (
        <Alert
          key={message.id}
          variant="danger"
          style={{ width: "90vw", marginLeft: "5vw", marginTop: "5vh" }}
        >
          <Alert.Heading>{message.username}</Alert.Heading>
          <hr />
          <p>Blood Group : {message.bloodgrp}</p>
          <p>Age : {message.age}</p>
          <p>Symtoms: {message.symptoms}</p>
          <p>Address : {message.address}</p>
        </Alert>
      ));
    } else {
      messages = (
        <h1 style={{ marginTop: "25vh", textAlign: "center" }}>
          No Pending Messages
        </h1>
      );
    }
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">
            <img
              alt=""
              src={img2}
              width="30"
              height="30"
              className="d-inline-block align-top"
              style={{ marginRight: "1vw" }}
            />
            {"One Life"}
          </Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <Button
              style={{ color: "white" }}
              onClick={e => {
                localStorage.removeItem("user_id");
                this.props.history.push("/");
              }}
            >
              LogOut, {localStorage.getItem("user_id")}
            </Button>
          </Navbar.Collapse>
        </Navbar>
        {messages}
      </div>
    );
  }
}

export default Hospital;
