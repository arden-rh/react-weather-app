import { useState } from 'react'
import Forecast from './components/Forecast'
import SearchCity from './components/SearchCity'
import { getCurrentWeather } from './services/owmapi'
import { ICurrentWeather } from './types'
import Airplane from './assets/images/747.svg'
import './assets/scss/App.scss'

function App() {

	const [error, setError] = useState(false)
	const [errorMsg, setErrorMsg] = useState({status: 0, message: ""})
	const [loading, setLoading] = useState(false)
	const [weatherData, setWeatherData] = useState<ICurrentWeather | null>(null)

	const newSearch = async (city: string) => {

		setError(false)
		setLoading(true)
		const data = await getCurrentWeather(city)

		if (data.cod !== 200) {
			setError(true)
			setErrorMsg({
				status: data.cod,
				message: data.message
			})
			setLoading(false)
			return
		}

		setLoading(false)
		setWeatherData(data)
	}

	return (
		<div id="app" className="container">
			<SearchCity onNewSearch={newSearch} />

			{loading && <img src={Airplane} alt="flying airplane" />}

			{error && <div className='alert alert-warning'>Something went wrong: {errorMsg.status} <span className='text-capitalize'>{errorMsg.message}</span></div>}

			{weatherData && !loading && !error && <Forecast data={weatherData} />}
		</div>
	)
}

export default App
