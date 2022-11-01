# Assignment 1 - ReactJS app.

Name: Mark Campbell

## Overview.

A web app that displays many lists of different movies. A user can add movies to their favourites list as long as they have logged in first.<br>
The user can also view lists of popular actors. The movie app allows a user to enter a detailed view of the movie they want to know more about and read about their favourite movies.<br>
Users can also look at detailed views of their favourite actors too!

### Features.

+ Firebase Authentication
+ Now Playing Movies page
+ Popular Movies Page
+ Top Rated Movies Page
+ Similar Movies list (visible from a movie's details page)
+ Recommended Movies list (visible from a movie's details page)
+ Movie Credits list (visible from a movie's details page)
+ Popular Actors Page
+ Trending Actors Page
+ Actor Details Page 
+ Actor Movies Credit list (visible from a actor's details page)
+ Link to an actor's IMDB pages (visible from a actor's details page)

## Setup requirements.

Create a `.env` file in `src` and include the following.
```
REACT_APP_TMDB_KEY=<YOUR_TMDB_API_KEY>
FAST_REFRESH=false
```

## API endpoints.

+ Movie Home Page Which shows a discover movies list - movies/home
+ Movie details - /movies/:id
+ Favourite Movies - /movies/favorites
+ Upcoming Movies - /movies/upcoming
+ Now Playing Movies - /movies/now-playing
+ Top Rated Movies - /movies/top-rated
+ Trending Movies of the week - /movies/trending
+ Write a review - /reviews/form
+ Full review - /reviews/:id
+ Popular actors - /people
+ Trending actors - /people/trending
+ Actor details - /people/:id
+ Register - /register
+ reset password - /reset
+ Login - /

## Routing.

+ /movies/home - displays a list of discoverable movies. (public)
+ /movies/:id - Shows details of movie including reviews, lists of similar & recommended movies as well as actors staring in the movie. (public)
+ /movies/favorites - displays favourited movies (redirects to log in page if not signed in).
+ /movies/upcoming - displays a list of upcoming movies. (public)
+ /movies/now-playing - displays a list of now playing movies. (public)
+ /movies/top-rated - displays a list of top rated movies. (public)
+ /movies/trending - displays a list of trending movies. (public)
+ /reviews/form - A form for creating a new review. (public)
+ /reviews/:id - A full detailed review. (public) 
+ /people - displays a list of popular actors. (public)
+ /people/trending - displays a list of trending actors. (public)
+ /people/:id - Detailed view of an actor including a list of movies they have starred in. (public)
+ /register - A simple register page allowing a user to create an account or sign in with Google. (public)
+ /reset - A simple reset password page allowing a user to reset their password for their account (does not work with google account sign in). (public)
+ / - The login page allowing a user to log in with a previously created account or with Google. (public)




