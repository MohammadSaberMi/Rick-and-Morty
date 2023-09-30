
import "./App.css";
import CharacterDetail from "./components/CharacterDetail";
import CharacterList from "./components/CharacterList";
import Navbar, { Favourites, Search, SearchResult } from "./components/Navbar";
import { allCharacters } from "../data/data";
import { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";
function App(){
  const [characters,setCharacter]=useState(allCharacters);
  const [isLoading ,setIsLoading]=useState(false);
  const [query,setQuery]=useState("");
  const [selectedId,setSlectedId]=useState(null);
  const [favourites,setFavourites]=useState([]);

  
  //not to fech in this way:

//  useEffect(()=>{
//    async function FechData(){
//try{
//      setIsLoading(true);
//     const res=await fetch("https://rickandmortyapi.com/api/character");
//     if(! res.ok) throw new Error("somthing went wrong");
//
//     const data=await res.json();
//     setCharacter(data.results.slice(0,5));
//     setIsLoading(false);
//      //.then((res)=>res.json())
//      //.then((data)=>setCharacter(data.results.slice(0,6)))
//    }
//  
//    catch(err){
////FOR REAL PROJECT: err.response.data.message
//
//    //console.log(err.message);
//    toast.error(err.message);
//    }finally{
//    setIsLoading(false);  
//    }
//
//  } 
//  FechData();
//   } ,[]);

//dependency arry : role ? when to run efect function
//1.useEffect (()=>{})=> on every render
//2.useEffect (()=>{},[])=>on mount 
//3.useEffect (()=>{},[state,props])=> dep. array chenge => run effect function
//useEffect (()=>{
//if(quary)...
//},[quary])

//when is use effct run ?
//state=>chenge=>re-render=>browser paint
//state->chenge-> run effect function -> setState!!!=>re-render
//---------------


useEffect(()=>{
  async function FechData(){
try{
    setIsLoading(true);
   const {data}=await axios.get(
    `https://rickandmortyapi.com/api/character/?name=${query}`
   );
   setCharacter(data.results.slice(0,5));
   setIsLoading(false);
    //.then((res)=>res.json())
    //.then((data)=>setCharacter(data.results.slice(0,6)))
  }

  catch(err){
//FOR REAL PROJECT: err.response.data.message
//console.log(err.response.data.error);
  //console.log(err.message);
  //toast.error(err.message);
  setCharacter([]);
  toast.error(err.response.data.error);

  }finally{
  setIsLoading(false);  
  }

} 

if(query.length<3){
  setCharacter([]);
return;
}
FechData();
 } ,[query]);

 //------then---axios----

  //useEffect(()=>{
  //    setIsLoading(true);
  //   axios.get("https://rickandmortyapi.com/api/character")
  //   
  //    .then(({data})=>{
  //      setCharacter(data.results.slice(0,6));
  //      //setIsLoading(false);
  //    }).catch( (err)=>{
  //      //setIsLoading(false);
  //      toast.error(err.response.data.error);
  //    }).finally(()=>{
  //    setIsLoading(false)
  //    }) ;
  // },[]);
 //-------------

  // useEffect(()=>{
  //    setIsLoading(true);
  //   fetch("https://rickandmortyapi.com/api/character")
  //    .then((res)=>{
  //    if(!res.ok) throw new Error("something went wrong!!");
  //    return res.json();
  //    })
  //    .then((data)=>{
  //      setCharacter(data.results.slice(0,6));
  //      //setIsLoading(false);
  //    }).catch( (err)=>{
  //      //setIsLoading(false);
  //      toast.error(err.message);
  //    }).finally(()=>{
  //    setIsLoading(false)
  //    }) ;
  // },[]);


  // const loadcharacter=()=>{
  //  fetch("https://rickandmortyapi.com/api/character")
  //  .then((res)=>res.json())
  //  .then((data)=>setCharacter(data.results.slice(0,3 )))
  //   
  //}
  //fech api timer access to dom ,... =>  efect : 1.event handler, useefect


//useEffect(()=>{
//console.log("CALL EFFECT ON EVERY RENDER");
//});
//useEffect(()=>{
//console.log("call effect on first mount");
//},[query]);
//
//console.log("rendering component");

const handleSelectCaracter=(id)=>{
  setSlectedId((priveId)=>priveId === id ?null:id);
}

const handleAddFavourite=(char)=>{
//setFavourites( [...favourites,char])
setFavourites((prive)=>[...prive,char])
}
const isAddToFavourite= favourites.map((fav)=>fav.id).includes(selectedId);

  return( <div className="app">
<Toaster/>
  {/*<button onClick={loadcharacter}>load data</button>*/}
<Navbar >
<Search query={query} setQuery={setQuery}/>
<SearchResult numOfResult={characters.length}/>
<Favourites numOfFavourte={favourites.length}/>
</Navbar>
<Main>
<CharacterList
selectedId={selectedId}
 characters={characters}
 isLoading={isLoading}
 onSelectCaracter={handleSelectCaracter}
 />
<CharacterDetail
 selectedId={selectedId}
 onAddFavourite={handleAddFavourite} 
 isAddToFavourite={isAddToFavourite}
 />
</Main>
  </div>
  );
}
export default App;
 
function Main({children}){
return <div className="main">
{children}


</div>
} 
//characters=> app=> !main=> characterlist