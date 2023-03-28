import { apiCore } from '@/lib/api'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const api = new apiCore()


export function ActionDeleteConfirmations(id: number,handleDelete: (id: number) => void ,  router = '' ) {

  console.log(id)

  return MySwal.fire({
    title: <p>Deseja deletar o agendamento {id}</p>,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Confirmar',
    cancelButtonText: 'Cancelar',
  }).then(async (result) => {
     
     
    if (result.isConfirmed) {
      //  const resp = await api.delete('/service-schedule/' + id)
      //   console.log('respostar', resp.response.data)
      try {
        const resp = await api.delete('/service-schedule/' + id)
        console.log('', resp)
        if(resp?.status === 200) {
          MySwal.fire('Salvo com sucesso!', '', 'success').then(() => {
            handleDelete(id)
          })   
        } else {
          MySwal.fire('Ocorreu um erro!', '', 'error')
        }
      } catch (e) { 
        console.log('error',e.msg)
        MySwal.fire('Ocorreu um erro!', '', 'error')
      }

    } 
  })
}