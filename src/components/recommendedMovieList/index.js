import React from "react";
import RecommendedMoviesCard from "../recommendedMovieCard";
import Grid from "@mui/material/Grid";

const RecommendedMovieList = ( { recommendedMovies }) => {
  let movies = recommendedMovies.results.map((m) => (
    <Grid key={m.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
        <RecommendedMoviesCard key={m.id} recommendedMovies={m} />
    </Grid>
  ));
  return movies;
};

export default RecommendedMovieList;