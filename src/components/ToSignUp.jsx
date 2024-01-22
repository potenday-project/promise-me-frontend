import { Link } from "react-router-dom";

function ToSignUp() {
  return(
    <div className="flex gap-1 text-body5 justify-center">
        <p className="-text--grey600">
          아직 회원이 아니신가요?
        </p>
        <Link 
          className="-text--grey800 cursor-pointer underline"
          to="/signup"
        >
          회원가입하기
        </Link>
    </div>
  )
}

export default ToSignUp;