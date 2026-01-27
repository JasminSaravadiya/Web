import { useEffect, useState } from "react";
import { getClassTable, getBatchList } from "../api";
import Timetable from "../components/Timetable"; // ✅ This points to the correct folder

export default function ClassTable() {
  const [data, setData] = useState([]);
  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState("");

  // Load Dropdown Options
  useEffect(() => {
    getBatchList().then(res => {
        setBatches(res.data.batches);
    });
  }, []);

  // Fetch Table when Dropdown changes
  useEffect(() => {
    if(selectedBatch) {
        getClassTable(selectedBatch).then(res => setData(res.data));
    }
  }, [selectedBatch]);

  return (
    <div>
      <h2>Class Timetable</h2>
      <select 
        onChange={(e) => setSelectedBatch(e.target.value)} 
        value={selectedBatch}
        style={{ padding: "10px", marginBottom: "20px" }}
      >
        <option value="">-- Select Class --</option>
        {batches.map(b => <option key={b} value={b}>{b}</option>)}
      </select>

      {/* Reuse the Timetable Component */}
      <Timetable lectures={data} />
    </div>
  );
}