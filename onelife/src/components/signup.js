import React from "react";
import { BrowserRouter as Router, Switch, Link } from "react-router-dom";
import "../signup.css";
import "antd/es/form/style/css";
import "antd/es/input/style/css";
import "antd/es/tooltip/style/css";
import "antd/es/icon/style/css";
import "antd/es/cascader/style/css";
import "antd/es/select/style/css";
import "antd/es/row/style/css";
import "antd/es/col/style/css";
import "antd/es/checkbox/style/css";
import "antd/es/button/style/css";
import "antd/es/auto-complete/style/css";
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete
} from "antd";

const axios = require("axios");

function onBlur() {
  console.log("blur");
}

function onFocus() {
  console.log("focus");
}

function onSearch(val) {
  console.log("search:", val);
}

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: []
  };

  onChange = value => {
    this.setState({ type: value });
    // console.log(`selected ${value}`);
  };

  on_change = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevstate => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
    // console.log("State is :", this.state);
  };

  handleSubmit = e => {
    e.preventDefault();
    // console.log("State is :", this.state);
    const { username, password, email, type } = this.state;

    axios({
      method: "post",
      url: "http://127.0.0.1:8000/signup/",
      data: {
        username,
        password,
        type,
        email
      }
    }).then(function(response) {
      console.log("Submitting : ", response);
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  handleWebsiteChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = [".com", ".org", ".net"].map(
        domain => `${value}${domain}`
      );
    }
    this.setState({ autoCompleteResult });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };
    const prefixSelector = getFieldDecorator("prefix", {
      initialValue: "91"
    })(
      <Select style={{ width: 70 }}>
        <Option value="91">+91</Option>
      </Select>
    );

    return (
      <div className="Main">
        <Link to="/">
          <h2 style={{ color: "white" }} className="top-right">
            Already Signed up ? Log in
          </h2>
        </Link>
        <div className="bg"></div>
        <div className="centered">
          <h1 className="text">One Life</h1>
        </div>
        <h1 style={{ textAlign: "center", marginTop: "2%" }}>
          Save a life today
        </h1>
        <div className="App">
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item label="E-mail">
              {getFieldDecorator("email", {
                rules: [
                  {
                    type: "email",
                    message: "The input is not valid E-mail!"
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!"
                  }
                ]
              })(<Input onChange={this.on_change} name="email" />)}
            </Form.Item>
            <Form.Item label="Password" hasFeedback>
              {getFieldDecorator("password", {
                rules: [
                  {
                    required: true,
                    message: "Please input your password!"
                  },
                  {
                    validator: this.validateToNextPassword
                  }
                ]
              })(<Input.Password onChange={this.on_change} name="password" />)}
            </Form.Item>
            <Form.Item label="Confirm Password" hasFeedback>
              {getFieldDecorator("confirm", {
                rules: [
                  {
                    required: true,
                    message: "Please confirm your password!"
                  },
                  {
                    validator: this.compareToFirstPassword
                  }
                ]
              })(<Input.Password onBlur={this.handleConfirmBlur} />)}
            </Form.Item>
            <Form.Item
              label={
                <span>
                  Username&nbsp;
                  <Tooltip title="What do you want others to call you?">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              }
            >
              {getFieldDecorator("username", {
                rules: [
                  {
                    required: true,
                    message: "Please input your username!",
                    whitespace: true
                  }
                ]
              })(<Input onChange={this.on_change} name="username" />)}
            </Form.Item>

            <Form.Item label="Phone Number">
              {getFieldDecorator("phone", {
                rules: [
                  {
                    required: true,
                    message: "Please input your phone number!"
                  }
                ]
              })(
                <Input
                  name="pno"
                  onChange={this.on_change}
                  addonBefore={prefixSelector}
                  style={{ width: "100%" }}
                />
              )}
            </Form.Item>

            <Form.Item label="Type">
              {getFieldDecorator("type", {
                rules: [{ required: true, message: "Please select a type" }]
              })(
                <Select
                  name="type"
                  showSearch
                  style={{ width: 200 }}
                  optionFilterProp="children"
                  onChange={this.onChange}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  onSearch={onSearch}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value="Hospital">Hospital</Option>
                  <Option value="User">User</Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}
const WrappedRegistrationForm = Form.create({ name: "register" })(
  RegistrationForm
);

export default WrappedRegistrationForm;
