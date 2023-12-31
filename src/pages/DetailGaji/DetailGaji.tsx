import Dropdown from "../../components/Dropdown";
import { MouseEventHandler, useContext, useEffect, useState } from "react";
import { dataMonth } from "../../data/month";
import TextField from "../../components/TextField";
import Button from "../../components/Button";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { getWithAuth, postWithAuth } from "../../api/api";
import { useNavigate, useParams } from "react-router-dom";
import { perhitungan } from "../../data/perhitunganGaji";
import { toastError, toastSuccess } from "../../components/Toast";
import Modal from "../../components/Modal";
import { formatRp, formatRpReverse } from "../../data/formatRp";
import { UserContext } from "../../Context/UserContext";
import NotFound from "../../components/NotFound";
import { GajiPeriodContext } from "../../Context/GajiPeriodContext";
import { sparator, sparatorReverse } from "../../data/sparator";

interface BonusVariabel {
  nama: string;
  besar: string;
  jumlah: string;
  total: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

interface BonusSkil {
  nama: string;
  besar: string;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}

function BonusVariabelTile(bonus: BonusVariabel) {
  return (
    <div className="mt-2 flex justify-between">
      <div className="flex items-center gap-3 rounded-[10px]">
        <p className="font-semibold xl:text-20">{bonus.nama}</p>
        <p className="text-center">
          {formatRp(Number.parseFloat(bonus.besar))}
        </p>
        <p className="text-16 font-semibold">X</p>
        <p className="text-center">{bonus.jumlah}</p>
        <p className="text-20 font-semibold">=</p>
        <p className="font-semibold xl:text-20">
          {formatRp(Number.parseFloat(bonus.total))}
        </p>
      </div>
      <button
        type="button"
        onClick={bonus.onClick}
        className="text-20 text-kRed hover:text-red-500 active:text-red-700 xl:text-28"
      >
        <RiDeleteBin6Fill />
      </button>
    </div>
  );
}

function BonusSkilTile(bonus: BonusSkil) {
  return (
    <div className="mt-2 flex justify-between">
      <div className="flex items-center gap-12 rounded-[10px]">
        <p className="font-semibold xl:text-20">{bonus.nama}</p>
        <p className="text-center">
          {formatRp(Number.parseFloat(bonus.besar))}
        </p>
      </div>
      <button
        type="button"
        onClick={bonus.onClick}
        className="text-20 text-kRed hover:text-red-500 active:text-red-700 xl:text-28"
      >
        <RiDeleteBin6Fill />
      </button>
    </div>
  );
}

function DetailGaji() {
  const { id } = useParams();

  // Loading
  const [trigger, setTrigger] = useState(false);
  const [isTambahBonusSkil, setIsTambahBonusSkil] = useState(false);
  const [isTambahBonusVariabel, setIsTambahBonusVariabel] = useState(false);
  const [isHapusBonusVariabel, setIsHapusBonusVariabel] = useState(false);
  const [isHapusBonusSkil, setIsHapusBonusSkil] = useState(false);
  const [isEditGaji, setIsEditGaji] = useState(false);

  // PopUp
  const [showHapusVaribelBonus, setShowHapusVaribelBonus] = useState(false);
  const [showHapusSkilBonus, setShowHapusSkilBonus] = useState(false);
  const [showEditGaji, setShowEditGaji] = useState(false);
  const [jenisGaji, setJenisGaji] = useState<{
    value: string;
    label: string;
  }>();
  const [besarGaji, setBesarGaji] = useState("");

  // Dropdown
  const gajiPeriodContext = useContext(GajiPeriodContext);
  const [period, setPeriod] = useState<{ value: string; label: string }>(
    gajiPeriodContext
      ? gajiPeriodContext.period
      : dataMonth(new Date(), new Date())[0]
  );

  // Field
  const [namaBonusVariabel, setNamaBonusVariabel] = useState("");
  const [besarBonusVariabel, setBesarBonusVariabel] = useState("");
  const [jumlahBonusVariabel, setJumlahBonusVariabel] = useState("");
  const [namaBonusSkil, setNamaBonusSkil] = useState("");
  const [kehadiranId, setKehadiranId] = useState("");
  const [besarBonusSkil, setBesarBonusSkil] = useState("");

  // Dropdown
  const [jenisGajiData] = useState<Array<{ value: string; label: string }>>([
    { value: "0", label: "Tetap" },
    { value: "1", label: "Variabel" },
  ]);

  // Id Hapus
  const [hapusBonusVariabel, setHapusBonusVariabel] = useState(0);
  const [hapusBonusSkil, setHapusBonusSkil] = useState(0);

  // Data
  const [dataGaji, setDataGaji] = useState<any>();
  const [dataBonusVariabel, setDataBonusVariabel] = useState([]);
  const [dataBonusSkil, setDataBonusSkil] = useState([]);

  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const token = user?.token;
  if (user?.role != "BOD") {
    return <NotFound />;
  }

  const getGaji = async () => {
    if (token) {
      try {
        const gaji = await getWithAuth(
          token,
          `gaji?&month=${period ? period?.value.split("-")[0] : ""}&year=${
            period ? period?.value.split("-")[1] : ""
          }&id=${id}`
        );
        setDataBonusVariabel(
          gaji.data.data.data.length == 0 ? [] : gaji.data.data.data[0].variabel
        );
        setDataBonusSkil(
          gaji.data.data.data.length == 0 ? [] : gaji.data.data.data[0].skil
        );
        setKehadiranId(
          gaji.data.data.data.length == 0
            ? ""
            : gaji.data.data.data[0].kehadiran_id
        );
        setDataGaji(perhitungan(gaji).hasil[0]);
        setTrigger(false);
      } catch (error) {
        toastError("Get Data Table Failed");
      }
    }
  };

  useEffect(() => {
    getGaji();
  }, [period, trigger]);

  const tambahBonusVariabel = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsTambahBonusVariabel(true);
    console.log(kehadiranId);
    try {
      const response = await postWithAuth(
        "variabel-bonus",
        {
          nama_bonus: namaBonusVariabel,
          besar_bonus: sparatorReverse(besarBonusVariabel),
          jumlah: sparatorReverse(jumlahBonusVariabel),
          kehadiran_id: kehadiranId,
        },
        token ?? ""
      );
      toastSuccess(response.data.meta.message);
      setNamaBonusVariabel("");
      setBesarBonusVariabel("");
      setJumlahBonusVariabel("");
      setTrigger(true);
    } catch (error) {
      toastError((error as any).response.data.data.error as string);
    } finally {
      setIsTambahBonusVariabel(false);
    }
  };

