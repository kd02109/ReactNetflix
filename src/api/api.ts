const API_KEY = "f882c4f175c45fbc509f65e1fcfca202";
const BASE_PATH = "https://api.themoviedb.org/3/";

interface IMovie {
  poster_path: string;
  overview: string;
  release_date: string;
  id: number;
  original_title: string;
  title: string;
  backdrop_path: string;
  popularity: number;
  vote_count: number;
  vote_average: number;
}

export interface IGetMoviesResult {
  page: number;
  results: IMovie[];
  dates: {
    maximum: string;
    minimum: string;
  };
  total_pages: number;
  total_results: number;
}

export interface ISearchMovie {
  backdrop_path: string;
  genres: [{ id: number; name: string }];
  id: number;
  string: string;
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  runtime: number;
  tagline: string;
  title: string;
  vote_average: number;
}

interface ITv {
  poster_path: string;
  overview: string;
  first_air_date: string;
  id: number;
  original_name: string;
  name: string;
  backdrop_path: string;
  popularity: number;
  vote_count: number;
  vote_average: number;
}

export interface IGetTv {
  page: number;
  results: ITv[];
  total_pages: number;
  total_results: number;
}

export interface ISearchTv {
  backdrop_path: string;
  genres: [{ id: number; name: string }];
  id: number;
  string: string;
  original_name: string;
  overview: string;
  poster_path: string;
  first_air_date: string;
  name: string;
  vote_average: number;
  number_of_episodes: number;
  number_of_seasons: number;
}

//API MOVIE
export async function getMovieNowPlaying() {
  return fetch(
    `${BASE_PATH}movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`
  ).then((response) => response.json());
}
export async function getMoviePopular() {
  return fetch(
    `${BASE_PATH}movie/popular?api_key=${API_KEY}&language=en-US&page=1&region=KR`
  ).then((response) => response.json());
}
export async function getMovieTopRated() {
  return fetch(
    `${BASE_PATH}movie/top_rated?api_key=${API_KEY}&language=en-US&page=1&region=KR`
  ).then((response) => response.json());
}
export async function getMovieUpComing() {
  return fetch(
    `${BASE_PATH}movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=KR`
  ).then((response) => response.json());
}
export async function getMovieDetail(id: string) {
  return fetch(
    `${BASE_PATH}movie/${id}?api_key=${API_KEY}&language=en-US`
  ).then((response) => response.json());
}

//API TV

export async function getTvOntheAir() {
  return fetch(
    `${BASE_PATH}tv/on_the_air/?api_key=${API_KEY}&language=en-US&page=1`
  ).then((response) => response.json());
}
export async function getTvPopular() {
  return fetch(
    `${BASE_PATH}tv/popular?api_key=${API_KEY}&language=en-US&page=1`
  ).then((response) => response.json());
}
export async function getTvTopRated() {
  return fetch(
    `${BASE_PATH}tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`
  ).then((response) => response.json());
}
export async function getTvSearch(id: string) {
  return fetch(`${BASE_PATH}tv/${id}?api_key=${API_KEY}&language=en-US`).then(
    (response) => response.json()
  );
}
