import { useNavigate } from "react-router-dom";
import Button from "./Button";

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-5 text-center text-40 font-bold text-kOrange-400">
      <h1>Not Found 404</h1>
      <Button
        onClick={() => navigate("/")}
        text={"Back To Home"}
        type={"button"}
        style={"primary"}
      ></Button>
    </div>
  );
}

export default NotFound;
