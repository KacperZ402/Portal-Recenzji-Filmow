import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Divider,
  Stack
} from '@mui/material';

const Profile = () => {
  const email = localStorage.getItem('email');
  const username = email ? email.split('@')[0] : 'Nieznany użytkownik';

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
    >
      <Card sx={{ maxWidth: 400, width: '100%', padding: 3 }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar sx={{ width: 80, height: 80, bgcolor: 'primary.main', mb: 2 }}>
            {username[0]?.toUpperCase() || '?'}
          </Avatar>

          <Typography variant="h5" gutterBottom>
            {username}
          </Typography>

          <Divider sx={{ width: '100%', my: 2 }} />

          <CardContent sx={{ width: '100%' }}>
            <Stack spacing={2}>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Email:
                </Typography>
                <Typography variant="body1">{email || 'Brak e-maila'}</Typography>
              </Box>
            </Stack>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
};

export default Profile;
