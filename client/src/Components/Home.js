import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [events, setEvents] = useState(null);

  const logoutHelper = () => {
    localStorage.removeItem("user");
    navigate("../");
  };

  const fetchCalendarEvents = async () => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      console.error("No access token found. Please log in first.");
      return;
    }

    const response = await fetch(
      "https://www.googleapis.com/calendar/v3/calendars/primary/events",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const events = await response.json();
    console.log("Google Calendar Events:", events);
    setEvents(events.items);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    fetchCalendarEvents();
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <h3>Welcome, {user.name}</h3>
          <p>Email: {user.email}</p>
          <img src={user.picture} alt="Profile" />
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
      <button onClick={logoutHelper}>Logout</button>
      <table>
        <thead>
          <tr>
            <th>Event</th>
            <th>Date</th>
            <th>Time</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {events && events.map((event) => (
            <tr key={event.id}>
              <td>{event.summary}</td>
              <td>{new Date(event.start.dateTime).toLocaleDateString()}</td>
              <td>{new Date(event.start.dateTime).toLocaleTimeString()}</td>
              <td>{event.location || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
