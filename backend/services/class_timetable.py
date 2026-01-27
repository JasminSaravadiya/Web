def generate_class_timetable(df, class_name):
    df["Class"] = df["Class"].astype(str)
    return df[df["Class"] == str(class_name)]