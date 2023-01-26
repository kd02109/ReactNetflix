import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { getMoviesSearch, getTvsSearch, IGetMoviesSearch } from "../api/api";
import Modal from "../Components/searh/Modal";

const Wrapper = styled.div`
  margin-top: 100px;
  width: 100%;
  height: 100%;
  padding: 20px;
`;
const WrapperForm = styled.div`
  display: flex;
  justify-content: space-around;
`;
const Form = styled.form``;
const SearchTvMovie = styled.input`
  width: 300px;
  padding: 10px 20px;
  color: white;
  background-color: transparent;
  font-size: 20px;
`;
const SearhResult = styled.span`
  font-size: 30px;
`;

interface ISearchForm {
  searchTvMovie: string;
}

function Search() {
  //useLocation을 통해 지금 있는 곳에 관한 정보를 받아올 수 있다.
  const location = useLocation();
  const search = new URLSearchParams(location.search).get("keyword");
  const { register, handleSubmit } = useForm<ISearchForm>();
  console.log(location);
  console.log(search);
  const history = useNavigate();
  const { data: moviesData, isLoading: moviesLodaing } =
    useQuery<IGetMoviesSearch>(`searchMovie${search}`, () =>
      getMoviesSearch(search || "")
    );
  const { data: tvsData, isLoading: tvsLodaing } = useQuery<IGetMoviesSearch>(
    `searchTv${search}`,
    () => getTvsSearch(search || "")
  );

  const onVaild = (dataSearch: ISearchForm) => {
    history(`/search?keyword=${dataSearch.searchTvMovie}`);
  };
  return (
    <Wrapper>
      <WrapperForm>
        <Form onSubmit={handleSubmit(onVaild)}>
          <SearchTvMovie
            type="text"
            {...register("searchTvMovie", { required: true, minLength: 2 })}
            placeholder="title"
          />
        </Form>
        <SearhResult>
          {tvsData?.total_pages === 0 && moviesData?.total_pages === 0
            ? `Movies, Tv 모두 검색 결과가 없습니다.`
            : tvsData?.total_pages === 0 && moviesData?.total_pages !== 0
            ? `${search}로 검색한 결과입니다. 영화 검색 결과는 없습니다.`
            : tvsData?.total_pages !== 0 && moviesData?.total_pages === 0
            ? `${search}로 검색한 결과입니다. TV 프로그램 검색 결과는 없습니다.`
            : `${search}로 검색한 결과입니다.`}
        </SearhResult>
      </WrapperForm>
      <Modal
        data={moviesData}
        option={"Movie Search"}
        keyword={search}
        menu={"movie"}
      />
      <Modal data={tvsData} option={"Tv Search"} keyword={search} menu={"tv"} />
    </Wrapper>
  );
}

export default Search;
