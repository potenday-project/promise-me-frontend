import ButtonBox from "@/components/ButtonBox";
import ButtonRound from "@/components/ButtonRound";
import PlaceholderRound from "@/components/PlaceHolderRound";
import useProjectStore from "@/store/project";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

function PutCategory() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const setCategory = useProjectStore( state => state.setCategory);

  useEffect(() => {
    // 인기 검색어 (카테고리들) 를 불러오는 비동기함수
    const fetchCategories = async () => {
      try {
        // 데이터를 가져오는 비동기 요청
        const response = await axios.get('http://43.201.85.197/project/category');
        const data = response.data;
  
        setCategories(data);
      } catch (error) {
        console.error('카테고리를 불러오는데 실패했습니다:', error);
      }
    };
    fetchCategories();
  }, []);
  

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  }

  const handleConfirmClick = () => {
    setCategory(selectedCategory);
    console.log(selectedCategory);
  }

  const category = useProjectStore((state) => state.category);
  console.log(category);

  useEffect(() => {
    console.log(category);
  }, [category]);

  return (
    <>
      <p className="mt-6 mb-7 text-headline2">
        우리 팀의<br/>
        프로젝트 분야를 알려주세요
      </p>
      <PlaceholderRound
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
      <div className="fixed w-[calc(100vw-32px)] bottom-4">
        <ButtonBox
          navigateTo = '/putduration'
          disable={!selectedCategory}
          onClick={handleConfirmClick}
        >
          확인
        </ButtonBox>
      </div>
    </>
  )
}

export default PutCategory;