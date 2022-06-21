import React from 'react'
import { Typography,Box,Grid } from '@mui/material'
import Link from '@mui/material/Link';

function Notfound() {
  return (
    <>
    <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap:2
        }}
      >
    <Typography variant="h5">Hi there 👋🏽,I think you are at a place where you shouldn't be</Typography>
    <Typography>It's a 404 not found page 😵‍💫, but the rest of the place is your's to explore </Typography>
    <Typography variant="h3">❣️</Typography>
    </Box>
    </>
  )
}

export default Notfound