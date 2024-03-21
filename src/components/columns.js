import { createColumnHelper } from "@tanstack/react-table"
import moment from "moment";

const columnHelper = createColumnHelper()

export const columnDef = [

    columnHelper.accessor('id', { header: 'ID' }),
    {
        accessorFn: (row) => `${row.first_name}`,
        header: 'NAME',
    },
    {
        accessorKey: "last_name",
        header: 'LAST NAME',

    },
    columnHelper.accessor('email', { header: 'EMAIL' }),
    columnHelper.accessor('gender', { header: 'GENDER' }),
    columnHelper.accessor('ip_address', { header: 'IP ADDRESS' }),
    columnHelper.accessor('phone', { header: 'PHONE' }),
    columnHelper.accessor('date', { header: 'DATE', cell: value => moment(new Date(value.getValue())).format('ll') }),
    {
        accessorKey: "date",
        header: 'Date DE VALUE',


    },

];

//Cell Merge example
export const columnDefWithMerge = [
    {
        accessorFn: (row) => `${row.first_name} ${row.last_name}`,
        header: "ID",

    }
];

export const columnDefWithGrouping = [

    columnHelper.accessor('id', { header: 'ID' }),
    {
        header: 'NAME COMPLET',
        columns: [
            {
                accessorFn: (row) => `${row.first_name}`,
                header: 'NAME',
            },
            {
                accessorKey: "last_name",
                header: 'LAST NAME',
            },

        ]
    },


    columnHelper.accessor('email', { header: 'EMAIL' }),
    columnHelper.accessor('gender', { header: 'GENDER' }),
    columnHelper.accessor('ip_address', { header: 'IP ADDRESS' }),
    columnHelper.accessor('phone', { header: 'PHONE' }),
    columnHelper.accessor('date', { header: 'DATE' }),

];