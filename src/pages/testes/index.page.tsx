import { TableApp } from '@/components/TableApp'
import { ActionDeleteConfirmations } from '@/helpers/ActionConfirmations'
import { ApiCore } from '@/lib/api'
import { formatMoneyPtBR } from '@/ultis/formatMoneyPtBR'
import { Delete } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import {
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams,
} from '@mui/x-data-grid'
import React, { useEffect, useState, useMemo } from 'react'
// import { PrintInspection } from '../[companyId]/service-schedules/create/components/PrintInspection'

export default function Testes() {
  const [value, setValue] = useState([])
  const api = new ApiCore()

  const handleDelete = (id: number) => {
    // setRows(rows.filter((row) => row.id !== id))
  }

  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: 'id',
        headerName: 'Número',
        headerClassName: 'super-app-theme--header',
        width: 90,
        type: 'number',
        align: 'center',
        sortable: false,
      },
      {
        field: 'client',
        headerName: 'Cliente',
        headerClassName: 'super-app-theme--header',
        flex: 1,
        maxWidth: 230,
        minWidth: 120,
        align: 'left',
        sortable: false,
      },
      {
        field: 'plate',
        headerName: 'Placa',
        headerClassName: 'super-app-theme--header',
        width: 90,
        sortable: false,
      },
      {
        field: 'chassis',
        headerName: 'Chassis',
        headerClassName: 'super-app-theme--header',
        flex: 1,
        maxWidth: 200,
        minWidth: 120,
        sortable: false,
      },
      {
        field: 'technical_consultant',
        headerName: 'Responsavél',
        headerClassName: 'super-app-theme--header',
        flex: 1,
        maxWidth: 120,
        minWidth: 80,
        sortable: false,
      },
      {
        field: 'typeEstimate',
        headerName: 'Tipo Orçamento',
        headerClassName: 'super-app-theme--header',
        width: 120,
        sortable: false,
      },
      {
        field: 'totalDiscount',
        headerName: 'Tipo Desconto',
        headerClassName: 'super-app-theme--header',
        // type: 'number',
        width: 110,
        align: 'center',
        sortable: false,
        valueGetter: (params: GridValueGetterParams) =>
          `${formatMoneyPtBR(params.row.totalDiscount) || ''}`,
      },
      {
        field: 'total',
        headerName: 'Total Geral',
        headerClassName: 'super-app-theme--header',
        // type: 'number',
        width: 110,
        align: 'center',
        sortable: false,
        valueGetter: (params: GridValueGetterParams) =>
          `${formatMoneyPtBR(params.row.total) || ''}`,
      },
      {
        field: 'action',
        headerName: 'Ação',
        headerClassName: 'super-app-theme--header',
        sortable: false,
        width: 80,
        align: 'left',
        renderCell: (params: GridRenderCellParams) => {
          const onClick = (e: React.MouseEvent<HTMLElement>) => {
            e.stopPropagation()
            const id = params.id
            ActionDeleteConfirmations(id as number, handleDelete)
          }
          return (
            <IconButton
              aria-label="search"
              color="warning"
              onClick={onClick}
              sx={{ marginLeft: 1, color: 'red' }}
            >
              <Delete />
            </IconButton>
          )
        },
      },
    ],
    [],
  )

  useEffect(() => {
    api
      .get(`/service-schedule?company_id=${1}&limit=2&page=2`)
      .then((response: any) => {
        const resp = response.data.data.map((data: any) => ({
          id: data?.id ?? 'Não informado',
          client: data?.client?.name ?? 'Não informado',
          plate: data?.client_vehicle?.plate ?? 'Não informado',
          chassis: data?.client_vehicle?.chasis ?? 'Não informado',
          technical_consultant:
            data?.technical_consultant?.name ?? 'Não informado',
          typeEstimate: 'não definido',
          totalDiscount: 0,
          total: 0,
        }))
        setValue(resp)
      })
      .catch(() => [])
  }, [])

  return (
    <>
      <TableApp
        columns={columns}
        // rowsData={rows || []}
        rowsData={value || []}
        handlePages={() => {}}
        // @ts-ignore
        pages={() => {}}
        loading={false}
      />
      <pre>{JSON.stringify(value)}</pre>
    </>
  )
}
