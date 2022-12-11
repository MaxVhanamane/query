import {useMutation,useQueryClient} from "react-query"
import axios from "axios"

const addSuperhero =(heroDetails)=>{
    return axios.post("http://localhost:4000/superheroes",heroDetails)
}

export default function useAddSuperHero() {
    const queryClient=useQueryClient()
  return useMutation(addSuperhero,{

    // onSuccess:(data)=>{
      // Here data is response received after the mutation. it's a entire request for the post request.
    //     // we can use queryClient.invalidateQueries("super-heros") to access the new data after adding the superhero. this will make a get request.
    //     // queryClient.invalidateQueries("super-heros")

    //     // If we do not want to make another get request then we can use the following method. as it is running onSuccess it means the data has been succesfully added in the database.
    //     queryClient.setQueryData("super-heros",(oldQueryData)=>{
      // oldQueryData is what is present in the query cache 
      // return an object. first spread the olddata. then get the key that you want to change and modify it accordingly.
    //     return {
    //         ...oldQueryData,
     //...oldQueryData.data is array or objects and  data.data is an object we get after mutation.
    //         data:[...oldQueryData.data,data.data] // data.data is a mutation response.
    //     }
    //     })
    // }

    // Using Optimistic updates.

    onMutate:async(newHero)=>{
      // onMutate runs before sending the request to the server. Here we assume that everything is going to be fine.
        // cancel any outgoing refetches to avoid data overiding 
        await queryClient.cancelQueries("super-heros")
        const previousQueryData=queryClient.getQueryData("super-heros")
        console.log("previousQueryData",previousQueryData)
              queryClient.setQueryData("super-heros",(oldQueryData)=>{
                console.log("oldQueryData",oldQueryData)
        return {
            ...oldQueryData,
            data:[...oldQueryData.data,{id:oldQueryData?.data?.length+1,...newHero}]
        }
        })
        // Return previous data so that if something goes wrong we can use this in onError method
        return {previousQueryData}
    },
    // here we have the access of previousQueryData in context parameter
    // In this case _ is just a function parameter - a single underscore is a convention used by some programmers to indicate "ignore this binding/parameter".
    // If something goes wrong on the server and could not the data then onError will run.
    //  earlier in onMutate we assumed that everything is going to be fine and we added the data before it is added in database. Now If the error occures we will handle it here in onError function by reversing what we did in onMutate. whatever we return in onMutate we will have access to that data in context. in this eg. we have returned the previousQueryData we can use that data to reset what we did before.
    onError:(_error,_hero,context)=>{ 
      console.log("error me aaya",context)
      queryClient.setQueryData("super-heros",context.previousQueryData)},
    // onSettled is called either successfull or an error. After doing above operations we will refetch the data. so that our data and the data in the db will be in sync.
    onSettled:()=>{queryClient.invalidateQueries("super-heros")}


  })
}
