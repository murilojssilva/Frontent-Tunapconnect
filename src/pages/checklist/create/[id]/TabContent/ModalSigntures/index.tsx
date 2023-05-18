import { Box, Dialog, DialogActions, DialogContent, Stack } from '@mui/material'
import { MyButton } from './styles'

import SignaturePad from 'react-signature-canvas'
import { useRef } from 'react'

interface Signature {
  name: string
  rules: {
    required: boolean
  }
  image: any[]
}

interface ModalInspectCarProps {
  isOpen: {
    id: number | null
    open: boolean
  }
  closeModalSigntures: () => void
  stageName: string
  signaturesData: Signature[] | undefined
}

export default function ModalSigntures({
  isOpen,
  closeModalSigntures,
  stageName,
  signaturesData,
}: ModalInspectCarProps) {
  const signatureRef = useRef<SignaturePad>(null)

  const handleClose = () => {
    closeModalSigntures()
  }

  function handleSaveSignature() {
    if (signatureRef.current) {
    }
  }

  return (
    <Dialog
      open={isOpen.open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent
      // sx={{
      //   paddingX: 0,
      //   paddingTop: 0,
      // }}
      >
        <Box
          sx={{
            border: '1px solid',
            borderRadius: 1,
            width: 400,
            height: 200,
          }}
        >
          <SignaturePad
            canvasProps={{ width: 400, height: 200, className: 'sigCanvas' }}
            ref={signatureRef}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ paddingX: 3, paddingBottom: 2, paddingTop: 0 }}>
        <Stack direction="row" spacing={2}>
          <MyButton
            variant="contained"
            onClick={() => {
              handleSaveSignature()
            }}
          >
            salvar
          </MyButton>
          <MyButton variant="contained" onClick={handleClose}>
            sair
          </MyButton>
        </Stack>
      </DialogActions>
    </Dialog>
  )
}
