import { Task } from "@/types/task";
import { Weather } from "@/types/weather";

const ongoingFetches: { [location: string]: Promise<void> } = {};

export const ADD_TASK = "ADD_TASK";
export const DELETE_TASK = "DELETE_TASK";
export const TOGGLE_TASK_COMPLETION = "TOGGLE_TASK_COMPLETION";
export const FETCH_WEATHER_SUCCESS = "FETCH_WEATHER_SUCCESS";
export const FETCH_WEATHER_FAILURE = "FETCH_WEATHER_FAILURE";
export const UPDATE_TASK = "UPDATE_TASK";
export const LOGIN = "LOGIN";
export const REGISTER = "REGISTER";
export const SET_ACTIVE_DROPDOWN = "SET_ACTIVE_DROPDOWN";

export const addTask = (task: Task) => ({
  type: ADD_TASK,
  payload: task,
});

export const deleteTask = (taskId: string) => ({
  type: DELETE_TASK,
  payload: taskId,
});

export const toggleTaskCompletion = (taskId: string) => ({
  type: TOGGLE_TASK_COMPLETION,
  payload: taskId,
});

export const fetchWeatherSuccess = (location: string, weather: Weather) => ({
  type: FETCH_WEATHER_SUCCESS,
  payload: { location, weather },
});

export const fetchWeatherFailure = (location: string, error: string) => ({
  type: FETCH_WEATHER_FAILURE,
  payload: { location, error },
});

export const updateTask = (taskId: string, updatedFields: Partial<Task>) => ({
  type: UPDATE_TASK,
  payload: { taskId, updatedFields },
});

export const login = (username: string | null) => ({
  type: LOGIN,
  payload: username,
});

export const register = (user: { username: string; password: string; avatar: string }) => ({
  type: REGISTER,
  payload: user,
});

export const setActiveDropdown = (dropdownId: string | null) => ({
  type: SET_ACTIVE_DROPDOWN,
  payload: dropdownId,
});

export const fetchWeather = (location: string) => async (dispatch: any) => {
  if (location in ongoingFetches) {
    return ongoingFetches[location];
  }

  const fetchPromise = (async () => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
      if (!apiKey) {
        throw new Error("Weather API key is not configured");
      }
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${apiKey}&units=metric`
      );
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch weather data: ${response.status} - ${errorText}`);
      }
      const data = await response.json();
      const weather: Weather = {
        name: data.name,
        main: { temp: data.main.temp },
        weather: data.weather.map((w: any) => ({ description: w.description })),
      };
      dispatch(fetchWeatherSuccess(location, weather));
    } catch (error: any) {
      dispatch(fetchWeatherFailure(location, error.message || "Weather unavailable"));
    } finally {
      delete ongoingFetches[location];
    }
  })();

  ongoingFetches[location] = fetchPromise;
  return fetchPromise;
};