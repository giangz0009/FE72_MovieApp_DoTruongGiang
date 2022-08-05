import "./App.css";
import BookingForm from "./Components/BookingForm/BookingForm.js";

function App() {
  return (
    <div className="App">
      <div className="container d-flex flex-column justify-content-between h-100">
        <header>
          <h1 className="text-white my-5">MOVIE SEAT SELECTION</h1>
        </header>
        <main>
          <BookingForm></BookingForm>
        </main>
        <footer>
          <p className="text-white fw-bold py-5">
            &copy; 2018 Movie Seat Selection . All Rights Reserved | Design by
            W3layouts
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
