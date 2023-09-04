import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import {useSnackbar} from 'notistack'

const styles = {
  card: {
    maxWidth: 300,
    margin: '1rem',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
};

function MovieCard({ movie }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [ticketCount, setTicketCount] = useState(1);
  const {enqueueSnackbar} = useSnackbar();
  function showNotification(message, variant="error"){
    return enqueueSnackbar(message, {variant});
  }
  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleBookTickets = () => {
    let config = {
        method: 'post',
        url: 'http://127.0.0.1:5000/api/v1.0/moviebooking/'+movie.movie_name+'/add',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "email": email,
          "num_tickets": ticketCount,
          "theatre_name": movie.theatre_name
        })
      }
      fetch('http://127.0.0.1:5000/api/v1.0/moviebooking/'+movie.movie_name+'/add', config)
        .then((response) => {
          if(!response.ok){
            throw new Error("Something went wrong. Please try again later", response.status)
            
          }
        return response.json()})
        .then((data) => {
            console.log(data.message);
            showNotification("Ticket booked", "success");
        })
        .catch((error) => {
          showNotification(error, "error")
          console.error('Error fetching data:', error)
        });
    handleCloseDialog();
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Card sx={styles.card}>
        <CardContent>
          <Typography variant="h6">{movie.movie_name}</Typography>
          <Typography variant="body2" color="textSecondary">
            Theatre: {movie.theatre_name}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Available Tickets: {movie.available_tickets}
          </Typography>
        </CardContent>
        <Button onClick={handleOpenDialog} color="primary" fullWidth>
          Book Tickets
        </Button>
      </Card>

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Book Tickets</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Movie: {movie.movie_name}
          </Typography>
          <Typography variant="body2">
            Theatre: {movie.theatre_name}
          </Typography>
          <TextField
            fullWidth
            label="Enter Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginTop: '1rem' }}
          />
          <TextField
            fullWidth
            label="Number of Tickets"
            variant="outlined"
            type="number"
            value={ticketCount}
            onChange={(e) => setTicketCount(e.target.value)}
            style={{ marginTop: '1rem' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleBookTickets} color="primary">
            Confirm Booking
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default MovieCard;
