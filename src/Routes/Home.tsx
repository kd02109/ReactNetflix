import { useQuery } from "react-query";
import styled from "styled-components";
import {
  getMovieNowPlaying,
  IGetMoviesResult,
  getMoviePopular,
  getMovieTopRated,
  getMovieUpComing,
} from "../api/api";
import Slider from "../Components/Slider";
import { makeImagePath } from "../utils/utils";
const Wrapper = styled.div`
  background-color: black;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center center;
`;

const Title = styled.h2`
  font-size: 68px;
  width: 70%;
  margin-bottom: 20px;
`;
const Overview = styled.p`
  font-size: 26px;
  max-width: 50%;
`;

function Home() {
  const { data: movieNow, isLoading: nowIsLoading } =
    useQuery<IGetMoviesResult>("movieNowPlaying", getMovieNowPlaying);
  const { data: moviePopular, isLoading: popularisLoading } =
    useQuery<IGetMoviesResult>("moviePopular", getMoviePopular);
  const { data: movieTopRated, isLoading: topRatedIsLoading } =
    useQuery<IGetMoviesResult>("movieTopRated", getMovieTopRated);
  const { data: movieUpcoming, isLoading: upcomingIsLoading } =
    useQuery<IGetMoviesResult>("movieUpcoming", getMovieUpComing);

  return (
    <Wrapper>
      {nowIsLoading ? (
        <Loader>Loading</Loader>
      ) : (
        <>
          <Banner
            bgPhoto={makeImagePath(movieNow?.results[0].backdrop_path || "")}
          >
            <Title>{movieNow?.results[0].title}</Title>
            <Overview>{movieNow?.results[0].overview}</Overview>
          </Banner>
          <Slider option={"new"} title={"Now Playing"} data={movieNow} />
          <Slider option={"rated"} title={"Top Rated"} data={movieTopRated} />
          <Slider option={"upcoming"} title={"Upcoming"} data={movieUpcoming} />
          <Slider option={"popular"} title={"Popular"} data={moviePopular} />
        </>
      )}
    </Wrapper>
  );
}
export default Home;
