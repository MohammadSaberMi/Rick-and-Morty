import {HeartIcon} from "@heroicons/react/24/outline";
export default function Navbar({children}) {
  return <nav className="navbar">
    <Logo/>
    
    {children}
   
  </nav>
  
} 

function Logo(){
 return <div className="navbar__logo">LOGO😘</div>

}
export function Search({query ,setQuery}){
 return <input type="text" value={query} onChange={(e)=>setQuery(e.target.value)} className="text-field" placeholder="serch...." />

}
export function SearchResult({numOfResult}){
 return <div className="navbar__result">found {numOfResult} characters</div>

}
export function Favourites({numOfFavourte}){
   return <button className="heart">
      <HeartIcon className="icon"/>
      <span className="badge">{numOfFavourte}</span>
    </button>

}

// APP => navbar=> searchresult