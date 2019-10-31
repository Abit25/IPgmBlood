import React, { Component, createRef } from "react";
import "semantic-ui-css/semantic.min.css";
import { Navbar, Nav, Form, Row, Col, Button } from "react-bootstrap";
import "./profile.css";
import img2 from "./heart.png";
import axios from "axios";

export default class Profile extends React.Component {
  onSubmit = e => {
    console.log(this.state);
    var fd = new FormData();
    fd.append("fname", this.state.fname);
    fd.append("lname", this.state.lname);
    fd.append("add", this.state.add);
    fd.append("dob", this.state.dob);
    fd.append("pno", this.state.pno);
    fd.append("aadhar", this.state.aadhar);
    fd.append("eno", this.state.eno);
    fd.append("gender", this.state.gender);
    fd.append("bloodgrp", this.state.bloodgrp);
    fd.append("phyname", this.state.phyname);
    fd.append("phyno", this.state.phyno);
    fd.append("iname", this.state.iname || "-");
    fd.append("polno", this.state.polno || "-");
    fd.append("insdet", this.state.insdet || "-");
    fd.append("alchohol", this.state.alchohol);
    fd.append("cig", this.state.cig);
    fd.append("diab", this.state.diab);
    fd.append("allergies", this.state.allergies || "-");
    fd.append("imm", this.state.imm);
    fd.append("injuries", this.state.injuries || "-");
    fd.append("medinfo", this.state.medinfo || "-");
    fd.append("regmed", this.state.regmed || "-");
    axios.post("http://127.0.0.1:8000/patient/", fd).then(function(response) {
      console.log(response);
      if (response.data.status == 200) {
        console.log("Success");
      }
    });
  };

