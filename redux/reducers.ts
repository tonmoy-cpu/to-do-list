import { Task } from "@/types/task";
import { Weather } from "@/types/weather";
import {
  ADD_TASK,
  DELETE_TASK,
  TOGGLE_TASK_COMPLETION,
  FETCH_WEATHER_SUCCESS,
  FETCH_WEATHER_FAILURE,
  UPDATE_TASK,
  LOGIN,
  REGISTER,
  SET_ACTIVE_DROPDOWN, // New action
} from "./actions";

interface AppState {
  tasks: Task[];
  weather: { [location: string]: Weather | { error: string } };
  auth: { user: string | null; users: { username: string; password: string; avatar: string }[] };
  activeDropdown: string | null; // New field
}

const initialState: AppState = {
  tasks: [],
  weather: {},
  auth: { user: null, users: [] }, // Ensure users is always an array
  activeDropdown: null, // Initially, no dropdown is open
};

const appReducer = (state = initialState, action: any): AppState => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case TOGGLE_TASK_COMPLETION:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        ),
      };
    case FETCH_WEATHER_SUCCESS:
      return {
        ...state,
        weather: {
          ...state.weather,
          [action.payload.location]: action.payload.weather,
        },
      };
    case FETCH_WEATHER_FAILURE:
      return {
        ...state,
        weather: {
          ...state.weather,
          [action.payload.location]: { error: action.payload.error },
        },
      };
    case UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.taskId
            ? { ...task, ...action.payload.updatedFields }
            : task
        ),
      };
    case LOGIN:
      return {
        ...state,
        auth: { ...state.auth, user: action.payload },
      };
    case REGISTER:
      // Ensure state.auth.users is always an array, even if undefined or malformed
      const currentUsers = Array.isArray(state.auth.users) ? state.auth.users : [];
      return {
        ...state,
        auth: {
          ...state.auth,
          users: [...currentUsers, action.payload],
        },
      };
    case SET_ACTIVE_DROPDOWN:
      return {
        ...state,
        activeDropdown: action.payload,
      };
    default:
      return state;
  }
};

export default appReducer;