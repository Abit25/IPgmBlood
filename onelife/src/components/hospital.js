import React, { Component } from "react";
import { Navbar, Nav, Alert } from "react-bootstrap";
import img2 from "./heart.png";
import { Button } from "@material-ui/core";
import axios from "axios";

class Hospital extends Component {
  state = { show: true };
  constructor(props) {
    super(props);
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
    if (this.state.messages) {
      console.log(this.state.messages);
      messages = this.state.messages.map(message => (
        <Alert
          key={message.id}
          variant="danger"
          style={{ width: "90vw", marginLeft: "5vw", marginTop: "5vh" }}
        >
          <Alert.Heading>{message.username}</Alert.Heading>

          <p>Blood Group : {message.bloodgrp}</p>
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
              src="/logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            {"One Life"}
          </Navbar.Brand>
          <Nav.Link href="#home">
            <img
              src={img2}
              style={{ height: "40px", width: "40px", textAlign: "right" }}
            />
          </Nav.Link>
        </Navbar>
        {messages}
      </div>
    );
  }
}

export default Hospital;