  const tambahBonusSkil = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsTambahBonusSkil(true);
    try {
      const response = await postWithAuth(
        "skil-bonus",
        {
          nama_bonus: namaBonusSkil,
          besar_bonus: sparatorReverse(besarBonusSkil),
          kehadiran_id: kehadiranId,
        },
        token ?? ""
      );
      toastSuccess(response.data.meta.message);
      setNamaBonusSkil("");
      setBesarBonusSkil("");
      setTrigger(true);
    } catch (error) {
      toastError((error as any).response.data.data.error as string);
    } finally {
      setIsTambahBonusSkil(false);
    }
  };

  const hapusVariabelBonus = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsHapusBonusVariabel(true);
    try {
      const response = await postWithAuth(
        "delete-variabel-bonus",
        {
          kehadiran_id: kehadiranId,
          id: hapusBonusVariabel,
        },
        token ?? ""
      );
      toastSuccess(response.data.meta.message);
      setShowHapusVaribelBonus(false);
      setTrigger(true);
    } catch (error) {
      toastError((error as any).response.data.meta.message as string);
    } finally {
      setIsHapusBonusVariabel(false);
    }
  };

  const hapusSkilBonus = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsHapusBonusSkil(true);
    try {
      const response = await postWithAuth(
        "delete-skil-bonus",
        {
          kehadiran_id: kehadiranId,
          id: hapusBonusSkil,
        },
        token ?? ""
      );
      toastSuccess(response.data.meta.message);
      setShowHapusSkilBonus(false);
      setTrigger(true);
    } catch (error) {
      toastError((error as any).response.data.meta.message as string);
    } finally {
      setIsHapusBonusSkil(false);
    }
  };

  const editGaji = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsEditGaji(true);
    try {
      const response = await postWithAuth(
        "update-gaji",
        {
          id: id,
          nama_karyawan: dataGaji ? dataGaji.nama_karyawan : "",
          jenis_gaji: jenisGaji?.label,
          besar_gaji: sparatorReverse(besarGaji),
          tahun: period?.value.split("-")[1],
          bulan: period?.value.split("-")[0],
        },
        token ?? ""
      );
      toastSuccess(response.data.meta.message);
      setShowEditGaji(false);
      setTrigger(true);
    } catch (error) {
      toastError((error as any).response.data.data.error as string);
    } finally {
      setIsEditGaji(false);
    }
  };

  return (
    <>
      {/* Edit Gaji */}
      <Modal visible={showEditGaji} onClose={() => setShowEditGaji(false)}>
        <form
          onSubmit={(e) => editGaji(e)}
          className="flex w-full flex-col gap-4"
        >
          <h1 className="text-center text-24 font-bold xl:text-start xl:text-40">
            Edit Gaji Karyawan
          </h1>
          <div className="flex flex-col justify-between gap-4 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <p className="mb-2 text-16 font-semibold">Besar Gaji</p>
              <TextField
                required
                type={"standart"}
                placeholder={"Rp"}
                value={sparator(besarGaji)}
                onChange={(e) => setBesarGaji(e.target.value)}
              />
            </div>
            <div className="w-full xl:w-1/2">
              <p className="mb-2 text-16 font-semibold">Jenis Gaji</p>
              <Dropdown
                placeholder={"Jenis"}
                type={"Jenis"}
                options={jenisGajiData}
                value={jenisGaji}
                onChange={(e) => setJenisGaji(e!)}
              />
            </div>
          </div>
          <div className="mt-10 flex w-full justify-center gap-4 xl:justify-end">
            <Button
              onClick={() => setShowEditGaji(false)}
              text={"Batalkan"}
              type={"button"}
              style={"third"}
            />
            <Button
              text={"Edit Data"}
              type={"submit"}
              style={"primary"}
              isLoading={isEditGaji}
            />
          </div>
        </form>
      </Modal>

      {/* Hapus Bonus Varibel */}
      <Modal
        visible={showHapusVaribelBonus}
        onClose={() => setShowHapusVaribelBonus(false)}
      >
        <form
          onSubmit={(e) => hapusVariabelBonus(e)}
          className="flex w-full flex-col gap-4"
        >
          <h1 className="text-center text-24 font-bold xl:text-start xl:text-40">
            Hapus Variabel Bonus
          </h1>
          <p className="mb-5 w-full text-center text-12 xl:text-left xl:text-16">
            Apakah Anda yakin menghapus data?
          </p>
          <div className="flex w-full justify-center gap-4 xl:justify-end">
            <Button
              onClick={() => setShowHapusVaribelBonus(false)}
              text={"Batalkan"}
              type={"button"}
              style={"third"}
            />
            <Button
              isLoading={isHapusBonusVariabel}
              text={"Hapus Data"}
              type={"submit"}
              style={"primary"}
            />
          </div>
        </form>
      </Modal>

      {/* Hapus Bonus Skil */}
      <Modal
        visible={showHapusSkilBonus}
        onClose={() => setShowHapusSkilBonus(false)}
      >
        <form
          onSubmit={(e) => hapusSkilBonus(e)}
          className="flex w-full flex-col gap-4"
        >
          <h1 className="text-center text-24 font-bold xl:text-start xl:text-40">
            Hapus Skil Bonus
          </h1>
          <p className="mb-5 w-full text-center text-12 xl:text-left xl:text-16">
            Apakah Anda yakin menghapus data?
          </p>
          <div className="flex w-full justify-center gap-4 xl:justify-end">
            <Button
              onClick={() => setShowHapusSkilBonus(false)}
              text={"Batalkan"}
              type={"button"}
              style={"third"}
            />
            <Button
              isLoading={isHapusBonusSkil}
              text={"Hapus Data"}
              type={"submit"}
              style={"primary"}
            />
          </div>
        </form>
      </Modal>

      <div className="min-h-screen w-full bg-background px-5 pb-24 pt-[104px] xl:px-24">
        <div className="mb-12 flex flex-col md:flex-row md:items-center md:justify-between">
          <h1 className="text-40 font-bold xl:block">
            Detail Gaji {dataGaji ? dataGaji.nama_karyawan : ""}
          </h1>
          <Button
            text={"Kembali"}
            type={"button"}
            style={"third"}
            onClick={() => navigate("/gaji")}
          />
        </div>
        <div className="mb-5 flex w-full items-center justify-between xl:justify-start">
          <p className="w-auto text-16 font-bold md:text-24 xl:w-[250px] ">
            Total Gaji
          </p>
          <p className="text-16 font-semibold text-kText xl:text-24">
            {dataGaji ? dataGaji.total_gaji : "Rp 0"}
          </p>
        </div>
        <div className="mb-5 flex w-full items-center justify-between xl:justify-start">
          <p className="w-auto text-16 font-bold md:text-24 xl:w-[250px] ">
            PPH
          </p>
          <p className="text-16 font-semibold text-kText xl:text-24">
            {dataGaji ? dataGaji.pph_dipotong : "Rp 0"}
          </p>
        </div>
        <div className="mt-5 flex w-full flex-col justify-between gap-1 xl:flex-row">
          <p className="w-auto text-16 font-bold md:text-24 xl:w-[250px] ">
            Detail Gaji Bulanan
          </p>
          <div className="flex items-center justify-between xl:justify-start">
            <p className="w-auto text-center text-16 font-bold md:text-24 xl:w-[250px] ">
              Bulan
            </p>
            <div className="w-[160px] md:w-[200px]">
              <Dropdown
                placeholder={"Select Period"}
                type={"month"}
                options={dataMonth(new Date("01/01/2000"), new Date())}
                onChange={(e) => {
                  setPeriod(e!);
                  gajiPeriodContext?.updatePeriod(e!);
                }}
                isClearable={false}
                value={period}
              />
            </div>
          </div>
        </div>

        {/* dekstop */}
        <div className="mt-10 grid grid-cols-1 gap-x-5 gap-y-5 xl:grid-cols-2">
          <div className="rounded-[10px] bg-white drop-shadow-card xl:h-[240px]">
            <div className="p-5 xl:p-12">
              <div className="flex items-center justify-between">
                <p className="text-[16px] font-bold xl:text-[24px]">
                  Gaji Pokok
                </p>
                <p className="text-16 font-semibold text-kText xl:text-24">
                  {dataGaji ? dataGaji.besar_gaji : "Rp 0"}
                </p>
              </div>
              <div className="mb-6 mt-2 flex justify-between">
                <p className="text-20">{dataGaji ? dataGaji.jenis_gaji : ""}</p>
              </div>
              <Button
                onClick={() => {
                  setShowEditGaji(true);
                  setBesarGaji(
                    dataGaji ? formatRpReverse(dataGaji.besar_gaji) : ""
                  );
                  setJenisGaji(
                    dataGaji
                      ? jenisGajiData.filter(
                          (item) => item.label == dataGaji.jenis_gaji
                        )[0]
                      : undefined
                  );
                }}
                text={"Edit Data"}
                type={"button"}
                style={"primary"}
              />
            </div>
          </div>

          <div className="row-start-3 flex h-[350px] flex-col rounded-[10px] bg-white p-5 drop-shadow-card xl:col-start-2 xl:row-start-1 xl:p-10">
            <div className="flex items-center justify-between">
              <p className="text-[24px] font-bold">Variabel Bonus</p>
              <p className="text-16 font-semibold text-kText xl:text-24">
                {dataBonusVariabel
                  ? formatRp(
                      dataBonusVariabel.reduce(
                        (sum: number, { total }: any) => sum + total,
                        0
                      )
                    )
                  : "Rp 0"}
              </p>
            </div>
            <div className="flex grow flex-col overflow-auto">
              {dataBonusVariabel.map((value: any, index: number) => (
                <BonusVariabelTile
                  key={index}
                  nama={value.nama_bonus}
                  besar={value.besar_bonus}
                  jumlah={value.jumlah}
                  total={value.total}
                  onClick={() => {
                    setShowHapusVaribelBonus(true);
                    setHapusBonusVariabel(value.id);
                  }}
                />
              ))}
            </div>
            {dataGaji && dataGaji.jenis_gaji == "Variabel" && kehadiranId ? (
              <form
                onSubmit={(e) => tambahBonusVariabel(e)}
                className="mt-2 flex flex-col items-center xl:flex-row xl:justify-between"
              >
                <div className="flex w-full items-center gap-3 rounded-[10px] border-2 border-black p-2 xl:w-[500px]">
                  <TextField
                    type="standart"
                    placeholder="Nama Bonus"
                    onChange={(e) => setNamaBonusVariabel(e.target.value)}
                    value={namaBonusVariabel}
                    required
                  />
                  <TextField
                    type="standart"
                    placeholder="Besar Bonus"
                    onChange={(e) => setBesarBonusVariabel(e.target.value)}
                    value={sparator(besarBonusVariabel)}
                    required
                  />
                  <p className="text-16 font-semibold">X</p>
                  <TextField
                    type="standart"
                    placeholder="Jumlah"
                    onChange={(e) => setJumlahBonusVariabel(e.target.value)}
                    value={sparator(jumlahBonusVariabel)}
                    required
                  />
                  <p className="text-20 font-semibold">=</p>
                  <p className="text-20 font-semibold">
                    {besarBonusVariabel && jumlahBonusVariabel
                      ? sparator(
                          (
                            Number.parseFloat(
                              sparatorReverse(besarBonusVariabel)
                            ) *
                            Number.parseFloat(
                              sparatorReverse(jumlahBonusVariabel)
                            )
                          ).toString()
                        )
                      : 0}
                  </p>
                </div>
                <div className="mt-2 xl:ml-2 xl:mt-0">
                  <Button
                    type="submit"
                    text="Tambah Bonus +"
                    style="primary"
                    isLoading={isTambahBonusVariabel}
                  />
                </div>
              </form>
            ) : (
              <h1 className="text-center">
                {kehadiranId
                  ? "Jenis Gaji Anda Tetap"
                  : "Anda belum mengisi presensi pada bulan ini"}
              </h1>
            )}
          </div>

          <div className="rounded-[10px] bg-white drop-shadow-card xl:h-[214px]">
            <div className="p-5 xl:p-12">
              <div className="flex items-center justify-between">
                <p className="text-[24px] font-bold">Bonus Kehadiran</p>
                <p className="text-16 font-semibold text-kText xl:text-24">
                  {dataGaji ? dataGaji.bonus_kehadiran : "Rp 0"}
                </p>
              </div>
              <div className="mt-2 flex justify-between">
                <p className="text-20">Kehadiran</p>
                <p className="text-20">
                  {dataGaji
                    ? `${dataGaji.kehadiran.split("/")[0]} dari ${
                        dataGaji.kehadiran.split("/")[1]
                      } hari`
                    : "0 dari 0 hari"}
                </p>
              </div>
              <div className="mt-2 flex justify-between">
                <p className="text-20">Keterlambatan</p>
                <p className="text-20">
                  {dataGaji ? `${dataGaji.terlambat} hari` : "0 hari"}
                </p>
              </div>
            </div>
          </div>

          <div className="flex h-[350px] flex-col rounded-[10px] bg-white p-5 drop-shadow-card xl:p-10">
            <div className="flex items-center justify-between">
              <p className="text-[24px] font-bold">Skil Bonus</p>
              <p className="text-16 font-semibold text-kText xl:text-24">
                {dataBonusSkil
                  ? formatRp(
                      dataBonusSkil.reduce(
                        (sum: number, { besar_bonus }: any) =>
                          sum + besar_bonus,
                        0
                      )
                    )
                  : "Rp 0"}
              </p>
            </div>
            <div className="flex grow flex-col overflow-auto">
              {dataBonusSkil.map((value: any, index: number) => (
                <BonusSkilTile
                  key={index}
                  nama={value.nama_bonus}
                  besar={value.besar_bonus}
                  onClick={() => {
                    setShowHapusSkilBonus(true);
                    setHapusBonusSkil(value.id);
                  }}
                />
              ))}
            </div>
            {dataGaji && dataGaji.jenis_gaji == "Variabel" && kehadiranId ? (
              <form
                onSubmit={(e) => tambahBonusSkil(e)}
                className="mt-2 flex flex-col items-center xl:flex-row xl:justify-between"
              >
                <div className="flex w-full items-center gap-3 rounded-[10px] border-2 border-black p-2 xl:w-[500px]">
                  <TextField
                    type="standart"
                    placeholder="Nama Bonus"
                    onChange={(e) => setNamaBonusSkil(e.target.value)}
                    value={namaBonusSkil}
                    required
                  />
                  <TextField
                    type="standart"
                    placeholder="Besar Bonus"
                    onChange={(e) => setBesarBonusSkil(e.target.value)}
                    value={sparator(besarBonusSkil)}
                    required
                  />
                </div>
                <div className="mt-2 xl:ml-2 xl:mt-0">
                  <Button
                    type="submit"
                    text="Tambah Bonus +"
                    style="primary"
                    isLoading={isTambahBonusSkil}
                  />
                </div>
              </form>
            ) : (
              <h1 className="text-center">
                {kehadiranId
                  ? "Jenis Gaji Anda Tetap"
                  : "Anda belum mengisi presensi pada bulan ini"}
              </h1>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailGaji;
