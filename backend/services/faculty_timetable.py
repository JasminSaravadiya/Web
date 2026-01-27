def generate_faculty_timetable(df, faculty_name):
    df["Faculty"] = df["Faculty"].astype(str)
    return df[df["Faculty"] == str(faculty_name)]