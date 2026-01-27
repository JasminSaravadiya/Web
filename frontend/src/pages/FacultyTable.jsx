import { useState } from "react";
import { getFacultyTable } from "../api";
import Timetable from "../components/Timetable"; // ✅ Correct

export default function FacultyTable() {
  const [data, setData] = useState([]);
  const [searchName, setSearchName] = useState("");

  const handleSearch = () => {
    if(searchName) {
        getFacultyTable(searchName).then(res => setData(res.data));
    }
  };

  return (
    <div>
      <h2>Faculty Search</h2>
      <div style={{ marginBottom: "20px" }}>
          <input 
            type="text" 
            placeholder="Enter Faculty Initials (e.g., DKU)" 
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            style={{ padding: "8px" }}
          />
          <button onClick={handleSearch} style={{ marginLeft: "10px" }}>Search</button>
      </div>

      <Timetable lectures={data} />
    </div>
  );
}