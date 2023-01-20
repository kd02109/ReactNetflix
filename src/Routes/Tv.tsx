import { useQuery } from "react-query";
import styled from "styled-components";
import { getTvOntheAir, getTvPopular, getTvTopRated, IGetTv } from "../api/api";
import SliderTv from "../Components/tv/SliderTv";
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
  const { data: tvNow, isLoading: tvNowIsLoading } = useQuery<IGetTv>(
    "tvNowPlaying",
    getTvOntheAir
  );
  const { data: tvPopular, isLoading: tvPopularisLoading } = useQuery<IGetTv>(
    "tvPopular",
    getTvPopular
  );
  const { data: tvRated, isLoading: tvRatedIsLoading } = useQuery<IGetTv>(
    "tvSearch",
    getTvTopRated
  );

  return (
    <Wrapper>
      {tvNowIsLoading && tvPopularisLoading && tvRatedIsLoading ? (
        <Loader>Loading</Loader>
      ) : (
        <>
          <Banner
            bgPhoto={makeImagePath(
              tvNow?.results[0].backdrop_path ||
                tvNow?.results[0].poster_path ||
                ""
            )}
          >
            <Title>{tvNow?.results[0].name}</Title>
            <Overview>{tvNow?.results[0].overview}</Overview>
          </Banner>
          <SliderTv option={"new"} title={"Now Playing"} data={tvNow} />
          <SliderTv option={"rated"} title={"Top Rated"} data={tvRated} />
          <SliderTv option={"popular"} title={"Popular"} data={tvPopular} />
        </>
      )}
    </Wrapper>
  );
}
export default Tv;
