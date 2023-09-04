import AppHeader from "./AppHeader";
import React, { useEffect, useState } from 'react';
import { Autocomplete, TextField, Paper, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MovieCard from "./Cards";
import { useSnackbar } from 'notistack'
import DeleteIcon from '@mui/icons-material/Delete';

const Admin = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [matchedResults, setMatchedResults] = useState([]);
    const [selectedValue, setSelectedValue] = useState();
    const [movies, setMovies] = useState([]);
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [movieDeleted, setMovieDeleted] = useState(false);
    const [movieAdded, setMovieAdded] = useState(false);
    const [newMovie, setNewMovie] = useState({
        movie_name: '',
        theatre_name: '',
        available_tickets: '',
        total_tickets_allotted: '',
        status: '',
    });
    const [deleteMovie, setDeleteMovie] = useState({
        movie_name: '',
        theatre_name: ''
    })
    const { enqueueSnackbar } = useSnackbar();
    function showNotification(message, variant = "error") {
        return enqueueSnackbar(message, { variant });
    }
    const handleSearch = (event, value) => {
        setSearchTerm(value);
    };

    const handleOpenAddDialog = () => {
        setOpenAddDialog(true);
    };

    const handleCloseAddDialog = () => {
        setOpenAddDialog(false);
    };
    const handleOpenDeleteDialog = () => {
        setOpenDeleteDialog(true);
    }
    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
    };
    const handleAddMovie = () => {
        let config = {
            method: 'post',
            url: 'http://127.0.0.1:5000/api/v1.0/moviebooking/addmovies',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newMovie)
        }
        fetch('http://127.0.0.1:5000/api/v1.0/moviebooking/addmovies', config)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                console.log(data.message)
                showNotification(data.message, "success")
                setMovieAdded(true);

            })
            .catch((error) => {
                showNotification("error", "error")
                console.error('Error fetching data:', error)
            });
        handleCloseAddDialog();
        setNewMovie({
            movie_name: '',
            theatre_name: '',
            available_tickets: '',
            total_tickets_allotted: '',
            status: '',
        });
    };

    useEffect(() => {
        if (searchTerm !== "") {
            let config = {
                method: 'get',
                url: 'http://127.0.0.1:5000/api/v1.0/moviebooking/movies/search/' + searchTerm,
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            fetch('http://127.0.0.1:5000/api/v1.0/moviebooking/movies/search/' + searchTerm, config)
                .then((response) => response.json())
                .then((data) => {
                    const movieNames = data.movies.map((movie) => movie.movie_name);
                    setMatchedResults(movieNames);
                    setMovies(data.movies);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        } else {
            let config = {
                method: 'get',
                url: 'http://127.0.0.1:5000/api/v1.0/moviebooking/all',
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            fetch('http://127.0.0.1:5000/api/v1.0/moviebooking/all', config)
                .then((response) => response.json())
                .then((data) => {
                    setMovies(data.movies);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [searchTerm, movieAdded, deleteMovie]);
    const handleDeleteMovie = () => {
        let config = {
            method: 'delete',
            url: 'http://127.0.0.1:5000/api/v1.0/moviebooking/deletemovies',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(deleteMovie)
        }
        fetch('http://127.0.0.1:5000/api/v1.0/moviebooking/deletemovies', config)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                console.log(data.message)
                setMovieDeleted(true);
                showNotification(data.message, "success")

            })
            .catch((error) => {
                showNotification("Invalid User Credentials", "error")
                console.error('Error fetching data:', error)
            });

        setDeleteMovie({
            movie_name: '',
            theatre_name: '',
        });
        handleCloseDeleteDialog()
    }

    return (
        <>
            <AppHeader />
            <div sx={{ display: "flex" }}>
                <Autocomplete
                    sx={{ width: "500px", marginTop: '8px', marginLeft: '8px' }}
                    freeSolo
                    options={matchedResults}
                    value={selectedValue}
                    onChange={(event, newValue) => {
                        if (newValue) {
                            setSelectedValue(newValue);
                        }
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Search"
                            variant="outlined"
                            onChange={(event) => setSearchTerm(event.target.value)}
                        />
                    )}

                /><Button onClick={handleOpenAddDialog} variant="outlined" sx={{ align: "right", marginLeft: "10px", marginTop: "10px" }}>Add Movie

                    <AddIcon />

                </Button>
                <Button onClick={handleOpenDeleteDialog} variant="outlined" sx={{ align: "right", marginLeft: "10px", marginTop: "10px" }}>Delete Movie

                    <DeleteIcon />

                </Button>
            </div>


            <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>

                <DialogTitle>Add New Movie</DialogTitle>
                <DialogContent>

                    <TextField
                        label="Movie Name"
                        value={newMovie.movie_name}
                        onChange={(event) => setNewMovie({ ...newMovie, movie_name: event.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Theatre Name"
                        value={newMovie.theatre_name}
                        onChange={(event) => setNewMovie({ ...newMovie, theatre_name: event.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Available Tickets"
                        value={newMovie.available_tickets}
                        onChange={(event) => setNewMovie({ ...newMovie, available_tickets: event.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Total tickets allotted"
                        value={newMovie.total_tickets_allotted}
                        onChange={(event) => setNewMovie({ ...newMovie, total_tickets_allotted: event.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Status"
                        value={newMovie.status}
                        onChange={(event) => setNewMovie({ ...newMovie, status: event.target.value })}
                        fullWidth
                        margin="normal"
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAddDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddMovie} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openDeleteDialog} onClose={handleCloseAddDialog}>

                <DialogTitle>Add New Movie</DialogTitle>
                <DialogContent>

                    <TextField
                        label="Movie Name"
                        value={deleteMovie.movie_name}
                        onChange={(event) => setDeleteMovie({ ...deleteMovie, movie_name: event.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Theatre Name"
                        value={deleteMovie.theatre_name}
                        onChange={(event) => setDeleteMovie({ ...deleteMovie, theatre_name: event.target.value })}
                        fullWidth
                        margin="normal"
                    />


                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteMovie} color="primary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
            <div>
                {movies.map((movie, index) => (
                    <MovieCard key={index} movie={movie} />
                ))}
            </div>
        </>
    );
}

export default Admin;
