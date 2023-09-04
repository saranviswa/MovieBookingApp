import AppHeader from "./AppHeader";
import React, { useEffect, useState } from 'react';
import { Autocomplete, TextField, Paper } from '@mui/material';
import MovieCard from "./Cards";

const Movies = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [matchedResults, setMatchedResults] = useState([]);
    const [selectedValue, setSelectedValue] = useState();
    const [movies, setMovies] =useState([]);
  
    const handleSearch = (event, value) => {
      setSearchTerm(value);
    };
    useEffect(()=> {
        if(searchTerm !== ""){
            let config = {
                method: 'get',
                url: 'http://127.0.0.1:5000/api/v1.0/moviebooking/movies/search/'+searchTerm,
                headers: {
                  'Content-Type': 'application/json',
                },
              }
              fetch('http://127.0.0.1:5000/api/v1.0/moviebooking/movies/search/'+searchTerm, config)
                .then((response) => {
                return response.json()})
                .then((data) => {
                  const movieNames = data.movies.map((movie) => movie.movie_name);
                  console.log(movieNames)
                  setMatchedResults(movieNames)
                  setMovies(data.movies);                   
                })
                .catch((error) => {
                  console.error('Error fetching data:', error)
                });
        }
        else{
            let config = {
                method: 'get',
                url: 'http://127.0.0.1:5000/api/v1.0/moviebooking/all',
                headers: {
                  'Content-Type': 'application/json',
                },
              }
              fetch('http://127.0.0.1:5000/api/v1.0/moviebooking/all', config)
                .then((response) => {
                return response.json()})
                .then((data) => {
                  console.log(data.movies)
                  setMovies(data.movies)                    
                })
                .catch((error) => {
                  console.error('Error fetching data:', error)
                });
        }
    }, [searchTerm])
    console.log("sv",selectedValue);
    
    return(
        <>
        <AppHeader />
        <Autocomplete
        sx={{width:"500px",marginTop: '8px', marginLeft: '8px'}}
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
      />
       <div>
        {movies.map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </div>
      </>
    )
}

export default Movies;