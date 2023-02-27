import { useMemo, useState } from "react"
import { Paper, Slider, styled, Typography, sliderClasses } from "@mui/material"
import { formatRelative, isFuture } from "date-fns"
import Grid from "@mui/material/Unstable_Grid2"
import { Stack } from "@mui/system"

function DateSlider({
	minDate,
	maxDate,
	value,
	onChange,
}: {
	minDate: Date
	maxDate: Date
	value: [Date, Date]
	onChange: (newDates: Date[]) => void
}) {
	const [dateRangesInMilliseconds, setDateRangesInMilliseconds] = useState<number[]>(
		value.map(date => date.getTime())
	)

	function handleChange(_: Event, newValue: number | number[]) {
		setDateRangesInMilliseconds(newValue as number[])
		onChange((newValue as number[]).map(milliseconds => new Date(milliseconds)))
	}

	const marks = useMemo(
		() => [
			{
				value: maxDate.getTime(),
				label: "Now",
			},
			{
				value: minDate.getTime(),
				label: formatRelative(minDate.getTime(), new Date()),
			},
		],
		[minDate, maxDate]
	)

	return (
		<Paper>
			<Grid container direction={"column"} spacing={0} sx={{ padding: "0 24px 8px 24px" }}>
				<Grid>
					<Stack direction="row" justifyContent="space-between">
						<div
							style={{
								opacity: "0.25",
								position: "relative",
								top: "15px",
								right: "15px",
								transform: "scaleX(-1)",
							}}
						>
							<img src="bird-small.svg" />
						</div>
						<div style={{ opacity: "1", position: "relative", top: "15px", left: "15px" }}>
							<img src="bird-small.svg" />
						</div>
					</Stack>
				</Grid>
				<Grid>
					<Slider
						value={dateRangesInMilliseconds}
						onChange={handleChange}
						valueLabelDisplay="auto"
						aria-labelledby="date-slider"
						min={minDate.getTime()}
						max={maxDate.getTime()}
						valueLabelFormat={timeInMilliseconds =>
							isFuture(new Date(timeInMilliseconds))
								? "Now"
								: formatRelative(new Date(timeInMilliseconds), new Date())
						}
						marks={marks}
						sx={{
							width: "250px",
							'& .MuiSlider-markLabel[data-index="1"]': {
								left: "25px!important",
							},
						}}
					/>
				</Grid>
			</Grid>
		</Paper>
	)
}

export default DateSlider
