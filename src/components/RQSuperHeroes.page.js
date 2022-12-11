// import Axios  from "axios"
// import {useQuery} from "react-query"
// export const RQSuperHeroesPage = () => {

//   const onSuccess=(data)=>{
//     console.log("Successfully fetched",data)
//   }
  
//   const onError=(err)=>{
//     console.log("Successfully fetched",data)
//   }
  
//   const {data,isLoading,isError,error}=useQuery("super-heros",()=>{
//     return Axios.get("http://localhost:4000/superheroes")
//   },{
//     // cacheTime:50000,
//     // staleTime:10000,
//     // refetchOnMount:false, //  values are - true false and always
//     // refetchOnWindowFocus:true 
//     // refetchInterval: 1000,  // To fetch data after some time. eg. if you develop a stock marke app then you want to fetch stock price after 1 sec. by default when window looses focus then it will stop fetching to avoid that we can use  refetchIntervalInBackground:true
//     // refetchIntervalInBackground:true
//     onSuccess:onSuccess,
//     onError:onError
//   })
// // cacheTime - cacheTime stores cached data for 5 minutes by default. on the first request it gets the data and stores in the cache. we can change the cache time by passing cacheTime. when we request the data once again it servers the data from cache and it does the background data fetching it means first user will see the data that was stored in the cache and if after fetching there is any change in the database data then it will display the new data.

// // staleTime- staleTime sets the time for background data fetching. by default it is set to 0. StaleTime: The duration until a query transitions from fresh to stale. As long as the query is fresh, data will always be read from the cache only - no network request will happen! If the query is stale (which by default is: instantly), you will still get data from the cache, but a background refetch can happen under certain conditions.
//  if(isLoading){
//   return <h1>Loading...</h1>
//  }

//  if(isError){
//   return <h1>{error.message}</h1>
//  }


//     return (<><h2>React Query Super Heroes Page</h2>
//        {
//         data?.data.map((data)=>{
//         return <li key={data.name}>{data.name}</li>})
//       }
//       </>
//     )
//   }



// With custom hook 





import { Link } from 'react-router-dom';
import useSuperhero from './../hooks/useSuperhero';
import { useState } from 'react';
import useAddSuperHero from './../hooks/useAddSuperHero';
export const RQSuperHeroesPage = () => {
  const [name,setName]=useState("")
  const [alterEgo,setAlterEgo]=useState("")
  const {mutate:AddSuperHero}=useAddSuperHero()


  
 const handleClick =()=>{
  let hero={name,alterEgo}
  AddSuperHero(hero)
 }



  const onSuccess=(data)=>{
    // console.log("Successfully fetched",data)
  }
  
  const onError=(err)=>{
    // console.log("Error fetching",err)
  }
  
  const {data,isLoading,isError,error}=useSuperhero()
 if(isLoading){
  return <h1>Loading...</h1>
 }

 if(isError){
  return <h1>{error.message}</h1>
 }



    return (<><h2>React Query Super Heroes Page</h2>
    <input type="text" name="name" value={name} onChange={(e)=>setName(e.target.value)} placeholder="enter superhero name"/>
    <input type="text" name="alterego" value={alterEgo}  onChange={(e)=>setAlterEgo(e.target.value)} placeholder="enter alterEgo"/>
    <button onClick={handleClick}>Add Superhero</button>
       {
        data?.data.map((data)=>{
        return <Link to={`/rq-super-heroes/${data.id}`}><li key={data.name}>{data.name}</li></Link>})
      }
      </>
    )
  }
