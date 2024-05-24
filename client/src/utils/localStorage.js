export const save = (data, itemName) => {
	try {
		const serializedData = JSON.stringify(data)
		window.localStorage.setItem(itemName, serializedData)
	} catch (error) {
		console.log(error)
	}
}

export const load = itemName => {
	try {
		const serializedData = window.localStorage.getItem(itemName)
		if (serializedData === null) return undefined
		return JSON.parse(serializedData)
	} catch (error) {
		console.log(error)
		return undefined
	}
}
