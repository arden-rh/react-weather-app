/**
 * Open Weather Map API
 */
import axios from 'axios'
import { ICurrentWeather } from '../types'

const API_KEY = import.meta.env.VITE_APP_OWM_API_KEY
const BASE_URL = "https://api.openweathermap.org/data/2.5"

/**
 * Get current weather for a city.
 *
 * @param {string} query City to get current weather for
 */
export const getCurrentWeather = async (query: string) => {

	try {
		const response = await axios.get<ICurrentWeather>(`${BASE_URL}/weather?q=${query}&units=metric&appid=${API_KEY}`)
		await new Promise(r => setTimeout(r, 1500))

		if(response.status !== 200) {
			throw new Error(`${response.status, response.statusText}`)
		}

		return response.data

	} catch (e: any) {
		return e.response.data
	}

}


/**
 * Get current weather for a city.
 *
 * @param {string} query City to get current weather for
 */
const getCurrentWeatherFetch = async (query: string) => {
	// get weather for query from OpenWeatherMap API
	const response = await fetch(`${BASE_URL}/weather?q=${query}&units=metric&appid=${API_KEY}`)

	// convert response from JSON
	const data = await response.json()

	// fake slow api
	// await new Promise(r => setTimeout(r, 1500))

	// return current weather
	return data
}
