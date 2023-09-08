import Button from "../../components/Button";
import TextField from "../../components/TextField";
import { toastError, toastSuccess } from "../../components/Toast";
import { post } from "../../api/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordMessages, setPasswordMessages] = useState("");
  const navigate = useNavigate();

  const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setPasswordMessages("");
    try {
      const response = await post("login", {
        username: username,
        password: password,
      });
      const access_token = response?.data.data.acess_token;
      Cookies.set("access_token", access_token, { expires: 7 });
      navigate("/");
      toastSuccess(response?.data.meta.message);
    } catch (error) {
      toastError((error as any).response.data.meta.message as string);
      setPasswordMessages((error as any).response.data.data.error as string);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex h-screen w-full flex-col justify-center bg-[url(/assets/background.svg)] bg-cover px-5 md:px-[20%] lg:px-[35%]">
        <form
          onSubmit={(e) => onLogin(e)}
          className="flex h-auto w-full flex-col items-center rounded-lg bg-seccondaryWhite px-9 py-14"
        >
          <h1 className="text-center text-24 font-bold text-black">
            Selamat Datang!
          </h1>
          <TextField
            required
            style="mb-5 mt-7"
            type={"standart"}
            label={""}
            placeholder={"Username"}
            helpertext={""}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            required
            style="mb-16"
            type={"action right"}
            label={""}
            placeholder={"Password"}
            helpertext={passwordMessages}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div>
            <Button
              text={"Masuk"}
              type={"submit"}
              style={"primary"}
              isLoading={isLoading}
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
