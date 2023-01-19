import { useLocation } from "react-router-dom";

function Search() {
  //useLocation을 통해 지금 있는 곳에 관한 정보를 받아올 수 있다.
  const location = useLocation();
  const search = new URLSearchParams(location.search).get("keyword");
  console.log(location);
  console.log(search);

  return <div></div>;
}

export default Search;
