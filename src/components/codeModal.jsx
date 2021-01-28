import React, { Component } from "react";

class CodeModal extends Component {
  constructor() {
    super();
    this.state = {
      textAreaValue: "Hello world"
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ textAreaValue: event.target.value });
  }

  render() {
    return (
      <div>
        <label>Enter value : </label>
        <textarea
          value={this.state.textAreaValue}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default CodeModal;
