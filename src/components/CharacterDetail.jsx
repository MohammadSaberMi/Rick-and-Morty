import { ArrowUpCircleIcon } from "@heroicons/react/24/outline"
import { useEffect, useState } from "react"
import axios from "axios";
import Loader from "./Loader";
import toast from "react-hot-toast";

function CharacterDetail({selectedId ,onAddFavourite,isAddToFavourite}) {
const [character,setCharacter]=useState(null);
const [isLoading,setIsLoading]=useState(false);
const [episodes,setEpisodes]=useState([]);

useEffect(() => {
  async function fechData() {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `https://rickandmortyapi.com/api/character/${selectedId}`
      );
      setCharacter(data);

      const episodesId = data.episode.map((e) => e.split("/").at(-1)); // [1, 2, 3]
      const { data: episodeData } = await axios.get(
        `https://rickandmortyapi.com/api/episode/${episodesId}`
      );
      setEpisodes([episodeData].flat().slice(0, 6));
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      setIsLoading(false);
    }
  } 


if(selectedId) fechData();
 } ,[selectedId]);

if(isLoading) return <div style={{flex:1}}>
  <Loader/>
</div>
if(!character || !selectedId) return <div style={{flex:1,color:"var(--slate-300)"}}>Please select acharacter</div>

 
  
 
  return (
   <div style={{flex:1}}>
     <div className="character-detail">
      <img src={character.image} alt={character.name} className="character-detail__img" />
      <div className="character-detail__info">
        <h3 className="name">
          <span>{character.gender=== "Male" ? "👨🏻":"👩🏻"}</span>
          <span>&nbsp;{character.name} </span>
        </h3>
        <div className="info">
          <span className={`status ${character.status=== "Dead" ? "red" :""}`}></span>
          <span>&nbsp;{character.status}</span>
          <span> - &nbsp;{character.species}</span>

        </div>
        <div className="location">
          <p>last know location :</p>
          <p>{character.location.name}</p>

        </div>
        <div className="actions">
        {isAddToFavourite ? <p>Already to add favourites ✅</p> :
        <button onClick={()=>onAddFavourite(character)}
         className="btn btn--primary">
         Add to Favourite
         </button>
        
        }
        </div>
      </div>
     </div>
     
    <div className="character-episodes">
      <div className="title">
        <h2>List of Episodes:</h2>
        <button>
          <ArrowUpCircleIcon className="icon"/>
        </button>
      </div>
      <ul>
        {
        episodes.map((item,index)=>(
        <li key={item.id}> 
        <div>
        {String(index + 1).padStart(2,0)} - {item.episode} :<strong>{item.name} </strong>
        </div>
        <div className="badge badge--secondary">{item.air_date}</div>
        </li>
        ))
        }
      </ul>
    </div>
   </div>
  )
}

export default CharacterDetail