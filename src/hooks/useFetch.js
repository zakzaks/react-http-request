import { useEffect, useState } from "react";

export default function useFetch(fetchFn, initialValue) {
	const [isfetching, setIsFetching] = useState();
	const [error, setError] = useState();
	const [fetchedData, setFetchData] = useState(initialValue);

	useEffect(() => {
		async function fetchData() {
			setIsFetching(true);
			try {
				const data = await fetchFn();
				setFetchData(data);
			} catch (error) {
				setError({ message: error.message || "Failed to fetch data." });
			}
			setIsFetching(false);
		}

		setIsFetching(false);
		fetchData();
	}, [fetchFn]);

	return {
		isfetching,
		fetchedData,
		setFetchData,
		error,
	};
}
