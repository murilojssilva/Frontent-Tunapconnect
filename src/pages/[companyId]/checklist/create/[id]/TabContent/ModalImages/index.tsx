import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Stack,
} from '@mui/material'

import DeleteIcon from '@mui/icons-material/Delete'
import { MyDropzone } from './DropZone'

interface IModalImageProps {
  isOpen: boolean
  closeModalImage: () => void
}

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
    author: '@bkristastucchio',
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
    author: '@rollelflex_graphy726',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
    author: '@helloimnik',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
    author: '@nolanissac',
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
    author: '@hjrc33',
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
    author: '@arwinneil',
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
    author: '@tjdragotta',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
    author: '@katie_wasserman',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
    author: '@silverdalex',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
    author: '@shelleypauls',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
    author: '@peterlaster',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
    author: '@southside_customs',
    cols: 2,
  },
]

export default function ModalImages({
  isOpen,
  closeModalImage,
}: IModalImageProps) {
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
      {/* <DialogTitle id="alert-dialog-title">{'Images'}</DialogTitle> */}
      <DialogContent>
        <Box>
          <MyDropzone />
        </Box>
        <ImageList sx={{ width: 500, height: 450 }}>
          <ImageListItem key="Subheader" cols={2}>
            {/* <ListSubheader component="div">December</ListSubheader> */}
          </ImageListItem>
          {itemData.map((item) => (
            <ImageListItem key={item.img}>
              <img
                src={`${item.img}?w=248&fit=crop&auto=format`}
                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
              />
              <ImageListItemBar
                sx={{
                  background: 'transparent',
                }}
                position="bottom"
                actionIcon={
                  <IconButton
                    sx={{ color: 'red' }}
                    aria-label={`info about ${item.title}`}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
      </DialogContent>
      <DialogActions sx={{ paddingX: 3, paddingBottom: 2, paddingTop: 0 }}>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" onClick={handleClose}>
            cancelar
          </Button>
          <Button variant="contained" onClick={handleClose}>
            finalizar
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  )
}
