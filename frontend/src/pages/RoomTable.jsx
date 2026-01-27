import { useEffect, useState } from "react";
import { getRoomTable } from "../api";

export default function RoomTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getRoomTable("203").then(res => setData(res.data));
  }, []);

  return (
    <>
      <h2>Room Timetable (203)</h2>
      <table>
        <thead>
          <tr>
            <th>Day</th>
            <th>Time</th>
            <th>Subject</th>
            <th>Faculty</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              <td>{row.day}</td>
              <td>{row.time}</td>
              <td>{row.subject}</td>
              <td>{row.faculty}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
