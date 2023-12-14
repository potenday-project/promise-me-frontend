import ButtonBox from "@/components/ButtonBox";
import ButtonRound from "@/components/ButtonRound";
import PlaceHolderRound from "@/components/PlaceHolderRound";
import { useState } from "react";

function PutCategory() {
  const [select, setSelected] = useState();

  let a = ['웹 개발', '신제품 기획', '편집디자인', '건축 설계', '카페 창업'];

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
        {a.map(( item, index ) => (
          <li key={index}>
            <ButtonRound>{item}</ButtonRound>
          </li>
        ))}
      </ul>
      <ButtonBox
        navigateTo = '/'>
        확인
      </ButtonBox>
    </>
  )
}

export default PutCategory;