import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

// Get list of all available classes
export const getBatchList = () => 
  axios.get(`${BASE_URL}/class_list`);

// Get timetable for a specific class
export const getClassTable = (batch) =>
  axios.get(`${BASE_URL}/class/${batch}`);

export const getFacultyTable = (name) =>
  axios.get(`${BASE_URL}/faculty/${name}`);

export const getRoomTable = (room) =>
  axios.get(`${BASE_URL}/room/${room}`);