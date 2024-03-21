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


    //const data = useMemo(() => mdata, []);

    const columns = [
        {
            header: "ID",
            accessorKey: "id",

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

    const table = useReactTable({
        data: data,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),

        state: {
            sorting,
            globalFilter: filtering
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering,

    });

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
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                                {
                                                    { asc: '⬆️', desc: '⬇️' }[
                                                    header.column.getIsSorted() ?? null
                                                    ]
                                                }
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
                <tfoot>
                    {
                        table.getFooterGroups().map(footerGroup => (
                            <tr key={footerGroup.id}>
                                {
                                    footerGroup.headers.map((footer) => (
                                        <th key={footer.id}>
                                            {
                                                flexRender(footer.column.columnDef.footer, footer.getContext())
                                            }
                                        </th>
                                    ))
                                }

                            </tr>
                        ))
                    }
                    <tr>
                        <td></td>

                    </tr>
                </tfoot>
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