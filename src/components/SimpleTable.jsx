import data from '../MOCK_DATA.json'

import { useState } from "react";
import dayjs from "dayjs";
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel


} from "@tanstack/react-table";



const SimpleTable = () => {


    //const [data, setData] = useState([])

    const columns = [
        {
            header: "ID",
            accessorKey: "id",
            footer: "ID",


        },
        {
            header: "NAME",
            accessorKey: "name",
            footer: "NAME",
        },
        {
            header: "LAST NAME",
            accessorKey: "lastname",
            footer: "LAST NAME",
        },
        {
            header: "EMAIL",
            accessorKey: "email",
            footer: "EMAIL",
        },
        {
            header: "COUNTRY",
            accessorKey: "country",
            footer: "COUNTRY",
        },
        {
            header: "DATE OF BIRTH",
            accessorKey: "dateOfBirth",
            footer: "DATE OF BIRTH",
            cell: info => dayjs(info.getValue()).format('YYYY/MM/DD HH:mm:ss'),
        },
    ]

    const [sorting, setSorting] = useState([]);
    const [filtering, setFiltering] = useState("");
    const [columnOrder, setColumnOrder] = useState(['id', 'name', 'lastname', 'email', 'country', 'dateOfBirth']);
    const [columnVisibility, setColumnVisibility] = useState({
        id: true,
        name: true,
        lastname: true,
        email: true,
        country: true,
        dateOfBirth: true,
    });


    const table = useReactTable({
        data: data,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),

        /* initialState: {
            
        }, */
        state: {
            sorting,
            globalFilter: filtering,
            columnOrder,
            columnVisibility,


        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering,
        onColumnOrderChange: setColumnOrder,
        onColumnVisibilityChange: setColumnVisibility,


    });
    console.log(table.getState().columnFilters)
    return (

        <div>

            <input
                type="text"
                value={filtering}
                onChange={(e) => setFiltering(e.target.value)}
            />
            <table>
                <thead>
                    {
                        table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>

                                {headerGroup.headers.map(header => (
                                    <th key={header.id}
                                        onClick={header.column.getToggleSortingHandler()}
                                    >
                                        {header.isPlaceholder ? null : (
                                            <div>
                                                <div>
                                                    {
                                                        { asc: '⬆️', desc: '⬇️' }[
                                                        header.column.getIsSorted() ?? null
                                                        ]
                                                    }
                                                </div>
                                                <div>
                                                    {flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                                </div>





                                            </div>
                                        )}

                                    </th>
                                ))}
                            </tr>
                        )
                        )
                    }
                </thead>
                <tbody>

                    {
                        table.getRowModel().rows.map((row) => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))
                                }

                            </tr>
                        ))
                    }


                </tbody>

            </table>
            <button onClick={() => { table.setPageIndex(0) }}>Primer Página</button>
            <button onClick={() => { table.previousPage() }}>Anterior</button>
            <button onClick={() => { table.nextPage() }}>Posterior</button>
            <button onClick={() => { table.setPageIndex(table.getPageCount() - 1) }}>
                Última Página
            </button>
        </div>
    )
}



export default SimpleTable