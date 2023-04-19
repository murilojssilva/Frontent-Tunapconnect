import { useCallback, useMemo } from 'react'
import { useDropzone } from 'react-dropzone'
import PhotoSizeSelectActualOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActualOutlined'
// import axios from 'axios'
import { ApiCore } from '@/lib/api'
import { GetServerSideProps } from 'next/types'
import path from 'path'
import fs from 'fs/promises'

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
}

const focusedStyle = {
  borderColor: '#2196f3',
}

const acceptStyle = {
  borderColor: '#00e676',
}

const rejectStyle = {
  borderColor: '#ff1744',
}

interface MyDropzoneProps {
  dirs?: string[]
}

// async function savePathTemp(filesList = []) {
//   try {
//     if (!(filesList.length > 0)) return
//     const formData = new FormData()
//     formData.append('image', filesList[0])
//     const { data } = await axios.post('/api/uploadimage', formData)
//     console.log(data)
//   } catch (error: any) {
//     console.log(error.response?.data)
//   }
// }

export function MyDropzone({ dirs }: MyDropzoneProps) {
  // const [uploading, setUploading] = useState(false)
  const api = new ApiCore()

  const onDrop = useCallback(async (acceptedFiles: any) => {
    // console.log(acceptedFiles)
    const formData = new FormData()
    // eslint-disable-next-line no-unused-vars
    const acceptedFilesList = acceptedFiles.map((file: File) => {
      formData.append('file', file)
      return file
    })

    api
      .create('/uploads', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((response) => console.log(response))
      .catch((error) => console.error(error))
  }, [])

  // async function postUploadFile(data: any) {
  //   const session = await getSession()
  //   const token = session?.user.token
  //   console.log(token)
  //   try {
  //     const response = await axios({
  //       method: 'post',
  //       url: '/file-upload/image',
  //       data,
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //         Authorization: 'Bearer ' + token,
  //       },
  //     })
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      onDrop,
      maxFiles: 1,
      accept: {
        'image/png': ['.png'],
        'image/jpg': ['.jpg'],
      },
    })

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject],
  )

  return (
    // @ts-ignore
    <div {...getRootProps({ style })}>
      <input {...getInputProps()} />
      <PhotoSizeSelectActualOutlinedIcon />
      <p>Clique ou arraste para enviar as imagens</p>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const props = { dirs: [] }
  try {
    const dirs = await fs.readdir(
      path.join(process.cwd(), '/public/temp/images'),
    )
    props.dirs = dirs as any
    return { props }
  } catch (error) {
    return { props }
  }
}
