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

export async function getMovieNowPlaying() {
  return fetch(
    `${BASE_PATH}movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`
  ).then((response) => response.json());
}
