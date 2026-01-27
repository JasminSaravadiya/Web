def generate_room_timetable(df, room_no):
    if "room" not in df.columns:
        raise Exception("Column 'room' not found in Excel")

    df["room"] = df["room"].astype(str).str.strip()
    return df[df["room"] == str(room_no)]
