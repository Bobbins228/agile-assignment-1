import React from "react";
import MovieCreditCard from "../movieCreditCard";
import Grid from "@mui/material/Grid";

const movieCreditList = ( { movieCredits }) => {
  let credits = movieCredits.cast.map((m) => (
    <Grid key={m.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
        <MovieCreditCard key={m.id} movieCredits={m} />
    </Grid>
  ));
  return credits;
};

export default movieCreditList;