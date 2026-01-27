import { useState } from "react";
import ClassTable from "./pages/ClassTable";
import FacultyTable from "./pages/FacultyTable";
import RoomTable from "./pages/RoomTable";

export default function App() {
  const [view, setView] = useState("class");

  return (
    <>
      <nav>
        <button onClick={() => setView("class")}>Class</button>
        <button onClick={() => setView("faculty")}>Faculty</button>
        <button onClick={() => setView("room")}>Room</button>
      </nav>

      {view === "class" && <ClassTable />}
      {view === "faculty" && <FacultyTable />}
      {view === "room" && <RoomTable />}
    </>
  );
}
