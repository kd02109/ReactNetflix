import styled from "styled-components";
import { IGetMoviesSearch } from "../../api/api";
import { makeImagePath } from "../../utils/utils";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { useHistory, useRouteMatch } from "react-router-dom";
import BigScreenSearch from "./BigScreenSearch";
import BigScreenSearchTv from "./BigScreenSearchTv";

interface IModalProps {
  data?: IGetMoviesSearch;
  option: string;
  keyword: string | null;
  menu: string;
}

interface IParams {
  id: string;
  menu: string;
}

const Wrapper = styled.div`
  margin-top: 20px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const MovieBox = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, 1fr);
`;

const Poster = styled(motion.div)`
  display: flex;
  align-items: flex-end;
  width: 200px;
  height: 200px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center center;
  cursor: pointer;
`;
const Search = styled.span`
  margin-bottom: 20px;
  font-size: 28px;
`;
const Box = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled(motion.span)`
  display: block;
  padding: 10px 10px;
  font-size: 15px;
  width: 100%;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
`;

const infoVariants: Variants = {
  hover: { opacity: 1 },
};

const scaleVariants: Variants = {
  normal: { scale: 1 },
  hover: {
    scale: 1.5,
    y: -50,
    transition: { delay: 0.5, type: "tween", duration: 0.3 },
  },
};

function Modal({ data, option, keyword, menu }: IModalProps) {
  const isMatch = useRouteMatch<IParams>(`/search/:menu/:id`);
  const history = useHistory();
  const onClick = (id: number) => {
    console.log(isMatch?.params.id);
    console.log(isMatch);
    history.push(`/search/${menu}/${id}?keyword=${keyword}`);
  };
  return (
    <Wrapper>
      {data?.total_pages === 0 ? (
        <span>검색결과가 없습니다.</span>
      ) : (
        <Box>
          <Search>{option}</Search>
          <MovieBox>
            {data?.results.slice(0, 10).map((data) => (
              <Poster
                onClick={() => onClick(data.id)}
                variants={scaleVariants}
                whileHover="hover"
                initial="normal"
                transition={{ type: "tween" }}
                key={data.id}
                style={{
                  backgroundImage: `url(${makeImagePath(
                    data.backdrop_path || data.poster_path
                  )})`,
                }}
                layoutId={data.id.toString()}
              >
                <Title
                  variants={infoVariants}
                  transition={{ type: "tween", delay: 0.5, duration: 0.3 }}
                >
                  {option === "Movie Search" ? data.title : data.original_name}
                </Title>
              </Poster>
            ))}
          </MovieBox>
          <AnimatePresence>
            {menu === "movie" && isMatch && (
              <BigScreenSearch
                id={isMatch.params.id}
                menu={"search"}
                keyword={keyword}
                option={"movie"}
              />
            )}
            {menu === "tv" && isMatch && (
              <BigScreenSearchTv
                id={isMatch.params.id}
                menu={"search"}
                keyword={keyword}
                option={"tv"}
              />
            )}
          </AnimatePresence>
        </Box>
      )}
    </Wrapper>
  );
}

export default Modal;
