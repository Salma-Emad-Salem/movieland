import './App.css';
import { useEffect ,useState} from 'react';
import MovieCrad from './movie/MovieCrad';
import SearchIcon from './search.svg'

// Here is your key: 421be578
const API_URL= 'http://www.omdbapi.com?apikey=421be578';


function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  
  const movieSearch = async (title)=>{
    const response = await fetch(`${API_URL}&s=${title}`)
    const data = await response.json();
    setMovies(data?.Search)
    console.log(data.Search)
  }
  useEffect(()=>{
    movieSearch("Batman")

  },[])

  return (
    <div className="app">
      <h1>MovieLand</h1>
      <div className='search'>
        <input placeholder='Search for movies...'   value={searchTerm}   onChange={(e) => setSearchTerm(e.target.value)}/>
        <img src={SearchIcon} alt='searchicon' onClick={() =>movieSearch(searchTerm)}/>
      </div>
        
        {movies?.length > 0 ? (
          <div className="container">
            {movies.map((movie) => (
              <MovieCrad movie={movie} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <h2>No movies found</h2>
          </div>
        )}
    </div>
  );
}

export default App;
