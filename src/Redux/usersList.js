import isEmpty from "lodash.isempty";

const initialize = {
  usersList: [],
  activeUser: {},
};

const reducerUsersList = (currState = initialize, action) => {
  switch (action.type) {
    case "BOOKING_SEAT": {
      const cloneActiveUser = { ...action.payload };

      return { ...currState, activeUser: cloneActiveUser };
    }

    // const cloneUsersList = [...currState.usersList];
    // const { name, numberOfSeats } = { ...action.payload };

    // const foundUser = cloneUsersList.find((user) => user.name === name);

    // if (foundUser) {
    //   foundUser.numberOfSeats += numberOfSeats;
    //   currState.activeUser = { ...action.payload, bookedSeats: [] };
    // } else {
    //   cloneUsersList.push({
    //     ...action.payload,
    //     bookedSeats: [],
    //   });
    //   currState.activeUser = { ...action.payload, bookedSeats: [] };
    // }

    // return { ...currState, usersList: cloneUsersList };

    case "CHOOSE_SEAT":
      const cloneActiveUser = { ...currState.activeUser };

      let foundPOS;
      const foundSeat = cloneActiveUser.bookedSeats.find((seat, index) => {
        foundPOS = index;
        return seat === action.payload;
      });

      if (foundSeat) {
        cloneActiveUser.numberOfSeats++;
        cloneActiveUser.bookedSeats.splice(foundPOS, 1);
      } else if (cloneActiveUser.numberOfSeats > 0) {
        cloneActiveUser.numberOfSeats--;
        cloneActiveUser.bookedSeats.push(action.payload);
      }

      return { ...currState, activeUser: cloneActiveUser };

    case "USER_BOOK_SEAT": {
      const cloneUsersList = [...currState.usersList];

      let foundByName;

      if (isEmpty(cloneUsersList)) {
        return {
          ...currState,
          usersList: [
            {
              ...action.payload,
              numberOfSeats: action.payload.bookedSeats.length,
            },
          ],
        };
      } else {
        foundByName = cloneUsersList.find(
          (user) => user.name === action.payload.name
        );

        if (!foundByName)
          return {
            ...currState,
            usersList: [
              {
                ...action.payload,
                numberOfSeats: action.payload.bookedSeats.length,
              },
            ],
          };

        foundByName.bookedSeats.push(...action.payload.bookedSeats);
        foundByName.numberOfSeats += action.payload.bookedSeats.length;

        return { ...currState, usersList: cloneUsersList };
      }
    }

    case "RESET_ACTIVE_USER":
      return { ...currState, activeUser: {} };
    default:
      return currState;
  }
};

export default reducerUsersList;
