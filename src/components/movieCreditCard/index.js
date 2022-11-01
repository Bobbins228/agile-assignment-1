
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import Grid from "@mui/material/Grid";
import img from '../../images/film-poster-placeholder.png'
import { Link } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import React, { useContext  } from "react";
import Chip from "@mui/material/Chip";
import PersonIcon from '@mui/icons-material/Person';

export default function MovieCreditCard({ movieCredits }) {
  const chip = { margin: 0.5 };
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        title={
          <Typography variant="h5" component="p">
            {movieCredits.name}{" "}
          </Typography>
        }
      />
      <CardMedia
        sx={{ height: 500 }}
        image={
            movieCredits.profile_path
            ? `https://image.tmdb.org/t/p/w500/${movieCredits.profile_path}`
            : img
        }
      />
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              Popularity:{Math.round(movieCredits.popularity)}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <Grid item xs={6}>
            <Typography variant="h6" component="p">
            <PersonIcon fontSize="small" />
            {movieCredits.character}
            </Typography>
          </Grid>
      <CardActions disableSpacing>
        <Link to={`/people/${movieCredits.id}`}>
          <Button variant="outlined" size="medium" color="primary">
            More Info ...
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}