import Button from "../../components/Button";
import TextField from "../../components/TextField";

function Login() {
  return (
    <div className="flex h-screen w-full flex-col justify-center bg-[url(./assets/background.svg)] bg-cover px-5 md:px-[20%] lg:px-[35%]">
      <form
        onSubmit={undefined}
        className="flex h-auto w-full flex-col items-center rounded-lg bg-seccondaryWhite px-9 py-14"
      >
        <h1 className="text-center text-24 font-bold text-black">
          Selamat Datang!
        </h1>
        <TextField
          style="mb-5 mt-7"
          type={"standart"}
          label={""}
          placeholder={"Username"}
          helpertext={""}
        />
        <TextField
          style="mb-16"
          type={"action right"}
          label={""}
          placeholder={"Password"}
          helpertext={""}
        />
        <div>
          <Button text={"Masuk"} type={"submit"} style={"primary"} />
        </div>
      </form>
    </div>
  );
}

export default Login;
