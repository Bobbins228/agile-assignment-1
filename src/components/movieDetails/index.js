import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import MovieReviews from "../movieReviews"
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import SimilarMovieList from "../similarMoviesList";
import RecommendedMovieList from "../recommendedMovieList";
import Grid from "@mui/material/Grid";
import MovieCreditList from "../movieCreditList"
const root = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
};
const chip = { margin: 0.5 };

const MovieDetails = ({ movie ,similarMovies, recommendedMovies, movieCredits}) => {  // Don't miss this!
  console.log(movieCredits)
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <>
      <Typography variant="h5" component="h3">
        Overview
      </Typography>  
      <Typography variant="h6" component="p">
        {movie.overview} 
      </Typography>
      <Paper 
        component="ul" 
        sx={{...root}}
      >
        <li>
          <Chip label="Genres" sx={{...chip}} color="primary" />
        </li>
        {movie.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} sx={{...chip}} />
          </li>
        ))}
      </Paper>
      <Paper component="ul" sx={{...root}}>
        <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
        <Chip
          icon={<MonetizationIcon />}
          label={`${movie.revenue.toLocaleString()}`}
        />
        <Chip
          icon={<StarRate />}
          label={`${movie.vote_average} (${movie.vote_count}`}
        />
        <Chip label={`Released: ${movie.release_date}`} />
      </Paper>
      <Paper 
        component="ul" 
        sx={{...root}}
      >
        <li>
          <Chip label="Countries" sx={{...chip}} color="primary" />
        </li>
        {movie.production_countries.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} sx={{...chip}} />
          </li>
        ))}
      </Paper>
      <Fab
        color="secondary"
        variant="extended"
        onClick={() =>setDrawerOpen(true)}
        sx={{
          position: 'fixed',
          bottom: '1em',
          right: '1em'
        }}
      >
        <NavigationIcon />
        Reviews
      </Fab>
      <Typography variant="h5" component="h3">
        Cast
      </Typography>
      <Grid container sx={{ padding: '20px' }}>
      <Grid item container spacing={5}>
        <MovieCreditList movieCredits={movieCredits}/>
      </Grid>
    </Grid>
      <Typography variant="h5" component="h3">
        Recommended Movies
      </Typography>
      <Grid container sx={{ padding: '20px' }}>
      <Grid item container spacing={5}>
        <RecommendedMovieList recommendedMovies={recommendedMovies}/>
      </Grid>
    </Grid>
    <Typography variant="h5" component="h3">
        Similar Movies
      </Typography>
      <Grid container sx={{ padding: '20px' }}>
      <Grid item container spacing={5}>
        <SimilarMovieList similarMovies={similarMovies}/>
      </Grid>
    </Grid>
      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <MovieReviews movie={movie} />
      </Drawer>
      </>
  );
};
export default MovieDetails ;