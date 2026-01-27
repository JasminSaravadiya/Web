import React from "react";

const Timetable = ({ lectures }) => {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  // Sort Times Correctly
  const uniqueTimes = [...new Set(lectures.map((l) => l.time))].sort((a, b) => {
    const parseTime = (timeStr) => {
      if (!timeStr) return 0;
      const startTime = timeStr.split("to")[0].trim();
      const [hoursStr, minutesStr] = startTime.split(":");
      let hours = parseInt(hoursStr);
      if (hours < 8) hours += 12; // Handle 1 PM vs 10 AM
      return hours * 60 + (parseInt(minutesStr) || 0);
    };
    return parseTime(a) - parseTime(b);
  });

  // --- FIX: Use filter instead of find to get ALL classes ---
  const getClasses = (day, time) => {
    return lectures.filter((l) => l.day === day && l.time === time);
  };

  if (!lectures || lectures.length === 0) return <p>No data available</p>;

  return (
    <div style={{ padding: "20px", fontFamily: "Times New Roman, serif" }}>
      
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h2 style={{ margin: "0", textTransform: "uppercase" }}>Gujarat Technological University</h2>
        <h3 style={{ margin: "5px 0", fontWeight: "normal" }}>School of Engineering and Technology</h3>
        <p style={{ margin: "5px 0" }}>Timetable, A.Y.-2024-25 (EVEN TERM)</p>
      </div>

      <table className="pdf-table">
        <thead>
          <tr>
            <th style={{ width: "50px" }}>No.</th>
            <th style={{ width: "120px" }}>Time</th>
            {days.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {uniqueTimes.map((time, index) => {
            const isBreak = time.toUpperCase().includes("RECESS") || time.toUpperCase().includes("BREAK");

            return (
              <tr key={time}>
                <td style={{ fontWeight: "bold" }}>{isBreak ? "-" : index + 1}</td>
                <td style={{ whiteSpace: "nowrap", fontSize: "12px" }}>{time}</td>

                {days.map((day) => {
                  // Get ALL sessions for this slot
                  const sessions = getClasses(day, time);
                  
                  return (
                    <td key={day} className={sessions.length > 0 ? "filled" : "empty"}>
                      {/* Stack multiple sessions vertically */}
                      {sessions.length > 0 ? (
                        sessions.map((session, i) => (
                          <div key={i} style={{ borderBottom: i < sessions.length - 1 ? "1px dashed #ccc" : "none", paddingBottom: "4px", marginBottom: "4px" }}>
                            <div style={{ fontWeight: "bold", fontSize: "14px" }}>
                              {session.subject}
                            </div>
                            {session.faculty && session.faculty !== "Unknown" && (
                               <div style={{ fontSize: "11px", fontStyle: "italic" }}>
                                 ({session.faculty})
                               </div>
                            )}
                            {session.room && session.room !== "TBD" && (
                              <div style={{ fontSize: "11px", fontWeight: "bold", color: "#444" }}>
                                [{session.room}]
                              </div>
                            )}
                            {/* Show Batch Name if viewing Faculty Timetable to know which class they are teaching */}
                            <div style={{ fontSize: "10px", color: "#666" }}>
                                {session.batch}
                            </div>
                          </div>
                        ))
                      ) : (
                        "-"
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Timetable;