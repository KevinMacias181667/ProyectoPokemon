import './App.css';
import { useEffect, useState } from 'react';
//import abilities from './PokemonComp/abilities'
import Popup from './pokemon/abilities';
function App () {
  const [pokemon, setPokemon] = useState({});
  const [buttonPopup,setButtonPopup]= useState(false);
  const [busqueda, setBusqueda]= useState("");

  const fetchPokemon =(id)=>{
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then((response) => response.json())
    .then((data) => setPokemon(data));
  };

  const onChange = async e=>{
    e.persist();
    setBusqueda(e.target.value);
  }

  const fetchPokemonByname = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${busqueda}`)
      .then((response) => response.json())
      .then((data) => setPokemon(data))
      ;
  }; 

  const getRandomInt=(min = 1, max = 600)=> {
    return Math.floor(Math.random() * (max - min) + min);
  };

  const getNextInt=(min=1,max=600)=>{



    if(pokemon.id >=max){

      return pokemon.id = min;

    } else{

      return pokemon.id +1;
    }
  }

  const getBackInt=(min=1, max=600)=>{

    if(pokemon.id<=min){

    return pokemon.id=max;

  }else {

    return pokemon.id -1;

  }

}
  
  useEffect(() => {
    console.log({ pokemon });
  }, [pokemon]);
 
  return (
    <div className="App">
      
      <header className="App-header">
      <a className="alignleft" href="https://github.com/KevinMacias181667/POKEMON_TRABAJO.git" >Github</a>
      <div className="flex-container">   

      <img src={pokemon?.sprites?.back_default ??  "https://i.pinimg.com/originals/95/fc/30/95fc304b40461a9922bd1d3aff885496.png"} className="poke-image" alt="logo" />
      <img src={pokemon?.sprites?.front_default ?? "https://pngimg.com/uploads/pokeball/pokeball_PNG20.png"} className="poke-image" alt ="logo" />
      
      </div> 
        <p> {pokemon.name}</p>
        <p>Numero del pokemon: {pokemon.id ?? "no pokemon select"}</p>
        <p>Altura del pokemon: {pokemon.height} ft</p>
        <p>Peso del pokemon: {pokemon.weight} lb </p>
       
      

        <div className='Buscar'>
            <input type="text" placeholder="Buscar pokemon"
            value={busqueda} onChange={onChange}></input>
            <button className='button' 
            onClick={()=>fetchPokemonByname()}>Buscar</button>
          </div>
          
       <div className="flex-container"> 

       {pokemon.id ? (<><button className="button" onClick={() => fetchPokemon(getNextInt())}>Next</button>{" "}</>) : (<button className="button" onClick={() => fetchPokemon(1)}>Next</button>)}
  
      <button className="button" onClick={()=> fetchPokemon(getRandomInt())}>Random</button>

       {pokemon.id ? (<><button className="button"onClick={() => fetchPokemon(getBackInt())}>Back</button>{" "}</>) : (<button className="button" onClick={() => fetchPokemon(600)}>Back</button>)} 
        </div>
        <button className='button'onClick={()=>setButtonPopup(true)}>Abilities</button>

<Popup trigger={buttonPopup} setTrigger={setButtonPopup}>

<h3>{pokemon.name}</h3>

<ul className='text'>{pokemon?.abilities?.map((ability)=>(<li key={ability.ability.id}> {ability.ability.name}</li>))}

</ul>

</Popup>
        
          
         

      </header>
    </div>
  );
}

export default App;
