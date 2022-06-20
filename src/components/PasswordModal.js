import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';



export default function PasswordModal(props) {
    const closeM =()=>{
        props.closepm();
    }

  return (
    <div>
      <Modal
        open={props.passopen}
        onClose={props.handlePassClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 400,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          bgcolor: 'background.paper',
          border: '2px dashed #324741',
          borderRadius:'20px',
          boxShadow: 24,
          transform: 'translate(-50%, -50%)',
          p: 4
        }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {props.password}
          </Typography>
        <Button onClick={closeM}>close</Button>
        </Box>
      </Modal>
    </div>
  );
}
