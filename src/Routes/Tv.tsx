import { useQuery } from "react-query";
import styled from "styled-components";
import { getMovieNowPlaying, IGetMoviesResult } from "../api/api";
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

function Tv() {
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    "movieNowPlaying",
    getMovieNowPlaying
  );
  console.log(data, isLoading);
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading</Loader>
      ) : (
        <>
          <Banner bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}>
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
        </>
      )}
    </Wrapper>
  );
}
export default Tv;
