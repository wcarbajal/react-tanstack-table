import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import data from '../MOCK_DATA.json'

function SimpleTable() {




    const columns = [
        {
            header: "ID",
            accesorKey: "id",
        },
        {
            header: "NAME",
            accesorKey: "name",
        },
        {
            header: "LAST NAME",
            accesorKey: "lastname",
        },
        {
            header: "EMAIL",
            accesorKey: "email",
        },
        {
            header: "COUNTRY",
            accesorKey: "country",
        },
        {
            header: "DATE OF BIRTH",
            accesorKey: "dateOfBirth",
        },
    ]

    const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });

    return (
        <div>
            <table>
                <thead>
                    {
                        table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>

                                {headerGroup.headers.map(header => (
                                    <th key={header.id}>
                                        { flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                </thead>
                <tbody>

                    {
                        table.getRowModel().rows.map((row) => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                        <td key={cell.id}> 
                                            { flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))
                                }

                            </tr>
                        ))
                    }
                    <tr>
                        <td>1</td>

                    </tr>

                </tbody>
                <tfoot>
                    <tr>
                        <td>ID</td>

                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default SimpleTable