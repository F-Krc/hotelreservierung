import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import {
  TextField,
  Button,
  Container,
  Paper,
  Typography,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";

const initialForm = {
  guestName: "",
  room: "",
  checkInDate: "",
  checkOutDate: "",
};
const Reservation = () => {
  const { loggedInUser, isLoggedIn } = useContext(UserContext);
  const [reservations, setReservations] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [selectedReservation, setSelectedReservation] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get("/api/rooms");
        setRooms(response.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  //  console.log(rooms);

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedReservation) {
      await handleUpdateSubmit();
    } else {
      try {
        if (isLoggedIn) {
          const response = await axios.post(
            `/api/reservations/${loggedInUser._id}`,
            formData
          );
          console.log("Reservation added:", response.data);
          setFormData(initialForm);
          fetchReservations();
        }
      } catch (error) {
        console.error("Error adding reservation:", error);
      }
    }
  };

  const fetchReservations = async () => {
    try {
      if (isLoggedIn) {
        const response = await axios.get(
          `/api/reservations/${loggedInUser._id}`
        );
        setReservations(response.data);
      }
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, [isLoggedIn]);

  const handleUpdate = (reservation) => {
    setSelectedReservation(reservation);
    setFormData({
      guestName: reservation.guestName,
      room: reservation.room,
      checkInDate: reservation.checkInDate,
      checkOutDate: reservation.checkOutDate,
    });
  };

  const handleUpdateSubmit = async () => {
    try {
      const response = await axios.put(
        `/api/reservations/${selectedReservation._id}`,
        formData
      );
      // console.log("Reservation updated:", response.data);
      setFormData(initialForm);
      setSelectedReservation(null);
      fetchReservations();
    } catch (error) {
      console.error("Error updating reservation:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/reservations/${id}`);
      fetchReservations();
    } catch (error) {
      console.error("Error deleting reservation:", error);
    }
  };

  return (
    <Container maxWidth="md" className="reservation-guests">
      <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
        <Typography variant="h5" gutterBottom>
          {selectedReservation ? "Update Reservation" : "Add Reservation"}
        </Typography>
        <form onSubmit={handleSubmit}>
          {/* Guest Name */}
          <TextField
            fullWidth
            label="Guest Name"
            name="guestName"
            value={formData.guestName}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          />

          {/* Room Type */}
          <InputLabel htmlFor="room">Room Type</InputLabel>
          <Select
            fullWidth
            labelId="room"
            name="room"
            value={formData.room}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          >
            <MenuItem value="">
              <em>Select a room</em>
            </MenuItem>
            {rooms.map((room) => (
              <MenuItem key={room._id} value={room._id}>
                {room.roomType}
              </MenuItem>
            ))}
          </Select>

          {/* Check-in Date */}
          <InputLabel htmlFor="checkInDate">Check-in Date</InputLabel>
          <TextField
            fullWidth
            name="checkInDate"
            type="date"
            value={formData.checkInDate}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          />

          {/* Check-out Date */}
          <InputLabel htmlFor="checkOutDate">Check-out Date</InputLabel>
          <TextField
            fullWidth
            name="checkOutDate"
            type="date"
            value={formData.checkOutDate}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          />

          <Button type="submit" variant="contained" color="primary">
            {selectedReservation ? "Update Reservation" : "Add Reservation"}
          </Button>
        </form>
      </Paper>
      <div>
        <h2 className="reservation-title">Reservations</h2>
        {isLoggedIn &&
          reservations.map((reservation) => (
            <div key={reservation._id} className="reservation-item">
              <div className="guestName">
                <p>Guest Name: {reservation.guestName}</p>
                <p>
                  Room Type:{" "}
                  {rooms.find((item) => item._id === reservation.room).roomType}
                </p>
                <p>
                  Check-in Date:{" "}
                  {new Date(reservation.checkInDate).toLocaleDateString(
                    "en-GB"
                  )}
                </p>
                <p>
                  Check-out Date:{" "}
                  {new Date(reservation.checkOutDate).toLocaleDateString(
                    "en-GB"
                  )}
                </p>
              </div>

              <button
                onClick={() => handleUpdate(reservation)}
                className="reservation-update-button"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(reservation._id)}
                className="reservation-delete-button"
              >
                Delete
              </button>
            </div>
          ))}
      </div>
    </Container>
  );
};

export default Reservation;
