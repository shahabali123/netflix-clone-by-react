import React, { useEffect, useState } from 'react'
import './Home.scss'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { IoStar } from "react-icons/io5";
import { BiPlay } from 'react-icons/bi';
import { BiPlus } from 'react-icons/bi';


const apiKey = "9356ebd8c66b252a249e9f07100fc257";
const url = "https://api.themoviedb.org/3/movie";
const imgUrl = "https://image.tmdb.org/t/p/w500";
const upcoming = "/upcoming"
const popular = "/popular"
const nowPlaying = "/now_playing"
const topRated = "/top_rated"

const Card = ({ img })=>{
  return(
    <img className='card' src={img} alt="cover" />
  )
}

const Row = ({title, arr = [{
  img: "https://static1.squarespace.com/static/529e3f47e4b0437241215504/529f7c20e4b0cf8c82ffa7cb/59325b1115d5dbfb007dff91/1496535815596/Gal-Gadot-Wonder-Woman-Poster.jpg",
}] })=>(

    <div className="row">

      <h2>{title}</h2>

      <div>
        {
          arr.map((card, index)=>(
           
              <Card key={index} img={`${imgUrl}${card.poster_path}`} />
              )
            )
          }
       
      </div>

    </div> 
)



function Home() {

  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [genre, setGenre] = useState([]);



  useEffect(() => {
    const fetchPopular = async()=>{
      const {data: {results}} = await axios.get(`${url}${popular}?api_key=${apiKey}&page=2`)
      setPopularMovies(results)
    };
    const fetchTopRated = async()=>{
      const {data: {results}} = await axios.get(`${url}${topRated}?api_key=${apiKey}`)
      setTopRatedMovies(results)
    }
    const fetchNowPlaying = async()=>{
      const {data: {results}} = await axios.get(`${url}${nowPlaying}?api_key=${apiKey}`)
      setNowPlayingMovies(results)
    }
    const fetchUpcoming = async()=>{
      const {data: {results}} = await axios.get(`${url}${upcoming}?api_key=${apiKey}`) 
      setUpcomingMovies(results)
    }
    const fetchGenre = async()=>{
      const {data: {genres}} = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`)
      setGenre(genres);
    }  



    fetchPopular();
    fetchTopRated();
    fetchNowPlaying();
    fetchUpcoming();
    fetchGenre();

  }, [])
  



  return (
    <section className='home'>
      <div className="banner" style={
        {
          backgroundImage: popularMovies[0]? `url(${imgUrl}${popularMovies[0].poster_path})` : "",
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
        }
      }>
        <div className="banner_contents">
          <h1 className="banner_title">
            {popularMovies[0]? popularMovies[0].title : ""}
          </h1>

          <p className='description'>
            {popularMovies[0]? popularMovies[0].overview : ""}
          </p>

          <p className='rating'>
            Over All Rating: <IoStar /> 
{popularMovies[0]? popularMovies[0].vote_average : ""}
          </p>
          
        </div>

        <div className='buttons'>
         
          <button> <BiPlay/> Play  </button>
          <button>  My List <BiPlus/> </button>
        </div>
        
        
      </div>

      <Row title={"Popular on Netflix"} arr={popularMovies}/>
      <Row title={"My List"} arr={topRatedMovies}/>
      <Row title={"TV Shows"} arr={nowPlayingMovies}/>
      <Row title={"Movies"} arr={upcomingMovies}/>


      <div className="genreBox">
        {
        genre.map((item)=>(
          <Link key={item.id} to={`/genre/${item.id}`}>{item.name}</Link>
        ))
        }
      </div>
      

    </section>
  )
}

export default Home