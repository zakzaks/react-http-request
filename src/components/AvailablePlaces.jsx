import { useState, useEffect } from "react";
import Places from "./Places.jsx";
import ErrorPage from "./ErrorPage.jsx";
import { sortPlacesByDistance } from "../loc.js";

export default function AvailablePlaces({ onSelectPlace }) {
	const [isFetching, setIsFetching] = useState(false);
	const [availablePlaces, setAvailablePlaces] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function fetchPlaces() {
			try {
				setIsFetching(true);
				const response = await fetch("http://localhost:3000/places");
				const data = await response.json();
				if (!response.ok) {
					throw new Error(data.message || "Failed to fetch places.");
				}

				navigator.geolocation.getCurrentPosition((position) => {
					const sortedPlaces = sortPlacesByDistance(
						data.places,
						position.coords.latitude,
						position.coords.longitude,
					);
					setAvailablePlaces(sortedPlaces);
				});
			} catch (error) {
				setError({
					message: error.message || "An error occurred while fetching places.",
				});
			}
			setIsFetching(false);
		}

		fetchPlaces();
	}, []);

	if (error) {
		return <ErrorPage title="You got an error" message={error.message} />;
	}

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
