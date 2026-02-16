"use client"

import * as React from "react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  SortingState,
  ColumnFiltersState,
  ExpandedState,
  getExpandedRowModel,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { PlusCircle } from "lucide-react"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}
export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const [expanded, setExpanded] = React.useState<ExpandedState>({})
  
  const table = useReactTable({
    data,
    columns,
    state: { expanded },
    onExpandedChange: setExpanded,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(), // IMPORTANTE
  })

  return (
    <div className="space-y-4">
      {/* ... Filtros que ya tienes */}
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <React.Fragment key={row.id}>
                  <TableRow data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className={cell.column.id === "expander" || cell.column.id === "actions" ? "w-7.5 px-2" : ""}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                  
                  {/* FILA DESPLEGABLE DE LOTES */}
                  {row.getIsExpanded() && (
                    <TableRow className="bg-muted/30 hover:bg-muted/30">
                      <TableCell colSpan={columns.length} className="p-3">
                        <div className="rounded-lg border bg-background p-4 shadow-inner">
                          <div className="grid grid-cols-4 gap-3 text-sm">
                            <div className="font-semibold">Fecha Ingreso</div>
                            <div className="font-semibold text-center">Costo Compra</div>
                            <div className="font-semibold text-center">Stock Inicial</div>
                            <div className="font-semibold text-center ">Stock Actual</div>
                            
                            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                            {(row.original as any).batches.map((batch: any) => (
                              <React.Fragment key={batch.id}>
                                <div className="text-muted-foreground">
                                  {new Date(batch.created_at).toLocaleDateString()}
                                </div>
                                <div className="text-center">${batch.purchase_price}</div>
                                <div className="text-center text-muted-foreground">{batch.initial_quantity}</div>
                                <div className="text-center font-bold">{batch.current_quantity}</div>
                              </React.Fragment>
                            ))}
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))
            ) : (
              <TableRow><TableCell colSpan={columns.length} className="h-24 text-center">Sin resultados.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}