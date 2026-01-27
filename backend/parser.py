import pandas as pd
import re

def parse_master_timetable(path):
    # Read file without header initially
    df_raw = pd.read_excel(path, header=None)
    
    # 1. IDENTIFY BATCHES & HANDLE MERGED HEADERS
    program_row = df_raw.iloc[3].ffill()
    semester_row = df_raw.iloc[4].fillna("")
    
    batch_map = {} 
    for col_idx in range(2, len(df_raw.columns)):
        prog = str(program_row[col_idx]).strip()
        sem = str(semester_row[col_idx]).strip()
        if prog != "nan" and prog != "":
            batch_name = f"{prog} {sem}".strip()
            batch_map[col_idx] = batch_name

    # 2. EXTRACT DATA ROWS
    data_df = df_raw.iloc[5:].copy()
    
    # Handle Merged Cells (Forward Fill Day & Time)
    data_df[0] = data_df[0].ffill()
    data_df[1] = data_df[1].ffill()

    records = []

    for _, row in data_df.iterrows():
        day = str(row[0]).strip() 
        time = str(row[1]).strip() 
        
        if day == "nan" or time == "nan": continue 
        
        for col_idx, batch_name in batch_map.items():
            raw_cell = str(row[col_idx]).strip()
            
            # Skip empty cells
            if raw_cell == "nan" or raw_cell == "" or "BREAK" in raw_cell.upper():
                continue

            # --- FIX: Split Multiple Entries by Newline ---
            # This handles "B1-Lab... \n B2-Lab..." as separate lectures
            entries = raw_cell.split('\n')

            for entry in entries:
                entry = entry.strip()
                if not entry: continue

                # Improved Regex to find Faculty (Initials in Brackets)
                # Finds "(DKU)" or "(S.B.J)"
                faculty_match = re.search(r'\(([A-Z.\s]+)\)', entry)
                faculty = faculty_match.group(1).strip() if faculty_match else "Unknown"

                # Find Room (3 digits at end, or 'Lab')
                room_match = re.search(r'(\d{3}|Lab\s?\w*)$', entry, re.IGNORECASE)
                room = room_match.group(1).strip() if room_match else "TBD"

                # Subject is whatever is left
                subject = entry
                if faculty != "Unknown": 
                    subject = subject.replace(f"({faculty})", "")
                if room != "TBD":
                    subject = subject.replace(room, "")
                
                subject = subject.strip(" -")

                records.append({
                    "batch": batch_name, 
                    "day": day,
                    "time": time,
                    "subject": subject,
                    "faculty": faculty,
                    "room": room
                })

    return pd.DataFrame(records)