  render() {
    return (
      <React.Fragment>
        <Navbar variant="light" style={{ backgroundColor: "#AEEEEE" }}>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="/logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            One Life
          </Navbar.Brand>
          <Nav.Link href="#home">
            <img
              src={img2}
              style={{ height: "40px", width: "40px", textAlign: "right" }}
            />
          </Nav.Link>
          <Navbar.Collapse className="justify-content-end">
            <Button
              variant="light"
              style={{ color: "grey" }}
              onClick={e => {
                localStorage.removeItem("user_id");
                this.props.history.push("/");
              }}
            >
              LOGOUT {localStorage.getItem("user_id")}
            </Button>
          </Navbar.Collapse>
        </Navbar>
        <div
          className="ui card"
          style={{ marginLeft: "3vw", marginTop: "4vh" }}
        >
          <div className="image">
            <img src="https://us.123rf.com/450wm/kritchanut/kritchanut1406/kritchanut140600112/29213222-stock-vector-male-silhouette-avatar-profile-picture.jpg?ver=6" />
          </div>
          <div className="content">
            <a className="header">{localStorage.getItem("user_id")}</a>
          </div>
        </div>
        <Form className="myform">
          <Row>
            <Col style={{ width: "50vw" }}>
              <Form.Control
                placeholder="First Name"
                onChange={e => {
                  this.setState({ fname: e.target.value });
                }}
              />
            </Col>
            <Col>
              <Form.Control
                placeholder="Last Name"
                onChange={e => {
                  this.setState({ lname: e.target.value });
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col style={{ marginTop: "3vh" }}>
              <Form.Control
                placeholder="Address"
                onChange={e => {
                  this.setState({ add: e.target.value });
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col style={{ marginTop: "3vh" }}>
              <Form.Control
                placeholder="Date of Birth"
                onChange={e => {
                  this.setState({ dob: e.target.value });
                }}
              />
            </Col>
            <Col style={{ marginTop: "3vh" }}>
              <Form.Control
                placeholder="Phone Number"
                onChange={e => {
                  this.setState({ pno: e.target.value });
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col style={{ marginTop: "3vh" }}>
              <Form.Control
                placeholder="Aadhar Number"
                onChange={e => {
                  console.log(e.currentTarget.value);
                  if (
                    e.currentTarget.value.length == 4 ||
                    e.currentTarget.value.length == 9 ||
                    e.currentTarget.value.length == 14
                  ) {
                    e.currentTarget.value += "-";
                  }
                  this.setState({ aadhar: e.target.value });
                }}
              />
            </Col>
            <Col style={{ marginTop: "3vh" }}>
              <Form.Control
                placeholder="Emergency Contact"
                onChange={e => {
                  this.setState({ eno: e.target.value });
                }}
              />
            </Col>
          </Row>
          <Row style={{ marginTop: "3vh" }}>
            <Col>
              <Form.Label as="legend">
                <b>Gender</b>
              </Form.Label>
            </Col>
            <Col>
              <Form.Check
                type="radio"
                label="Female"
                name="formHorizontalRadios"
                id="formHorizontalRadios1"
                onChange={e => {
                  if (e.target.checked) {
                    this.setState({ gender: " Female" });
                  }
                }}
              />
            </Col>
            <Col>
              <Form.Check
                type="radio"
                label="Male"
                name="formHorizontalRadios"
                id="formHorizontalRadios1"
                onChange={e => {
                  if (e.target.checked) {
                    this.setState({ gender: " Female" });
                  }
                }}
              />
            </Col>
          </Row>
          <hr />
          <Row>
            <Col>
              <Form.Control
                as="select"
                onChange={e => {
                  this.setState({ bloodgrp: e.target.value });
                }}
              >
                <option selected disabled>
                  Please select your blood group
                </option>
                <option>O+ve</option>
                <option>O-ve</option>
                <option>A+ve</option>
                <option>A-ve</option>
                <option>B+ve</option>
                <option>B-ve</option>
                <option>AB+ve</option>
                <option>AB-ve</option>
              </Form.Control>
            </Col>
            <Col></Col>
          </Row>
          <Row style={{ marginTop: "3vh" }}>
            <Col>
              <Form.Control
                placeholder="Physician Name"
                onChange={e => {
                  this.setState({ phyname: e.target.value });
                }}
              />
            </Col>
            <Col>
              <Form.Control
                placeholder="Physician Number"
                onChange={e => {
                  this.setState({ phyno: e.target.value });
                }}
              />
            </Col>
          </Row>
          <Row style={{ marginTop: "3vh" }}>
            <Col>
              <Form.Control
                placeholder="Insurance Name"
                onChange={e => {
                  this.setState({ iname: e.target.value });
                }}
              />
            </Col>
            <Col>
              <Form.Control
                placeholder="Policy Number"
                onChange={e => {
                  this.setState({ polno: e.target.value });
                }}
              />
            </Col>
            <Col>
              <Form.Control
                placeholder="Insurance Details"
                onChange={e => {
                  this.setState({ insdet: e.target.value });
                }}
              />
            </Col>
          </Row>
          <Row style={{ marginTop: "3vh" }}>
            <Col>
              <Form.Control
                placeholder="Allergies (If any)"
                onChange={e => {
                  this.setState({ allergies: e.target.value });
                }}
              />
            </Col>
          </Row>
          <Row style={{ marginTop: "3vh" }}>
            <Col>
              <Form.Label as="legend">
                <b>Do you consume Alchohol ?</b>
              </Form.Label>
            </Col>
            <Col>
              <Form.Check
                type="radio"
                label="Yes"
                name="alchohol"
                id="formHorizontalRadios1"
                onChange={e => {
                  if (e.target.checked) {
                    this.setState({ alchohol: 1 });
                  }
                }}
              />
            </Col>
            <Col>
              <Form.Check
                type="radio"
                label="No"
                name="alchohol"
                id="formHorizontalRadios1"
                onChange={e => {
                  if (e.target.checked) {
                    this.setState({ alchohol: 0 });
                  }
                }}
              />
            </Col>
          </Row>
          <Row style={{ marginTop: "3vh" }}>
            <Col>
              <Form.Label as="legend">
                <b>Are you Diabetic ?</b>
              </Form.Label>
            </Col>
            <Col>
              <Form.Check
                type="radio"
                label="Yes"
                name="diab"
                id="formHorizontalRadios1"
                onChange={e => {
                  if (e.target.checked) {
                    this.setState({ diab: 1 });
                  }
                }}
              />
            </Col>
            <Col>
              <Form.Check
                type="radio"
                label="No"
                name="diab"
                id="formHorizontalRadios1"
                onChange={e => {
                  if (e.target.checked) {
                    this.setState({ diab: 0 });
                  }
                }}
              />
            </Col>
          </Row>
          <Row style={{ marginTop: "3vh" }}>
            <Col>
              <Form.Label as="legend">
                <b>Do you smoke ?</b>
              </Form.Label>
            </Col>
            <Col>
              <Form.Check
                type="radio"
                label="Yes"
                name="cig"
                id="formHorizontalRadios1"
                onChange={e => {
                  if (e.target.checked) {
                    this.setState({ cig: 1 });
                  }
                }}
              />
            </Col>
            <Col>
              <Form.Check
                type="radio"
                label="No"
                name="cig"
                id="formHorizontalRadios1"
                onChange={e => {
                  if (e.target.checked) {
                    this.setState({ cig: 0 });
                  }
                }}
              />
            </Col>
          </Row>
          <Row style={{ marginTop: "3vh" }}>
            <Col>
              <Form.Label as="legend">
                <b>Are your Immunizations up to date ?</b>
              </Form.Label>
            </Col>
            <Col>
              <Form.Check
                type="radio"
                label="Yes"
                name="inj"
                id="formHorizontalRadios1"
                onChange={e => {
                  if (e.target.checked) {
                    this.setState({ imm: 1 });
                  }
                }}
              />
            </Col>
            <Col>
              <Form.Check
                type="radio"
                label="No"
                name="inj"
                id="formHorizontalRadios1"
                onChange={e => {
                  if (e.target.checked) {
                    this.setState({ imm: 0 });
                  }
                }}
              />
            </Col>
          </Row>
          <Row style={{ marginTop: "3vh" }}>
            <Col>
              <Form.Control
                placeholder="Previous Serious Illness or Injury :"
                onChange={e => {
                  this.setState({ injuries: e.target.value });
                }}
              />
            </Col>
          </Row>
          <Row style={{ marginTop: "3vh" }}>
            <Col>
              <Form.Control
                placeholder="Other important medical information :"
                onChange={e => {
                  this.setState({ medinfo: e.target.value });
                }}
              />
            </Col>
          </Row>
          <Row style={{ marginTop: "3vh" }}>
            <Col>
              <Form.Control
                placeholder="Any regular medications you require(Include dosage) :"
                onChange={e => {
                  this.setState({ regmed: e.target.value });
                }}
              />
            </Col>
          </Row>
          {/* <Row style={{ marginTop: "3vh" }}>
            <Col>
              <Form.Label as="legend">
                <b>Please choose a profile picture</b>
              </Form.Label>
            </Col>
            <Col>
              <Form.Control type="file" />
            </Col>
            <Col></Col>
          </Row> */}
          <Row style={{ marginTop: "3vh", textAlign: "center" }}>
            <Col>
              <Button
                className="submitbtn"
                variant="primary"
                onClick={this.onSubmit}
              >
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </React.Fragment>
    );
  }
}
