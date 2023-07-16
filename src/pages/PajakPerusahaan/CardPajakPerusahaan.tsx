import Checkbox from "../../components/Checkbox";

const CardPajakPerusahaan = () => {
  return (
    <div className=" mt-5 rounded-[10px] bg-white p-[30px] drop-shadow-card">
      <div className=" md:flex md:justify-between ">
        <p className="text-20 font-bold">Total Pendapatan</p>
        <p className="text-20">Rp100.000.0000.000,-</p>
      </div>
      <hr className=" mb-4 mt-1 h-[2px] bg-kGrey-100" />
      <div className=" flex justify-between">
        <Checkbox type="check" id="" label="Jenis 1" />
        <p>Rp100.000.0000.000,-</p>
      </div>
      <div className="mt-4 flex justify-between gap-1">
        <Checkbox type="check" id="" label="Jenis 2" />
        <p>Rp100.000.0000.000,-</p>
      </div>
      <div className="mt-4 flex w-full justify-between gap-1">
        <Checkbox type="check" id="" label="Jenis Lain Kalo ada" />
        <p className=" break-words">Rp100.000.0000.000,-</p>
      </div>
    </div>
  );
};

export default CardPajakPerusahaan;
