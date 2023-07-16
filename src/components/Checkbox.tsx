import "./Checkbox.css";

function Checkbox({
  type,
  id,
  label,
  description,
}: {
  type: "check" | "indeter" | undefined;
  id: string;
  label?: string;
  description?: string;
}) {
  return (
    <>
      <div className="flex h-auto w-full gap-3 justify-center">
        <input
          className={`${
            type == "indeter"
              ? "indetermark before:right-[5.5px]"
              : "checkmark before:right-[3px]"
          } checkmark relative h-[20px] w-[20px] cursor-pointer appearance-none rounded border-2 border-kGrey-300 outline-none before:absolute before:-bottom-[2.5px] before:border-white before:text-center before:font-bold before:text-white checked:border-kBlue-200 checked:bg-kBlue-200 hover:border-kBlue-300 checked:hover:border-kBlue-300 checked:hover:bg-kBlue-300 focus:outline focus:outline-kBlue-200 checked:focus:border-kBlue-200 focus:hover:border-kBlue-300 focus:hover:outline-kBlue-300 active:border-kBlue-400 checked:active:border-kBlue-400 checked:active:bg-kBlue-400 focus:active:border-kBlue-400 focus:active:outline-kBlue-400 disabled:opacity-30 disabled:hover:border-kGrey-300`}
          type="checkbox"
          id={id}
        />
        <label htmlFor={id} className="flex flex-col gap-[6px]">
          <p className="text-16 leading-none text-black">{label}</p>
          <p className="text-14 leading-none text-kGrey-300">{description}</p>
        </label>
      </div>
    </>
  );
}

export default Checkbox;
