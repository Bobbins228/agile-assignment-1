import React from "react";
import PeoplePageTemplate from '../components/templatePeopleListPage'
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import { getTrendingPeople } from "../api/tmdb-api";
const TrendingPeoplePage = (props) => {
  const {  data, error, isLoading, isError }  = useQuery('trending people', getTrendingPeople)

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const people = data.results;

  return (
    <PeoplePageTemplate
      title='Trending Actors'
      people={people}
      action={(person) => {
        
      }}
    />
  );
};
export default TrendingPeoplePage;