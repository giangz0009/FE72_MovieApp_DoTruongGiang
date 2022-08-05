import React, { Component } from "react";
import { connect } from "react-redux";
import isEmpty from "lodash.isempty";

export class FormInfo extends Component {
  refInputUserName = React.createRef();
  refInputNumberOfSeats = React.createRef();

  handleValidate = (e) => {
    const inputTarget = e.target;
    const inputTargetType = inputTarget.type;

    const messErr =
      inputTarget.parentElement.querySelector(".invalid-feedback");

    switch (inputTargetType) {
      case "text":
        if (inputTarget.value === "") messErr.style.display = "inline-block";
        else messErr.style.display = "none";
        break;

      default:
        if (inputTarget.value - 1 < 0) messErr.style.display = "inline-block";
        else messErr.style.display = "none";

        break;
    }
  };

  handleStartSelectingSeat = () => {
    // if (isEmpty(this.props.activeUser)) {
    const resultData = {
      name: this.refInputUserName.current.value,
      numberOfSeats: this.refInputNumberOfSeats.current.value * 1,
      bookedSeats: [],
    };

    const action = {
      type: "BOOKING_SEAT",
      payload: resultData,
    };

    if (resultData.name.length === 0 || resultData.numberOfSeats === 0) {
      alert("Hãy điền đầy đủ thông tin trước khi đặt vé!");
      action.payload = [];
    }

    this.refInputUserName.current.value = "";
    this.refInputNumberOfSeats.current.value = "";

    this.props.dispatch(action);
    // }
  };

  render() {
    return (
      <div id="formInfo" className="text-white text-start w-100 py-4">
        <div className="row">
          <div className="col col-8">
            <div className="form-info-group me-3">
              <label htmlFor="userName" className="form-label">
                Name <span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="userName"
                type="text"
                className="form-control bg-transparent text-white"
                ref={this.refInputUserName}
                onBlur={this.handleValidate}
              />
              <div className="invalid-feedback">Please enter name!</div>
            </div>
          </div>
          <div className="col col-4">
            <div className="form-info-group">
              <label htmlFor="numberOfSeats" className="form-label">
                Number of Seats <span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="numberOfSeats"
                type="number"
                className="form-control bg-transparent text-white"
                ref={this.refInputNumberOfSeats}
                onBlur={this.handleValidate}
              />
              <div className="invalid-feedback">
                Please enter number of seats
              </div>
            </div>
          </div>
          <div className="col col-4 py-4">
            <button
              className="btn btn-light"
              onClick={this.handleStartSelectingSeat}
            >
              Start selecting
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    usersList: state.usersList.usersList,
    activeUser: state.usersList.activeUser,
  };
};

export default connect(mapStateToProps)(FormInfo);
