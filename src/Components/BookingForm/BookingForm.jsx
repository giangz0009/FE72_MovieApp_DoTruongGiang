import React, { Component, Fragment } from "react";
import FormInfo from "./FormInfo/FormInfo.jsx";
import TicketsBooking from "./TicketsBooking/TicketsBooking.jsx";
import { connect } from "react-redux/es/exports.js";
import isEmpty from "lodash.isempty";

export class BookingForm extends Component {
  mapUsersListAndActiveUserToJsx = () => {
    if (isEmpty(this.props.usersList) || isEmpty(this.props.activeUser)) return;
    const foundUserList = this.props.usersList.find(
      (user) => user.name === this.props.activeUser.name
    );

    if (!foundUserList) return;

    if (foundUserList.bookedSeats.length === 0) return;

    return (
      <>
        <td>{foundUserList.name}</td>
        <td>{foundUserList.numberOfSeats}</td>
        <td>
          {foundUserList.bookedSeats.map((seat, index) => (
            <span key={index} style={{ marginInline: "3px" }}>
              {seat}
            </span>
          ))}
        </td>
      </>
    );
  };
  render() {
    return (
      <div
        id="bookingForm"
        className="p-5 bg-opacity-50 bg-dark"
        style={{ width: "700px", margin: "0 auto" }}
      >
        <h5 className="fs-6 text-start" style={{ color: "#FD9843" }}>
          Fill The Required Details Below And Select Your Seats
        </h5>
        <FormInfo />
        <TicketsBooking />
        <table
          className="table table-light table-bordered"
          style={{
            borderColor: "grey",
            borderSpacing: "2px",
            borderCollapse: "separate",
          }}
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Number of Seats</th>
              <th>Seats</th>
            </tr>
          </thead>
          <tbody>
            <tr>{this.mapUsersListAndActiveUserToJsx()}</tr>
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  usersList: state.usersList.usersList,
  activeUser: state.usersList.activeUser,
});

export default connect(mapStateToProps)(BookingForm);
