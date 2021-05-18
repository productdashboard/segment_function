async function onTrack(event, settings) {
	const endpoint = 'https://segment.impactfactor.io/event';
	let data = {
		event_type: `${event.type}.${event.event}`,
		timestamp: Math.round(new Date(event.timestamp).getTime() / 1000),
		uid: event.userId,
		source_id: settings.sourceId
	};
	let response;
	try {
		response = await fetch(endpoint, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
	} catch (error) {
		// Retry on connection error
		throw new RetryError(error.message);
	}

	if (response.status >= 500 || response.status === 429) {
		// Retry on 5xx (server errors) and 429s (rate limits)
		throw new RetryError(`Failed with ${response.status}`);
	}
}

async function onPage(event, settings) {
	const endpoint = 'https://segment.impactfactor.io/event';
	let data = {
		event_type: `${event.type}.${event.name}`,
		timestamp: Math.round(new Date(event.timestamp).getTime() / 1000),
		uid: event.userId,
		source_id: settings.sourceId
	};
	let response;
	try {
		response = await fetch(endpoint, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
	} catch (error) {
		// Retry on connection error
		throw new RetryError(error.message);
	}

	if (response.status >= 500 || response.status === 429) {
		// Retry on 5xx (server errors) and 429s (rate limits)
		throw new RetryError(`Failed with ${response.status}`);
	}
}
