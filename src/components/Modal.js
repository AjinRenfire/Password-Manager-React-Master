import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


export default function AddModal(props) {
  
  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
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
          boxShadow: 24,
          transform: 'translate(-50%, -50%)',
          p: 4
        }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Enter the info
          </Typography>
          <input
            placeholder='Enter the url'
            className='input-fields'
            onChange={props.handleModalInputs}
            type='text'
            name='name'
          />
          <input
            placeholder='Enter your Email'
            className='input-fields'
            onChange={props.handleModalInputs}
            type='email'
            name='email'
          />
          <input
            placeholder='Enter your Password'
            className='input-fields'
            onChange={props.handleModalInputs}
            name='password'
            type={'password'}
          />
           <Button variant="contained" color="success" onClick={props.addPasswords} >add</Button>

        </Box>
      </Modal>
    </div>
  );
}
