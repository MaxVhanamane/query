import { useQuery } from 'react-query';
import axios from 'axios';
const fetchSuperHero=(heroId)=>{
   return axios.get(`http://localhost:4000/superheroes/${heroId}`)
}
export default function useSingleSuperhero(heroId) {
    // adding an array ["super-hero",heroId] so that it can produce different key for each query. If I give same key name for each query then it might use same cached data for different request then after refetch the data will change.
  return  useQuery(["super-hero",heroId],()=>fetchSuperHero(heroId))
    
  
}
