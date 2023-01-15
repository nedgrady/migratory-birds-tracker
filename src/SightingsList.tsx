import { Sighting } from "./birdData"
import {
	CellContext,
	ColumnDefTemplate,
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table"
import { format } from "date-fns"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"

const columnHelper = createColumnHelper<Sighting>()

const columns = [
	columnHelper.accessor("source", {}),
	columnHelper.accessor("timestamp", {
		cell: info => format(info.getValue(), "dd/MM/yyyy"),
	}),
	columnHelper.accessor("location.description", {
		header: "Location",
	}),
]

export default function SightingList({ sightings }: { sightings: Sighting[] }) {
	const table = useReactTable({
		data: sightings,
		columns,
		getCoreRowModel: getCoreRowModel(),
	})

	return (
		<TableContainer>
			<Table>
				<TableHead>
					<TableRow>
						{table.getFlatHeaders().map(header => (
							<TableCell key={header.id} style={{ textTransform: "capitalize" }}>
								{flexRender(header.column.columnDef.header, header.getContext())}
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{table.getRowModel().rows.map(row => (
						<TableRow key={row.id}>
							{row.getVisibleCells().map(cell => (
								<TableCell key={cell.id}>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}
