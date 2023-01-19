import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import styled from "styled-components";

import useWindowDimensions from "../utils/useWindowDimensions";
import { makeImagePath } from "../utils/utils";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { IGetMoviesResult, IGetMoviesSearch } from "../api/api";
import BigScreen from "./BigScreen";

const SlideBox = styled(motion.div)`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 200px;
  margin-top: 200px;
`;

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
  gap: 5px;
  align-self: center;
`;
const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-color: white;
  height: 200px;
  color: red;
  font-size: 66px;
  background-image: url(${(props) => props.bgPhoto});
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center center;
  &:last-child {
    transform-origin: center right;
  }
  &:first-child {
    transform-origin: center left;
  }
  display: flex;
  align-items: flex-end;
  cursor: pointer;
`;
const StyledIcon = styled(FontAwesomeIcon)`
  z-index: 99;
  opacity: 0.3;
  &:hover {
    opacity: 1;
  }
  color: #ff7675;
  cursor: pointer;
`;
const InfoBox = styled(motion.div)`
  padding: 5px 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  width: 100%;
  bottom: 0px;

  h4 {
    font-size: 18px;
    text-align: center;
    color: ${(props) => props.theme.white.darker};
  }
`;

const MenuTitle = styled.h2`
  position: absolute;
  font-size: 30px;
  top: -100px;
  margin-left: 20px;
`;
const scaleVariants: Variants = {
  normal: { scale: 1 },
  hover: {
    scale: 1.3,
    y: -50,
    transition: { delay: 0.5, type: "tween", duration: 0.3 },
  },
};

const infoVariants: Variants = {
  hover: { opacity: 1 },
};

interface ISliderProp {
  option: string;
  title: string;
  data?: IGetMoviesResult | IGetMoviesSearch;
  keyword: string;
}

function SearchSlideMv({ option, title, data, keyword }: ISliderProp) {
  const bigsearchMatch = useRouteMatch<{ id: string }>(`/search/movie/:id`);
  console.log(bigsearchMatch);
  const [back, setBack] = useState(false);
  const history = useHistory();
  const width = useWindowDimensions();
  const offset = 6;
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      setLeaving(true);
      setBack(false);
      const totalMovies = data.results.length;
      const maxIndex = Math.floor(totalMovies / offset);
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const decreaseIndex = () => {
    if (data) {
      if (leaving) return;
      setBack(true);
      setLeaving(true);
      setIndex((prev) => (prev === 0 ? 3 : prev - 1));
    }
  };
  const onBoxClick = (searchId: number) => {
    history.push(`/search/movie/${searchId}`);
  };

  return (
    <>
      <SlideBox>
        <MenuTitle>{title}</MenuTitle>
        <AnimatePresence
          initial={false}
          onExitComplete={() => setLeaving((prev) => !prev)}
          custom={{ back }}
        >
          <StyledIcon icon={faAngleLeft} size="6x" onClick={decreaseIndex} />
          <Row
            custom={{ back }}
            initial={{ x: back ? -width - 10 : width + 10 }}
            animate={{ x: 0 }}
            exit={{ x: back ? width + 10 : -width - 10 }}
            transition={{ type: "tween", duration: 1 }}
            key={index}
          >
            {data?.results
              .slice(offset * index, offset * index + offset)
              .map((movie) => (
                <Box
                  onClick={() => onBoxClick(movie.id)}
                  key={movie.id}
                  variants={scaleVariants}
                  whileHover="hover"
                  initial="normal"
                  transition={{ type: "tween" }}
                  bgPhoto={makeImagePath(
                    movie.backdrop_path || movie.poster_path,
                    "w500"
                  )}
                >
                  <InfoBox
                    variants={infoVariants}
                    transition={{ type: "tween", delay: 0.5, duration: 0.3 }}
                  >
                    <h4>{movie.title}</h4>
                  </InfoBox>
                </Box>
              ))}
          </Row>
          <StyledIcon icon={faAngleRight} size="6x" onClick={increaseIndex} />
        </AnimatePresence>
      </SlideBox>
      <AnimatePresence>
        {bigsearchMatch ? (
          <>
            <BigScreen id={bigsearchMatch.params.id} />
          </>
        ) : (
          <span>Nothing</span>
        )}
      </AnimatePresence>
    </>
  );
}

export default SearchSlideMv;

/*
const slideVariants: Variants = {
  start: ({ back }) => {
    return { x: back ? -window.outerWidth - 10 : window.outerWidth + 10 };
  },
  normal: { x: 0 },
  exit: ({ back }) => {
    return { x: back ? window.outerWidth + 10 : -window.outerWidth - 10 };
  },
};
*/
