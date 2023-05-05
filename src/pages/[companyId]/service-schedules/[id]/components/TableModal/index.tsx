import * as React from 'react'
import { useContext, useMemo } from 'react'

import {
  GridColDef,
  GridRenderCellParams,
  GridValueFormatterParams,
  useGridApiRef,
} from '@mui/x-data-grid'

import { BoxContainer, TableDataGrid } from './styles'
import { CustomNoRowsOverlay } from './NoRows'
import { CustomFooterStatusComponent } from './FooterPaginate'

// import { useTheme } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'

import DialogTitle from '@mui/material/DialogTitle'
// import useMediaQuery from '@mui/material/useMediaQuery'
import { MoreOptionsButtonSelect } from './MoreOptionsButtonSelect'
import { ApiCore } from '@/lib/api'
import { CompanyContext } from '@/contexts/CompanyContext'
import { useQuery } from 'react-query'
import { formatDateTime } from '@/ultis/formatDate'

interface TableAppProps {
  // columns: GridColDef[]
  // rowsData: ServiceSchedulesListProps[]
  // handlePages?: (nextPage: string) => void
  // pages?: { current: number, next: boolean, previous: boolean }
  // loading: boolean
  isOpen: boolean
  title: string
  serviceScheduleId: string
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
  serviceScheduleId,
}: TableAppProps) {
  // const theme = useTheme()
  // const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  const { companyId } = useContext(CompanyContext)

  const columns: GridColDef[] = useMemo(
    () => [
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
        // flex: 1,
        maxWidth: 280,
        minWidth: 180,
        sortable: false,
        valueFormatter: (params: GridValueFormatterParams) => {
          if (params.value == null) {
            return 'Não informado'
          }

          const dateFormatted = formatDateTime(params.value)
          return `${dateFormatted}`
        },
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
    ],
    [],
  )

  // const router = useRouter()

  const apiRef = useGridApiRef()

  const {
    data: dataCheckList,
    isLoading,
    isSuccess,
  } = useQuery<RowsProps[]>(
    ['checklist', 'service_schedule', 'by_id', 'modal'],
    () => {
      return api
        .get(
          `/checklist/list?company_id=${companyId}&service_schedule_id=${serviceScheduleId}`,
        )
        .then((response) => {
          const { data } = response.data
          // return response.data.data
          return data.map((item: any) => {
            return {
              id: item?.id,
              createAt: item?.created_at,
              checklistModel: item?.checklistmodels?.name,
            }
          })
        })
    },
    { enabled: isOpen && !!companyId },
  )

  return (
    <>
      <Dialog
        // fullScreen={fullScreen}
        maxWidth="lg"
        open={isOpen}
        onClose={closeChecklistModal}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
        <DialogContent
        // sx={{
        //   width: 400,
        // }}
        >
          <BoxContainer>
            <TableDataGrid
              rows={isSuccess ? dataCheckList : []}
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
              loading={isLoading}
              onRowClick={(id) => {
                // router.push(`/service-schedules/${id.id}`)
              }}
              pageSizeOptions={[7]}
              disableRowSelectionOnClick
              disableColumnFilter
              // getRowClassName={(params) => params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'}
            />
          </BoxContainer>
        </DialogContent>
        <DialogActions>
          {/* <Button autoFocus onClick={closeChecklistModal}>
            Disagree
          </Button>
          <Button onClick={closeChecklistModal} autoFocus>
            Agree
          </Button> */}
        </DialogActions>
      </Dialog>
    </>
  )
}
