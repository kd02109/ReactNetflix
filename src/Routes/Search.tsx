import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import {
  getMoviesSearch,
  getTvsSearch,
  IGetMoviesSearch,
  IGetTv,
} from "../api/api";
import Loader from "../Components/Loader";
import SearchSlideMv from "../Components/SearchSlideMv";

const Wrapper = styled.div`
  margin-top: 100px;
  width: 100%;
  height: 100%;
  padding: 20px;
`;
const Form = styled.form``;
const SearchTvMovie = styled.input`
  width: 300px;
  padding: 10px 20px;
  color: white;
  background-color: transparent;
  font-size: 20px;
`;

function Search() {
  //useLocation을 통해 지금 있는 곳에 관한 정보를 받아올 수 있다.
  const location = useLocation();
  const search = new URLSearchParams(location.search).get("keyword");
  const { register, handleSubmit } = useForm();
  console.log(location);
  console.log(search);

  const { data: moviesData, isLoading: moviesLodaing } =
    useQuery<IGetMoviesSearch>(`searchMovie${search}`, () =>
      getMoviesSearch(search || "")
    );
  const { data: tvsData, isLoading: tvsLodaing } = useQuery<IGetTv>(
    `searchTv${search}`,
    () => getTvsSearch(search || "")
  );
  console.log(moviesData, tvsData);
  return (
    <Wrapper>
      <Form>
        <SearchTvMovie
          type="text"
          {...register("searchTvMovie", { required: true, minLength: 2 })}
          placeholder="title"
        />
      </Form>
      {moviesLodaing && tvsLodaing ? (
        <Loader />
      ) : (
        <>
          <SearchSlideMv
            option={"search"}
            title={"Movie Search"}
            keyword={search || ""}
            data={moviesData}
          />
        </>
      )}
    </Wrapper>
  );
}

export default Search;
