import React, { useContext, useState } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";


const AddToFavoritesIcon = ({ movie }) => {
  const context = useContext(MoviesContext);
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const handleAddToFavorites = (e) => {
    if (loading) return;
    if (!user) return navigate("/login");
    e.preventDefault();
    context.addToFavorites(movie);
  };

  return (
    <IconButton aria-label="add to favorites" onClick={handleAddToFavorites}>
      <FavoriteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToFavoritesIcon;