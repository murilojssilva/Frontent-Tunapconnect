import * as React from 'react'
import { useContext, useEffect, useState } from 'react'

import {
  GridColDef,
  GridRenderCellParams,
  useGridApiRef,
} from '@mui/x-data-grid'

import { useRouter } from 'next/router'
import { BoxContainer, TableDataGrid } from './styles'
import { CustomNoRowsOverlay } from './NoRows'
import { CustomFooterStatusComponent } from './FooterPaginate'

import { useTheme } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'

import DialogTitle from '@mui/material/DialogTitle'
import useMediaQuery from '@mui/material/useMediaQuery'
import { MoreOptionsButtonSelect } from './MoreOptionsButtonSelect'
import { ApiCore } from '@/lib/api'
import { AuthContext } from '@/contexts/AuthContext'

interface TableAppProps {
  // columns: GridColDef[]
  // rowsData: ServiceSchedulesListProps[]
  // handlePages?: (nextPage: string) => void
  // pages?: { current: number, next: boolean, previous: boolean }
  // loading: boolean
  isOpen: boolean
  title: string
  closeChecklistModal: () => void
}

declare module '@mui/x-data-grid' {
  // eslint-disable-next-line no-unused-vars
  interface FooterPropsOverrides {
    handlePages: (nextPage: string) => void
    nextPage: boolean
    previousPage: boolean
  }
}

const api = new ApiCore()

type RowsProps = {
  id: number
  checklistModel: string
  createAt: string
}

export function TableModal({
  isOpen,
  title,
  closeChecklistModal,
}: TableAppProps) {
  const [rows, setRows] = useState<RowsProps[]>([])
  const [open, setOpen] = React.useState(false)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  const { company } = useContext(AuthContext)

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Código',
      headerClassName: 'super-app-theme--header',
      width: 90,
      type: 'number',
      align: 'center',
      sortable: false,
    },
    {
      field: 'createAt',
      headerName: 'Data',
      headerClassName: 'super-app-theme--header',
      flex: 1,
      maxWidth: 280,
      minWidth: 180,
      sortable: false,
    },
    {
      field: 'checklistModel',
      headerName: 'Versão',
      headerClassName: 'super-app-theme--header',
      width: 120,
      sortable: false,
    },
    {
      field: 'action',
      headerName: 'Ação',
      headerClassName: 'super-app-theme--header',
      sortable: false,
      width: 80,
      align: 'left',
      renderCell: (params: GridRenderCellParams) => {
        // const onClick = (e:React.MouseEvent<HTMLElement>) => {
        //   e.stopPropagation();
        //   const id = params.id;
        // }
        return <MoreOptionsButtonSelect />
      },
    },
  ]

  const handleClose = () => {
    setOpen(false)
    closeChecklistModal()
  }

  const router = useRouter()

  const apiRef = useGridApiRef()

  // useEffect(() => {
  //   setRows(rowsData)
  // },[rowsData])

  useEffect(() => {
    setRows([
      {
        id: 1,
        checklistModel: 'Toyota',
        createAt: '27-01-2023',
      },
      {
        id: 2,
        checklistModel: 'Toyota',
        createAt: '27-01-2023',
      },
      {
        id: 3,
        checklistModel: 'Toyota',
        createAt: '27-01-2023',
      },
    ])

    if (isOpen) {
      setOpen(true)
      api
        .get('/checklist/list/?company_id=' + company?.id)
        .then((response) => console.log(response.data))
        .catch((error) => console.log(error))
    }
  }, [isOpen, company?.id])

  return (
    <>
      <Dialog
        // fullScreen={fullScreen}
        fullScreen={fullScreen}
        maxWidth="lg"
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
        <DialogContent
          sx={{
            width: 400,
          }}
        >
          <BoxContainer>
            <TableDataGrid
              rows={rows}
              columns={columns}
              autoHeight
              columnHeaderHeight={70}
              disableColumnMenu
              slots={{
                noRowsOverlay: CustomNoRowsOverlay,
                footer: CustomFooterStatusComponent,
              }}
              // slotProps={{
              //   footer: { nextPage: pages?.next, previousPage: pages?.previous, handlePages }
              // }}
              apiRef={apiRef}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 7,
                  },
                },
              }}
              loading={false}
              onRowClick={(id) => {
                router.push(`/service-schedules/${id.id}`)
              }}
              pageSizeOptions={[7]}
              disableRowSelectionOnClick
              disableColumnFilter
              // getRowClassName={(params) => params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'}
            />
          </BoxContainer>
        </DialogContent>
        <DialogActions>
          {/* <Button autoFocus onClick={handleClose}>
            Disagree
          </Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button> */}
        </DialogActions>
      </Dialog>
    </>
  )
}
