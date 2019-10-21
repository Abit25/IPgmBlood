import React, { Component, createRef } from "react";
import {
  Navbar,
  Nav,
  Form,
  Row,
  Col,
  Popover,
  OverlayTrigger,
  Spinner,
  Button
} from "react-bootstrap";
import img2 from "./heart.png";
import img from "./question.png";
import "./map.css";
import axios from "axios";

const popover = (
  <Popover id="popover-basic">
    <Popover.Title as="h3">Help</Popover.Title>
    <Popover.Content>
      Listed towards your left are some symptoms/signs .You can select one or
      more as applicable.
    </Popover.Content>
  </Popover>
);

const Example = () => (
  <OverlayTrigger trigger="click" placement="left" overlay={popover}>
    {/* <Button variant="success" style={{ marginTop: "15vh", marginLeft: "4vw" }}>
      What am I supposed to do now ?
    </Button> */}
    <img
      src={img}
      style={{
        height: "35px",
        width: "35px",
        position: "absolute",
        right: "3vw",
        top: "35vh"
      }}
    />
  </OverlayTrigger>
);

class GoogleMap extends Component {
  constructor(props) {
    super(props);
    this.state = { symptoms: [] };
    this.googleMapRef = createRef();
  }

  componentDidMount() {
    const googleMapScript = document.createElement("script");
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${"AIzaSyCpSyVOMNaAH_omRZGK_iRn1u_91Ot0Rcw"}&libraries=places`;
    window.document.body.appendChild(googleMapScript);

    googleMapScript.addEventListener("load", () => {
      this.googleMap = this.createGoogleMap();
      // console.log(this.googleMap);
      this.marker = this.createMarker();
    });
  }

  createGoogleMap = () => {
    console.log("1");
    var map = new window.google.maps.Map(this.googleMapRef.current, {
      zoom: 14,
      center: {
        lat: 19.0968,
        lng: 72.8517
      }
    });
    return map;
  };

  createMarker = () => {
    // var myLatLng = { lat: 43.642567, lng: -79.387054 };
    // var marker = new window.google.maps.Marker({
    //   position: myLatLng,
    //   map: this.googleMap
    // });
    var myLatLng = 0;
    window.navigator.geolocation.getCurrentPosition(pos => {
      myLatLng = { lat: pos.coords.latitude, lng: pos.coords.longitude };

      // console.log("2");
      // console.log(this.googleMap);
      // console.log(pos.coords.latitude, pos.coords.longitude);
      var marker = new window.google.maps.Marker({
        position: myLatLng,
        map: this.googleMap,
        title: "You are here"
      });
      this.googleMap.setCenter({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      });
      var pyrmont = new window.google.maps.LatLng(myLatLng.lat, myLatLng.long);
      var request = {
        location: pyrmont,
        radius: "3000",
        query: "hospital"
      };

      var service = new window.google.maps.places.PlacesService(this.googleMap);
      service.textSearch(request, this.callback);
      var geocoder = new window.google.maps.Geocoder();

      geocoder.geocode({ location: myLatLng }, (results, status) => {
        if (status === "OK") {
          if (results[0]) {
            console.log(results[0].formatted_address);
            this.setState({ address: results[0].formatted_address });
          }
        }
      });
    });
  };

  callback = (results, status) => {
    this.setState({ hospitals: results.slice(0, 5) });
    console.log(this.state);
    if (status == window.google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < 5; i++) {
        var place = results[i];
        var marker2 = new window.google.maps.Marker({
          position: place.geometry.location,
          map: this.googleMap,
          title: place.name
        });
      }
    }
  };

  selHospital = e => {
    console.log(e.target.value);
    this.setState({ hospitalsel: e.target.value });
  };

  onSubmit = e => {
    e.persist();
    if (!this.state.address) {
      alert("Please wait for the map to load");
    } else {
      console.log("State is ", this.state);
      var fd = new FormData();
      fd.append("fname", this.state.fname);
      fd.append("lname", this.state.lname);
      fd.append("address", this.state.address);
      fd.append("selHospital", this.state.hospitalsel);
      fd.append("phone", this.state.phone);
      fd.append("age", this.state.age);
      fd.append("symptoms", this.state.symptoms);
      axios.post("http://127.0.0.1:8000/request/", fd).then(function(response) {
        console.log(response);
        if (response.data.status == 200) {
          console.log("Button ", e.target.value);
          e.target.innerHTML = "Sent ";
        }
      });
    }
  };

  render() {
    let hospitals;
    if (this.state.hospitals) {
      hospitals = this.state.hospitals.map(hospital => {
        return (
          <div
            style={{ marginLeft: "3vw", marginTop: "3vh" }}
            key={`${hospital.name}`}
            className="mb-3"
          >
            <Form.Check
              onChange={this.selHospital}
              name="hospitalsel"
              type={"radio"}
              id={`default-radio`}
              label={`${hospital.name}`}
              value={`${hospital.name}`}
            />
          </div>
        );
      });
    } else {
      hospitals = (
        <Spinner
          animation="border"
          role="status"
          style={{ marginLeft: "4vw", marginTop: "6vh" }}
        >
          <span className="sr-only">Loading...</span>
        </Spinner>
      );
    }

    return (
      <React.Fragment>
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
        <div id="google-map" ref={this.googleMapRef} />
        <Example />
        <Form id="my-form" onSubmit={this.onSubmit}>
          <Row>
            <Col>
              <Form.Control
                style={{ width: "18vw" }}
                placeholder="First name"
                onChange={e => {
                  this.setState({ fname: e.target.value });
                }}
              />
            </Col>
            <Col>
              <Form.Control
                style={{ width: "18vw" }}
                placeholder="Last name"
                onChange={e => {
                  this.setState({ lname: e.target.value });
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Control
                style={{ width: "18vw", marginTop: "4vh" }}
                placeholder="Phone Number"
                onChange={e => {
                  this.setState({ phone: e.target.value });
                }}
              />
            </Col>
            <Col>
              <Form.Control
                style={{ width: "18vw", marginTop: "4vh" }}
                placeholder="Age"
                onChange={e => {
                  this.setState({ age: e.target.value });
                }}
              />
            </Col>
          </Row>
          <Row style={{ marginTop: "3vh", width: "7vw" }}>
            <Col>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="Bleeding"
                  name="Bleeding"
                  onChange={e => {
                    var t = e.target.checked;
                    if (t) {
                      var sym = this.state.symptoms;
                      sym.push(e.target.name);
                      this.setState({ symptoms: sym });
                    }
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="Severe Bleeding/Concussion"
                  name="Severe Bleeding/Concussion"
                  onChange={e => {
                    var t = e.target.checked;
                    if (t) {
                      var sym = this.state.symptoms;
                      sym.push(e.target.name);
                      this.setState({ symptoms: sym });
                    }
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row style={{ width: "7vw" }}>
            <Col>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="Unconscious"
                  name="Unconscious"
                  onChange={e => {
                    var t = e.target.checked;
                    if (t) {
                      var sym = this.state.symptoms;
                      sym.push(e.target.name);
                      this.setState({ symptoms: sym });
                    }
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row style={{ width: "10vw" }}>
            <Col>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="Animal Bite"
                  name="Animal Bite"
                  onChange={e => {
                    var t = e.target.checked;
                    if (t) {
                      var sym = this.state.symptoms;
                      sym.push(e.target.name);
                      this.setState({ symptoms: sym });
                    }
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row style={{ width: "10vw" }}>
            <Col>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="Heart Attack"
                  name="Heart Attack"
                  onChange={e => {
                    var t = e.target.checked;
                    if (t) {
                      var sym = this.state.symptoms;
                      sym.push(e.target.name);
                      this.setState({ symptoms: sym });
                    }
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Control
                id="hospitalsel"
                disabled
                style={{ width: "38vw", marginTop: "2vh" }}
                placeholder={this.state.hospitalsel || "Choose a Hospital"}
                value={this.state.hospitalsel || "Choose a Hospital"}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                onClick={this.onSubmit}
                variant="danger"
                style={{
                  width: "25vw",
                  marginTop: "10vh",
                  marginLeft: "5vw",
                  height: "8vh"
                }}
              >
                Help Me
              </Button>
            </Col>
          </Row>
        </Form>
        {hospitals}
      </React.Fragment>
    );
  }
}

export default GoogleMap;
