import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { getTvSearch, ISearchTv } from "../../api/api";
import { makeImagePath } from "../../utils/utils";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
`;
const BigMovie = styled(motion.div)`
  width: 60vw;
  height: 90vh;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  background-color: ${(props) => props.theme.black.lighter};
  border-radius: 50px;
  overflow: hiden;
`;

const BigImg = styled.div`
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  width: 100%;
  height: 45vh;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
`;

const PosterImg = styled.div`
  width: 17vw;
  height: 43vh;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center center;
  position: absolute;
  top: 150px;
  left: 20px;
  border-radius: 10px;
`;

const DetailBox = styled.div`
  width: 60%;

  p {
    display: block;
    padding: 20px;
    position: relative;
    top: -2em;
    left: 15em;
  }
`;

const TitleBox = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  top: -9em;
  left: 16em;

  h2 {
    color: ${(props) => props.theme.white.lighter};
    font-size: 28px;
    &:nth-child(2) {
      color: #e84118;
      margin-left: 10px;
    }
  }
`;

const GenreTag = styled.span`
  position: relative;
  top: -7.5em;
  left: 15.5em;
  opacity: 0.7;
  margin-left: 10px;
  background-color: #273c75;
  padding: 5px 10px;
  border-radius: 10px;
`;

const ReleaseDate = styled.span`
  position: relative;
  top: 9em;
  left: 1.4em;
  opacity: 0.7;
`;

interface IBigSearchProp {
  id: string;
  menu: string;
  keyword: string | null;
  option: string;
}

function BigScreenSearchTv({ id, menu, keyword, option }: IBigSearchProp) {
  const history = useHistory();
  const { data: searchTv } = useQuery<ISearchTv>(`searchTv${id}`, () =>
    getTvSearch(id)
  );

  const onClickBackHome = () => {
    history.push(`/search?keyword=${keyword}`);
  };
  return (
    <>
      <Overlay onClick={onClickBackHome} />
      <BigMovie>
        <>
          <BigImg
            style={{
              backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                searchTv?.backdrop_path || searchTv?.poster_path || "",
                "w500"
              )})`,
            }}
          ></BigImg>
          <PosterImg
            style={{
              backgroundImage: `url(${makeImagePath(
                searchTv?.poster_path || searchTv?.backdrop_path || "",
                "w500"
              )})`,
            }}
          />
          <ReleaseDate>Release Date: {searchTv?.first_air_date}</ReleaseDate>
          <DetailBox>
            <TitleBox>
              <h2>{searchTv?.name}</h2>
              <h2>{searchTv?.vote_average.toFixed(1)}</h2>
            </TitleBox>
            {searchTv?.genres.map((data) => (
              <GenreTag>{data.name}</GenreTag>
            ))}
            <p>{searchTv?.overview}</p>
          </DetailBox>
        </>
      </BigMovie>
    </>
  );
}

export default BigScreenSearchTv;
