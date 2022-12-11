import React from 'react'
import { useParams } from 'react-router-dom';
import useSingleSuperhero from './../hooks/useSingleSuperhero';

export default function RQSuperHeroPage() {
 const {heroId}=useParams()
    const {data,isLoading,error,isError}=useSingleSuperhero(heroId)
    if(isLoading){
        return <h1>Loading...</h1>
    }
    if(isError){
        return <h1>{error.message}</h1>
    }
  return (
    <div>
      Single superhero details
    <div>{data?.data.name} -  {data?.data.alterEgo}</div>
    </div>
  )
}
