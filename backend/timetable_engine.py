def class_timetable(df):
    return df

def faculty_timetable(df, faculty_name):
    # Fix: Convert both to lowercase strings to make search reliable
    # This allows "dku" to find "DKU", "Prof. DKU", or "DKU, AKM"
    
    search_term = str(faculty_name).lower().strip()
    
    # Filter rows where the 'faculty' column CONTAINS the search term
    # na=False ensures we don't crash on empty rows
    result = df[df["faculty"].str.lower().str.contains(search_term, na=False)]
    
    return result

def room_timetable(df, room_no):
    # Same logic for room: Search for "203" inside "Lab 203"
    search_term = str(room_no).lower().strip()
    result = df[df["room"].str.lower().str.contains(search_term, na=False)]
    
    return result