// Thanks Chat GPT
export function scaleDate(dateToScale: Date, minDate: Date, maxDate: Date, minScale: number, maxScale: number) {
	const dateRange = maxDate.getTime() - minDate.getTime()
	const scaledRange = maxScale - minScale
	const dateDiff = dateToScale.getTime() - minDate.getTime()
	const scaleDiff = (dateDiff / dateRange) * scaledRange
	return minScale + scaleDiff
}
