import React from "react";
import "@ericz1803/react-google-calendar/index.css";
import Calendar from "@ericz1803/react-google-calendar";
import Dashboard from "../components/Dashboard";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";

// ID for WAI public calendar
const calendarId = "16gnvov94ele73k1e7ekbaqr08@group.calendar.google.com";
const calendars = [{ calendarId, color: "#207f76" }]; // Color set to WAI Green

const calendarStyles = {
  calendar: {
    borderWidth: 5,
    borderRadius: 10,
    borderColor: "#f6f6f6",
  },
  today: {
    backgroundColor: "#ececec",
  },
};

interface eventsProps {}

const Events: React.FC<eventsProps> = ({}) => {
  return (
    <Dashboard title="Events">
      <Calendar
        calendars={calendars}
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY}
        styles={calendarStyles}
      />
    </Dashboard>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Events);
