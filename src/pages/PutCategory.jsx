import ButtonBox from "@/components/ButtonBox";
import ButtonRound from "@/components/ButtonRound";
import PlaceHolderRound from "@/components/PlaceHolderRound";
import useProjectStore from "@/store/project";
import { useEffect } from "react";
import { useState } from "react";

function PutCategory() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const setCategory = useProjectStore( state => state.setCategory);

  useEffect(() => {
    // 인기 검색어 (카테고리들) 를 불러오는 비동기함수
    const fetchCategories = async () => {
      // 데이터를 가져오는 비동기 요청
      // const response = await fetch(); // API
      // const data = await response.json();
      const data = ['웹 개발', '신제품 기획', '편집디자인', '건축 설계', '카페 창업']; // 예시 데이터
      setCategories(data);
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  }

  const handleConfirmClick = () => {
    setCategory(selectedCategory);
  }

  return (
    <>
      <p className="mt-6 mb-7 text-headline2">
        우리 팀의<br/>
        프로젝트 분야를 알려주세요
      </p>
      <PlaceHolderRound
        name="search"
        label="검색"
        placeholder="검색어를 입력해주세요"
        type="text"
      />
      <p className="text-headline4 mt-12 mb-2">인기 검색어</p>
      <ul className="flex flex-row flex-wrap gap-2">
        {categories.map(( category, index ) => (
          <li key={index}>
            <ButtonRound
              status={selectedCategory === category ? "selected" : null}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </ButtonRound>
          </li>
        ))}
      </ul>
      <ButtonBox
        navigateTo = '/putduration'
        onClick={handleConfirmClick}
      >
        확인
      </ButtonBox>
    </>
  )
}

export default PutCategory;