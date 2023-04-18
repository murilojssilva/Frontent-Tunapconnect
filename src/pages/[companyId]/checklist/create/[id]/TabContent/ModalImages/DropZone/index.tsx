import { useCallback, useMemo } from 'react'
import { useDropzone } from 'react-dropzone'
import PhotoSizeSelectActualOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActualOutlined'
import { ApiCore } from '@/lib/api'
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

export function MyDropzone() {
  const api = new ApiCore()
  const onDrop = useCallback((acceptedFiles: any) => {
    console.log(acceptedFiles)
    const acceptedFileItems = acceptedFiles.map((file) => {
      api
        .axiosPure()
        .post('/file-upload/image', file)
        .then((response) => console.log(response))
        .catch((error) => console.error(error))
      return `${file.path} - ${file.size} bytes`
    })

    // console.log(acceptedFileItems)
    // acceptedFiles.forEach((file) => {
    //   const reader = new FileReader()

    //   reader.onabort = () => console.log('file reading was aborted')
    //   reader.onerror = () => console.log('file reading has failed')
    //   reader.onload = () => {
    //     // Do whatever you want with the file contents
    //     const binaryStr = reader.result
    //     console.log(binaryStr)
    //   }
    //   reader.readAsArrayBuffer(file)
    // })
  }, [])
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({ onDrop, maxFiles: 10 })

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
