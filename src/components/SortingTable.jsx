import { useMemo, useState } from 'react';
import {
    useReactTable,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,

} from '@tanstack/react-table'
import dataJSON from './DATA.json'
import { columnDef } from './columns'

export const SortingTable = () => {

    const finalData = useMemo(() => dataJSON, [])
    const finalColumnDef = useMemo(() => columnDef, [])

    const [sorting, setSorting] = useState([]);

    const tableInstance = useReactTable({
        columns: finalColumnDef,
        data: finalData,

        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),

        state: {
            sorting: sorting,

        },

        onSortingChange: setSorting,


    })
    console.log('test: ', tableInstance.getHeaderGroups())
    return (
        <table>
            <thead>
                {tableInstance.getHeaderGroups().map((headerEl) => (
                    <tr key={headerEl.id}>
                        {
                            headerEl.headers.map(columEl => (
                                <th
                                    key={columEl.id}
                                    colSpan={columEl.colSpan}
                                    onClick={columEl.column.getToggleSortingHandler()}

                                >
                                    {columEl.isPlaceholder
                                        ? null
                                        : flexRender(
                                            columEl.column.columnDef.header,
                                            columEl.getContext()
                                        )}
                                    {/* Codigo para Up y Down */}
                                    {
                                        { asc: " ⬆️", desc: "⬇️" }[columEl.column.getIsSorted() ?? null]
                                    }
                                </th>
                            ))}
                    </tr>
                ))}
            </thead>
            <tbody>
                {
                    tableInstance.getRowModel().rows.map(rowEl => (
                        <tr key={rowEl.id}>
                            {
                                rowEl.getVisibleCells().map(cellEl => (
                                    <td key={cellEl.id}>
                                        {
                                            flexRender(
                                                cellEl.column.columnDef.cell,
                                                cellEl.getContext()
                                            )
                                        }
                                    </td>
                                ))
                            }
                        </tr>
                    ))
                }

            </tbody>

        </table >
    )
}
