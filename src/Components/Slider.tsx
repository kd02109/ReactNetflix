import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion, AnimatePresence, Variants, useScroll } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import { useHistory, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { getMovieNowPlaying, IGetMoviesResult } from "../api/api";
import useWindowDimensions from "../utils/useWindowDimensions";
import { makeImagePath } from "../utils/utils";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { url } from "inspector";

const SlideBox = styled(motion.div)`
  position: relative;
  top: -150px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const BigMovie = styled(motion.div)`
  width: 30vw;
  height: 80vh;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  background-color: ${(props) => props.theme.black.lighter};
  border-radius: 50px;
  overflow: hiden;

  h2 {
    color: ${(props) => props.theme.white.lighter};
    padding: 20px;
    font-size: 30px;
    position: relative;
    top: -80px;
  }
  p {
    display: block;
    padding: 20px;
    position: relative;
    top: -80px;
  }
`;

const BigImg = styled.div`
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  width: 100%;
  height: 40vh;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
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

function Slider() {
  const bigMovieMatch = useRouteMatch<{ movieId: string }>("/movies/:movieId");
  const [back, setBack] = useState(false);
  const history = useHistory();
  const width = useWindowDimensions();
  const offset = 6;
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    "movieNowPlaying",
    getMovieNowPlaying
  );
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    data?.results.find(
      (movie) => movie.id.toString() === bigMovieMatch.params.movieId
    );
  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      setLeaving(true);
      setBack(false);
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.ceil(totalMovies / offset) - 1;
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
  const onBoxClick = (movieId: number) => {
    history.push(`/movies/${movieId}`);
  };
  const onClickBackHome = () => {
    history.push("/");
  };
  return (
    <>
      <SlideBox>
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
              .slice(1)
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
                  layoutId={`${movie.id}`}
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
        {bigMovieMatch ? (
          <>
            <Overlay
              onClick={onClickBackHome}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <BigMovie layoutId={`${bigMovieMatch.params.movieId}`}>
              {clickedMovie && (
                <>
                  <BigImg
                    style={{
                      backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                        clickedMovie.backdrop_path || clickedMovie.poster_path,
                        "w500"
                      )})`,
                    }}
                  ></BigImg>
                  <h2>{clickedMovie.title}</h2>
                  <p>{clickedMovie.overview}</p>
                </>
              )}
            </BigMovie>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default Slider;

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
