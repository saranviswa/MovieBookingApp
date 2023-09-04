import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

function AppHeader() {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [bookedTickets, setBookedTickets] = useState([]);

    const handleLogout = () => {
        window.location.href = '/';
    };

    const handleOpenDialog = () => {
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setEmail('');
        setBookedTickets([]);
    };

    const handleFetchBookedTickets = async () => {
        try {
            let config = {
                method: 'get',
                url: 'http://127.0.0.1:5000/api/v1.0/moviebooking/bookedtickets/' + email,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            fetch('http://127.0.0.1:5000/api/v1.0/moviebooking/bookedtickets/' + email, config)
                .then((response) => {
                    return response.json()
                })
                .then((data) => {
                    console.log(data.message);
                    setBookedTickets(data.tickets);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error)
                });

        } catch (error) {
            console.error('Error fetching booked tickets:', error);
        }
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: 'black' }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Movie Booking App
                </Typography>
                <Button color="inherit" onClick={handleOpenDialog}>
                    Booked Tickets
                </Button>
                <Button color="inherit" onClick={handleLogout}>
                    Logout
                </Button>
            </Toolbar>
            <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>Booked Tickets </DialogTitle>
                <DialogContent>
                    <TextField
                        label="Enter Email ID"
                        variant="outlined"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button color="primary" onClick={handleFetchBookedTickets}>
                        Get Booked Tickets
                    </Button>
                    <Button onClick={handleCloseDialog} color="primary">
                        Close
                    </Button>

                    {bookedTickets.length > 0 && (
                        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Movie Name</TableCell>
                                        <TableCell>Theatre Name</TableCell>
                                        <TableCell>Seat Numbers</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {bookedTickets.map((ticket, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{ticket.movie_name}</TableCell>
                                            <TableCell>{ticket.theatre_name}</TableCell>
                                            <TableCell>{ticket.seat_number.join(', ')}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                    )}
                </DialogContent>


            </Dialog>
        </AppBar>
    );
}

export default AppHeader;
