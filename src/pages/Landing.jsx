import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();
  const handleEntry = () => {
    navigate('putprojectname');
  };

  return(
    <button
      className="w-auto h-20 m-7 p-7 flex justify-center items-center bg-blue-300"
      onClick={handleEntry}
    >
      클릭해서 프로젝트 생성 창으로 넘어가세요
    </button>
  )
}

export default Landing;