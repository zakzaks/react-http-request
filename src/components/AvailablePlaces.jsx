import { useState, useEffect } from "react";
import Places from "./Places.jsx";

export default function AvailablePlaces({ onSelectPlace }) {
	const [isFetching, setIsFetching] = useState(false);
	const [availablePlaces, setAvailablePlaces] = useState([]);

	useEffect(() => {
		async function fetchPlaces() {
			setIsFetching(true);
			const response = await fetch("http://localhost:3000/places");
			const data = await response.json();
			setAvailablePlaces(data.places);
			setIsFetching(false);
		}

		fetchPlaces();
	}, []);

	return (
		<Places
			title="Available Places"
			places={availablePlaces}
			isLoading={isFetching}
			loadingText="Fetching data..."
			fallbackText="No places available."
			onSelectPlace={onSelectPlace}
		/>
	);
}
