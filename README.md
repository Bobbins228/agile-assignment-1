# Assignment 1 - Agile software practice.

Name: Mark Campbell

# Set up.
## TMDB API
In order to run cypress tests you must first create a `.env` file in the project base folder.<br>
The contents should include the following.
```
REACT_APP_TMDB_KEY=<YOUR_TMDB_API_KEY>
FAST_REFRESH=false
```
<br>

## Cypress environment variables
You must first creat an account on the web app and store the information.<br>
You must then create a file called `cypress.env.json` in the project base folder and fill it with the following <br>


```
{
    "TMDB_KEY": "__YOUR_TMDB_API_KEY__",
    "NAME": "__YOUR_USERNAME__",
    "EMAIL": "__YOUR_EMAIL__",
    "PASSWORD": "__YOUR_PASSWORD__"
}
```

