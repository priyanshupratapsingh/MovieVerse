import React from "react"

const apikey = `&api_key=${import.meta.env.VITE_APIKEY}`
const baseURL = 'https://api.themoviedb.org/3'
// const celebURL = baseURL + '/person/popular?language=en-US&page=1' +  apikey
// const trendingURL = baseURL + '/trending/movie/week?language=en-US' +  apikey
// const trending_personURL = baseURL + '/trending/person/week?language=en-US' +  apikey



// const apiconfig = () => {
  //   return (
    //     <div>
    
    //     </div>
    //   )
    // }
    
    

export const getData = async (url) =>{
  try {
    const apiURL = baseURL + url +  apikey
    const data = await fetch(apiURL);
    const datajson = await data.json();
    // console.log(datajson);
    return datajson;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return [];  // Return an empty array if there's an error
  }
}
