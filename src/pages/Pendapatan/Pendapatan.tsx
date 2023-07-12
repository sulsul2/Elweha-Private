import Navbar from "../../components/Navbar";

function Pendapatan() {
  return (
    <>
      <Navbar />
      <div className="w-full px-5 pt-[104px] lg:px-64">
        <h1 className="mb-12 text-40 font-bold">Pendapatan</h1>
        <div className="mb-5 flex w-full justify-between md:justify-start md:gap-4">
          <p className="text-24 font-bold">Total Pendapatan</p>
          <p className="text-24 font-semibold text-kText">
            Rp 100.000.000.000,-
          </p>
        </div>
        <div className="flex justify-between">
          <div className="flex w-full justify-between md:justify-start md:gap-4">
            <p className="text-24 font-bold">Periode</p>
            <p className="text-24 font-semibold text-kText">
              Rp 100.000.000.000,-
            </p>
          </div>
          <div className="flex w-full justify-between md:justify-start md:gap-4">
            <p className="text-24 font-bold">Periode</p>
            <p className="text-24 font-semibold text-kText">
              Rp 100.000.000.000,-
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Pendapatan;
