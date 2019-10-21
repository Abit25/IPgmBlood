import React, { Component, createRef } from "react";
import "semantic-ui-css/semantic.min.css";
import { Navbar, Nav, Form, Row, Col, Button } from "react-bootstrap";

import img2 from "./heart.png";

export default class Profile extends React.Component {
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
        </Navbar>
        <div
          className="ui card"
          style={{ marginLeft: "3vw", marginTop: "4vh" }}
        >
          <div className="image">
            <img src="https://us.123rf.com/450wm/kritchanut/kritchanut1406/kritchanut140600112/29213222-stock-vector-male-silhouette-avatar-profile-picture.jpg?ver=6" />
          </div>
          <div className="content">
            <a className="header">Kristy</a>
            <div className="meta">
              <span className="date">Joined in 2013</span>
            </div>
            <div className="description">
              Kristy is an art director living in New York.
            </div>
          </div>
        </div>
        <Form
          style={{
            position: "absolute",
            top: "13vh",
            right: "7vw",
            marginLeft: "2vw"
          }}
        >
          <Row>
            <Col style={{ width: "50vw" }}>
              <Form.Control placeholder="First Name" />
            </Col>
            <Col>
              <Form.Control placeholder="Last Name" />
            </Col>
          </Row>
          <Row>
            <Col style={{ marginTop: "3vh" }}>
              <Form.Control placeholder="Address" />
            </Col>
          </Row>
          <Row>
            <Col style={{ marginTop: "3vh" }}>
              <Form.Control placeholder="Date of Birth" />
            </Col>
            <Col style={{ marginTop: "3vh" }}>
              <Form.Control placeholder="Phone Number" />
            </Col>
          </Row>
          <Row>
            <Col style={{ marginTop: "3vh" }}>
              <Form.Control placeholder="Aadhar Number" />
            </Col>
            <Col style={{ marginTop: "3vh" }}>
              <Form.Control placeholder="Emergency Contact" />
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
              />
            </Col>
            <Col>
              <Form.Check
                type="radio"
                label="Male"
                name="formHorizontalRadios"
                id="formHorizontalRadios1"
              />
            </Col>
          </Row>
          <hr />
          <Row>
            <Col>
              <Form.Control as="select">
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
              <Form.Control placeholder="Physician Name" />
            </Col>
            <Col>
              <Form.Control placeholder="Physician Number" />
            </Col>
          </Row>
          <Row style={{ marginTop: "3vh" }}>
            <Col>
              <Form.Control placeholder="Insurance Name" />
            </Col>
            <Col>
              <Form.Control placeholder="Policy Number" />
            </Col>
            <Col>
              <Form.Control placeholder="Insurance Details" />
            </Col>
          </Row>
          <Row style={{ marginTop: "3vh" }}>
            <Col>
              <Form.Control placeholder="Allergies (If any)" />
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
                name="formHorizontalRadios"
                id="formHorizontalRadios1"
              />
            </Col>
            <Col>
              <Form.Check
                type="radio"
                label="No"
                name="formHorizontalRadios"
                id="formHorizontalRadios1"
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
                name="formHorizontalRadios"
                id="formHorizontalRadios1"
              />
            </Col>
            <Col>
              <Form.Check
                type="radio"
                label="No"
                name="formHorizontalRadios"
                id="formHorizontalRadios1"
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
                name="formHorizontalRadios"
                id="formHorizontalRadios1"
              />
            </Col>
            <Col>
              <Form.Check
                type="radio"
                label="No"
                name="formHorizontalRadios"
                id="formHorizontalRadios1"
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
                name="formHorizontalRadios"
                id="formHorizontalRadios1"
              />
            </Col>
            <Col>
              <Form.Check
                type="radio"
                label="No"
                name="formHorizontalRadios"
                id="formHorizontalRadios1"
              />
            </Col>
          </Row>
          <Row style={{ marginTop: "3vh" }}>
            <Col>
              <Form.Control placeholder="Previous Serious Illness or Injury :" />
            </Col>
          </Row>
          <Row style={{ marginTop: "3vh" }}>
            <Col>
              <Form.Control placeholder="Other important medical information :" />
            </Col>
          </Row>
          <Row style={{ marginTop: "3vh" }}>
            <Col>
              <Form.Control placeholder="Any regular medications you require(Include dosage) :" />
            </Col>
          </Row>
          <Row style={{ marginTop: "3vh" }}>
            <Col>
              <Form.Label as="legend">
                <b>Please choose a profile picture</b>
              </Form.Label>
            </Col>
            <Col>
              <Form.Control type="file" />
            </Col>
            <Col></Col>
          </Row>
          <Row style={{ marginTop: "3vh", textAlign: "center" }}>
            <Col>
              <Button style={{ width: "15vw" }} variant="primary">
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </React.Fragment>
    );
  }
}
