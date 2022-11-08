import React from "react";
import { useParams } from 'react-router-dom';
import PersonDetails from "../components/peopleDetails/";
import PageTemplate from "../components/templatePersonPage";
import { getPerson, getPeopleMovieCredits } from '../api/tmdb-api'
import Spinner from '../components/spinner'
import { useQuery, useIsFetching } from "react-query";

const PersonDetailsPage = (props) => {
  const isFetching = useIsFetching();
  const { id } = useParams();
  const { data: person, error, isError } = useQuery(
    ["person", { id: id }],
    getPerson
  );

  const { data: personMovie } = useQuery(
    ["person movie credits", { id: id }],
    getPeopleMovieCredits
  );
  if (isFetching) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      {person ? (
        <>
          <PageTemplate person={person}>
            <PersonDetails person={person} personMovie={personMovie}/>
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for actor details</p>
      )}
    </>
  );
};

export default PersonDetailsPage;