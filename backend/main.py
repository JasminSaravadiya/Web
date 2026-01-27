from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from parser import parse_master_timetable
from timetable_engine import faculty_timetable, room_timetable
from urllib.parse import unquote

app = FastAPI()

# FIX: Added CORS so React can talk to Python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load data once at startup
df = parse_master_timetable("data/Master Time table.xlsx")

@app.get("/")
def root():
    return {"status": "CampusSync backend running"}

@app.get("/class")
def get_class():
    # Return all records
    return df.to_dict(orient="records")

@app.get("/class_list")
def get_class_list():
    # Helper to get list of unique batches for dropdown
    if "batch" in df.columns:
        return {"batches": list(df["batch"].unique())}
    return {"batches": []}

@app.get("/class/{batch_name}")
def get_specific_class(batch_name: str):
    # Filter by specific batch
    filtered = df[df["batch"] == batch_name]
    return filtered.to_dict(orient="records")

@app.get("/faculty/{name}")
def get_faculty(name: str):
    result = faculty_timetable(df, name)
    return result.to_dict(orient="records")

@app.get("/room/{room_no}")
def get_room(room_no: str):
    result = room_timetable(df, room_no)
    return result.to_dict(orient="records")

@app.get("/faculty/{name}")
def get_faculty(name: str):
    # Decode the name (e.g., "Prof.%20Sharma" -> "Prof. Sharma")
    decoded_name = unquote(name)
    result = faculty_timetable(df, decoded_name)
    return result.to_dict(orient="records")