import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Stack,
} from '@mui/material'

import DeleteIcon from '@mui/icons-material/Delete'
import { MyDropzone } from './DropZone'
import { useState } from 'react'
import Image from 'next/image'
import { MyButton } from './styles'

interface IModalImageProps {
  isOpen: boolean
  closeModalImage: () => void
}

export default function ModalImages({
  isOpen,
  closeModalImage,
}: IModalImageProps) {
  const [imageUrlList, setImageUrlList] = useState<
    Array<{ id: number; name: string; url: string; size: string }>
  >([])

  async function handleAddImageUrlList(imageData: {
    id: number
    name: string
    url: string
    size: string
  }) {
    setImageUrlList((prevState) => {
      return [...prevState, imageData]
    })
  }

  async function handleRemoveImageUrlList(id: number) {
    setImageUrlList((prevState) => {
      return prevState.filter((item) => item.id !== id)
    })
  }

  const handleClose = () => {
    closeModalImage()
  }

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{'Imagens'}</DialogTitle>
      <DialogContent>
        <Box>
          <MyDropzone handleAddImageUrlList={handleAddImageUrlList} />
        </Box>
        {imageUrlList.length > 0 && (
          <Paper
            style={{
              maxHeight: 300,
              overflow: 'auto',
              marginTop: 10,
              padding: '5px 10px 0px 10px',
            }}
          >
            <List>
              {imageUrlList.map((item) => (
                <ListItem
                  sx={{
                    border: '1px solid #e1e1e1',
                    borderRadius: '2px',
                    px: 1,
                    marginBottom: '5px',
                    overflowY: '',
                    maxHeight: 100,
                  }}
                  key={item.id}
                  dense
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleRemoveImageUrlList(item.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Image
                      alt={item.name}
                      src={item.url}
                      fill
                      style={{
                        maxWidth: '50px',
                        maxHeight: '60px',
                        objectFit: 'scale-down',
                        margin: '0 8px',
                      }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.name}
                    secondary={`${item.size} MB`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        )}
      </DialogContent>
      <DialogActions sx={{ paddingX: 3, paddingBottom: 2, paddingTop: 0 }}>
        <Stack direction="row" spacing={2}>
          <MyButton
            variant="contained"
            onClick={() => {
              handleClose()
              setImageUrlList([])
            }}
          >
            cancelar
          </MyButton>
          <MyButton variant="contained" onClick={handleClose}>
            finalizar
          </MyButton>
        </Stack>
      </DialogActions>
    </Dialog>
  )
}
