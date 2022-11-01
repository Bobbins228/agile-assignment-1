import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import img from '../../images/film-poster-placeholder.png'
import React, { useContext  } from "react";
import PersonIcon from '@mui/icons-material/Person';
import { Link } from "react-router-dom";
export default function RecommendedMoviesCard({ recommendedMovies }) {
  return (
    <Card sx={{ minWidth: 210 ,maxWidth: 345 }}>
      <CardHeader
        title={
          <Typography variant="h5" component="p">
            {recommendedMovies.title}{" "}
          </Typography>
        }
      />
      <CardMedia
        sx={{ height: 500 }}
        image={
            recommendedMovies.poster_path
            ? `https://image.tmdb.org/t/p/w500/${recommendedMovies.poster_path}`
            : img
        }
      />
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <CalendarIcon fontSize="small" />
              {recommendedMovies.release_date}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <StarRateIcon fontSize="small" />
              {"  "} {recommendedMovies.vote_average}{" "}
            </Typography>
          </Grid>
        </Grid>
        <Link to={`/movies/${recommendedMovies.id}`}>
          <Button variant="outlined" size="medium" color="primary">
            More Info ...
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}