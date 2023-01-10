import { Sighting } from "./birdData";
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table'
import { format } from "date-fns";

const columnHelper = createColumnHelper<Sighting>()

const columns = [
	columnHelper.accessor('source', {}),
	columnHelper.accessor('timestamp', {
		cell: info => format(info.getValue(), "dd/MM/yyyy")
	}),
	columnHelper.accessor('location.description', {
		header: "Location"
	}),
]

export default function SightingList({ sightings }: { sightings: Sighting[] }) {

	const table = useReactTable({
		data: sightings,
		columns,
		getCoreRowModel: getCoreRowModel(),
	})

	return <table>
		<thead>
			<tr>
				{table.getFlatHeaders().map(header =>
					<th key={header.id} style={{textTransform: "capitalize", minWidth: "8rem"}}>
						{flexRender(header.column.columnDef.header, header.getContext())}
					</th>
				)}
			</tr>
		</thead>
		<tbody>
			{table.getRowModel().rows.map(row => (
				<tr key={row.id}>
					{row.getVisibleCells().map(cell => (
						<td key={cell.id}>
							{flexRender(cell.column.columnDef.cell, cell.getContext())}
						</td>
					))}
				</tr>
			))}
		</tbody>
	</table>
}