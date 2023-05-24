import React, { useState } from 'react'

interface IProps {
	onNewSearch: (city: string) => void
}

const SearchCity: React.FC<IProps> = ({ onNewSearch }) => {

	const [cityName, setCityName] = useState("")

	const city = cityName.trim()

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		onNewSearch(cityName)

		setCityName("")
	}

	return (
		<div id="search-wrapper">
			<form onSubmit={handleSubmit} id="search-form">
				<div className="input-group">
					<input
						type="text"
						className="form-control"
						placeholder="Enter city to search for" aria-label="City" aria-details="Search for city to show current weather for."
						onChange={e => {setCityName(e.target.value)}}
						value={cityName}
					/>

					<button
						disabled={!city || city.length < 3}
						type="submit"
						className="btn btn-success"
					>🔍</button>
				</div>
				{city.length > 0 && city.length < 3 && (
					<div className="form-text text-warning mb-3">Title has to be at least 3 chars.</div>
				)}
			</form>
		</div>
	)
}

export default SearchCity
