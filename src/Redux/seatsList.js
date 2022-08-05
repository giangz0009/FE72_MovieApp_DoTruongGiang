import seatsList from "./../Assets/ticketsList.json";

const initialize = {
  seatsList: seatsList,
};

const reducerSeatsList = (currState = initialize, action) => {
  switch (action.type) {
    case "BOOK_SEAT":
      const cloneSeatsList = [...currState.seatsList];

      const seatTypes = new Set(
        action.payload.map((seatNumber) => seatNumber.slice(0, 1))
      );

      const cloneFilterBySeatType = cloneSeatsList
        .filter((seat) =>
          Array.from(seatTypes).find((seatType) => seatType === seat.hang)
        )
        .reduce((curr, next) => {
          return [...curr, ...next.danhSachGhe];
        }, []);

      cloneFilterBySeatType.forEach((cloneFilter) => {
        action.payload.forEach((seat) => {
          cloneFilter.soGhe === seat && (cloneFilter.daDat = true);
        });
      });

      return { ...currState, seatsList: cloneSeatsList };
    default:
      return currState;
  }
};

export default reducerSeatsList;
