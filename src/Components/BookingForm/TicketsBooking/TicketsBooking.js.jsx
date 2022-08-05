import React, { Component, Fragment } from "react";
import style from "./TicketsBooking.module.css";
import clsx from "clsx";
import { connect } from "react-redux/es/exports.js";

import isEmpty from "lodash.isempty";

const {
  smallBox,
  smallBoxGreen,
  smallBoxRed,
  smallBoxEmpty,
  seats,
  seatsBooked,
} = style;

export class TicketsBooking extends Component {
  //   mapSeatsListToJsx = () => {
  //     const halfSeatsListLength = Math.floor(this.props.seatsList.length / 2);
  //     return this.props.seatsList.map((seat, indexMap) => {
  //       const seatsNumber = seat.danhSachGhe;
  //       const seatsNumberLength = Math.floor(seatsNumber.length / 2);
  //       const resultJsx = (
  //         <tr key={indexMap}>
  //           <td>{seat.hang}</td>

  //           {seatsNumber.map((seatNumber, index) => {
  //             const resultSeatNumberJsx = (
  //               <td className={clsx(seats)} key={index}>
  //                 <input
  //                   type="checkbox"
  //                   value={`${seat.hang}${seatNumber.soGhe}`}
  //                 />
  //               </td>
  //             );

  //             if (!seat.hang)
  //               return index === seatsNumberLength ? (
  //                 <Fragment key={index}>
  //                   <th></th>
  //                   <th>{seatNumber.soGhe}</th>
  //                 </Fragment>
  //               ) : (
  //                 <th key={index}>{seatNumber.soGhe}</th>
  //               );
  //             return index === seatsNumberLength ? (
  //               <Fragment key={index}>
  //                 <td></td>
  //                 {resultSeatNumberJsx}
  //               </Fragment>
  //             ) : (
  //               resultSeatNumberJsx
  //             );
  //           })}
  //         </tr>
  //       );
  //       return indexMap - 1 === halfSeatsListLength ? (
  //         <Fragment key={indexMap}>
  //           <tr>
  //             <td></td>
  //           </tr>
  //           {resultJsx}
  //         </Fragment>
  //       ) : (
  //         resultJsx
  //       );
  //     });
  //   };

  handleSubmit = () => {
    // console.log(isEmpty(this.props.activeUser));
    // if (isEmpty(this.props.activeUser)) {

    if (this.props.activeUser.numberOfSeats > 0)
      return alert("Vui lòng chọn đủ số ghế đã đặt!");

    const action = {
      type: "BOOK_SEAT",
      payload: this.props.activeUser.bookedSeats,
    };

    this.props.dispatch(action);
    this.props.dispatch({
      type: "USER_BOOK_SEAT",
      payload: this.props.activeUser,
    });
    this.props.dispatch({ type: "RESET_ACTIVE_USER" });
    // }
  };

  handleOnBooking = (e) => {
    const currSeat = e.target;

    const action = {
      type: "CHOOSE_SEAT",
      payload: currSeat.value,
    };

    this.props.dispatch(action);
  };

  mapSeatsListToJsx = () => {
    return this.props.seatsList.map((seat, index) => {
      return (
        <tr key={index}>
          <td>{seat.hang}</td>

          {seat.danhSachGhe.map((seatNumber, indexNumber) => {
            if (!seat.hang)
              return <td key={indexNumber}>{seatNumber.soGhe}</td>;
            return (
              <td
                className={clsx(seats, seatNumber.daDat ? seatsBooked : "")}
                key={indexNumber}
              >
                <input
                  type="checkbox"
                  value={`${seatNumber.soGhe}`}
                  disabled={seatNumber.daDat || isEmpty(this.props.activeUser)}
                  checked={(() => {
                    if (seatNumber.daDat) return true;

                    if (isEmpty(this.props.activeUser)) return false;
                    else
                      return this.props.activeUser.bookedSeats.includes(
                        seatNumber.soGhe
                      );
                  })()}
                  onClick={this.handleOnBooking}
                />
              </td>
            );
          })}
        </tr>
      );
    });
  };
  render() {
    const activeUser = this.props.activeUser;
    return (
      <div>
        <ul className="text-start">
          <li className={clsx(smallBox, smallBoxGreen)}>Selected Seat</li>
          <li className={clsx(smallBox, smallBoxRed)}>Reserved Seat</li>
          <li className={clsx(smallBox, smallBoxEmpty)}>Empty Seat</li>
        </ul>
        {isEmpty(activeUser) ? (
          ""
        ) : (
          <p
            className="d-inline-block text-dark p-2"
            style={{ backgroundColor: "rgb(253, 152, 67)" }}
          >
            Please Select your Seats NOW!
          </p>
        )}
        <table
          id={clsx(style.seatsBlock)}
          className="table text-white table-borderless"
        >
          <tbody>{this.mapSeatsListToJsx()}</tbody>
        </table>
        <h3
          className="text-white py-4 mt-5"
          style={{ backgroundColor: "rgb(253, 152, 67)" }}
        >
          SCREEN THIS WAY
        </h3>
        <button className="btn btn-light my-4" onClick={this.handleSubmit}>
          Confirm Selection
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    seatsList: state.seatsList.seatsList,
    activeUser: state.usersList.activeUser,
  };
};

export default connect(mapStateToProps)(TicketsBooking);
