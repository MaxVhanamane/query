// Custom hook to fetch data 
import Axios  from "axios"
import {useQuery} from "react-query"
export default function useSuperhero(onSuccess,onError) {
   
    return useQuery("super-heros",()=>{
        return Axios.get("http://localhost:4000/superheroes")
      },{
        // cacheTime:50000,
        // staleTime:10000,
        // refetchOnMount:false, //  values are - true false and always
        // refetchOnWindowFocus:true 
        // refetchInterval: 1000,  // To fetch data after some time. eg. if you develop a stock marke app then you want to fetch stock price after 1 sec. by default when window looses focus then it will stop fetching to avoid that we can use  refetchIntervalInBackground:true
        // refetchIntervalInBackground:true
        onSuccess:onSuccess,
        onError:onError
      })
    // cacheTime - cacheTime stores cached data for 5 minutes by default. on the first request it gets the data and stores in the cache. we can change the cache time by passing cacheTime. when we request the data once again it servers the data from cache and it does the background data fetching it means first user will see the data that was stored in the cache and if after fetching there is any change in the database data then it will display the new data.
    
    // staleTime- staleTime sets the time for background data fetching. It means if I set staleTime=30000 then for next 30 seconds data will be 
    // serverd from cache and there is not going to be any background data fetching. by default it is set to 0. StaleTime: The duration until a query transitions from fresh to stale. As long as the query is fresh, data will always be read from the cache only - no network request will happen! If the query is stale (which by default is: instantly), you will still get data from the cache, but a background refetch can happen under certain conditions.
  
}
