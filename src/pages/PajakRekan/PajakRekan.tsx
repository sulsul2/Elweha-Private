import { useEffect, useState } from "react";
import Dropdown from "../../components/Dropdown";
import Button from "../../components/Button";
import Table from "../../components/Table";
import Paginate from "../../components/Paginate";
import TextField from "../../components/TextField";
import Modal from "../../components/Modal";
import DateFieldNormal from "../../components/DateFieldNormal";
import LoadingPage from "../../components/LoadingPage";
import { dataMonth } from "../../data/month";
import { toastError, toastSuccess } from "../../components/Toast";
import { getWithAuth, postWithAuth } from "../../api/api";
import { FormatRupiah } from "@arismun/format-rupiah";

function PajakRekan() {
  // Loading
  const [isLoading, setIsLoading] = useState(true);
  const [isTableLoad, setIsTableLoad] = useState(false);
  const [isAddRekan, setIsAddRekan] = useState(false);
  const [isEditRekan, setIsEditRekan] = useState(false);
  const [isHapusRekan, setIsHapusRekan] = useState(false);

  // PopUp
  const [showTambahRekan, setShowTambahRekan] = useState(false);
  const [showEditRekan, setShowEditRekan] = useState(false);
  const [showHapusRekan, setShowHapusRekan] = useState(false);
  const [showTambahAkta, setShowTambahAkta] = useState(false);

  // Dropdown
  const [rekanData, setRekanData] = useState<
    Array<{ value: string; label: string }>
  >([]);

  //Field
  const [period, setPeriod] = useState<{ value: string; label: string }>();
  const [rekan, setRekan] = useState<{ value: string; label: string }>();
  const [namaRekan, setNamaRekan] = useState("");
  const [biayaJasa, setBiayaJasa] = useState("");
  const [searchRekan, setSearchRekan] = useState("");

  // Data
  const [dataRekan, setDataRekan] = useState([]);
  const [totalTransfer, setTotalTransfer] = useState(0);

  // Table
  const [pageRekan, setPageRekan] = useState(1);
  const [totalPageRekan, setTotalPageRekan] = useState(1);
  const [totalDataRekan, setTotalDataRekan] = useState(0);
  const [idEditRekan, setIdEditRekan] = useState(-1);
  const [onSelectedRekan, setOnSelectedRekan] = useState<Array<number>>([]);
  const data1 = [
    {
      id: 1,
      tanggal: "22 Jan 2023",
      noAwal: 1,
      noAkhir: 10,
      jumlahAkta: 10,
      update: "Vixell pada 16 Jul 2023 12.54",
    },
    {
      id: 2,
      tanggal: "22 Jan 2023",
      noAwal: 1,
      noAkhir: 10,
      jumlahAkta: 10,
      update: "Vixell pada 16 Jul 2023 12.54",
    },
    {
      id: 3,
      tanggal: "22 Jan 2023",
      noAwal: 1,
      noAkhir: 10,
      jumlahAkta: 10,
      update: "Vixell pada 16 Jul 2023 12.54",
    },
    {
      id: 4,
      tanggal: "22 Jan 2023",
      noAwal: 1,
      noAkhir: 10,
      jumlahAkta: 10,
      update: "Vixell pada 16 Jul 2023 12.54",
    },
    {
      id: 5,
      tanggal: "22 Jan 2023",
      noAwal: 1,
      noAkhir: 10,
      jumlahAkta: 10,
      update: "Vixell pada 16 Jul 2023 12.54",
    },
    {
      id: 6,
      tanggal: "22 Jan 2023",
      noAwal: 1,
      noAkhir: 10,
      jumlahAkta: 10,
      update: "Vixell pada 16 Jul 2023 12.54",
    },
    {
      id: 7,
      tanggal: "22 Jan 2023",
      noAwal: 1,
      noAkhir: 10,
      jumlahAkta: 10,
      update: "Vixell pada 16 Jul 2023 12.54",
    },
    {
      id: 8,
      tanggal: "22 Jan 2023",
      noAwal: 1,
      noAkhir: 10,
      jumlahAkta: 10,
      update: "Vixell pada 16 Jul 2023 12.54",
    },
    {
      id: 9,
      tanggal: "22 Jan 2023",
      noAwal: 1,
      noAkhir: 10,
      jumlahAkta: 10,
      update: "Vixell pada 16 Jul 2023 12.54",
    },
    {
      id: 10,
      tanggal: "22 Jan 2023",
      noAwal: 1,
      noAkhir: 10,
      jumlahAkta: 10,
      update: "Vixell pada 16 Jul 2023 12.54",
    },
  ];
  const kolomRekan = [
    "No",
    "Nama Rekan",
    "Biaya Jasa",
    "Jumlah Akta",
    "Jasa Bruto",
    "DPP",
    "DPP Akumulasi",
    "PPH Dipotong",
    "Pajak Akumulasi",
    "Transfer",
  ];
  const kolom1 = [
    "No",
    "Tanggal",
    "No.Awal",
    "No.Akhir",
    "Jumlah Akta",
    "Terakhir Diupdate",
  ];

  const token = localStorage.getItem("access_token");
  const getData = async () => {
    if (token) {
      try {
      } catch (error) {
        toastError("Get Some Data Failed");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const getPajakRekan = async () => {
    setOnSelectedRekan([]);
    setIsTableLoad(true);
    if (token) {
      try {
        const pajak_rekan = await getWithAuth(
          token,
          `pajak-rekan?limit=10&page=${pageRekan}&search=${searchRekan}`
        );
        setDataRekan(
          pajak_rekan.data.data.table.data.map((data: any) => {
            return {
              id: data.id,
              nama: data.nama,
              biaya_jasa: data.biaya_jasa,
              jumlah_akta: data.jumlah_akta,
              jasa_bruto: data.jasa_bruto,
              dpp: data.dpp,
              dpp_akumulasi: data.dpp_akumulasi,
              pph_potong: data.pph_dipotong,
              pajak_akumulasi: data.pajak_akumulasi,
              transfer: data.transfer,
            };
          })
        );
        setRekanData(
          pajak_rekan.data.data.table.data.map((data: any) => {
            return {
              value: data.id,
              label: data.nama,
            };
          })
        );
        setTotalTransfer(pajak_rekan.data.data.total_transfer);
        setTotalPageRekan(pajak_rekan.data.data.table.last_page);
        setTotalDataRekan(pajak_rekan.data.data.table.total);
      } catch (error) {
        console.log(error);
        toastError("Get Data Table Failed");
      } finally {
        setIsTableLoad(false);
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getPajakRekan();
  }, [pageRekan, totalDataRekan, period, searchRekan]);

  const tambahRekan = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsAddRekan(true);
    try {
      const response = await postWithAuth(
        "pajak-rekan",
        {
          nama_rekan: namaRekan,
          biaya_jasa: biayaJasa,
        },
        token ?? ""
      );
      toastSuccess(response.data.meta.message);
      setShowTambahRekan(false);
      setTotalDataRekan(totalDataRekan + 1);
    } catch (error) {
      toastError((error as any).response.data.data.error as string);
    } finally {
      setIsAddRekan(false);
    }
  };

  const editRekan = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsEditRekan(true);
    try {
      const response = await postWithAuth(
        "update-pajak-rekan",
        {
          id: idEditRekan,
          nama_rekan: namaRekan,
          biaya_jasa: biayaJasa,
        },
        token ?? ""
      );
      toastSuccess(response.data.meta.message);
      setShowEditRekan(false);
      setTotalDataRekan(totalDataRekan + 1);
    } catch (error) {
      toastError((error as any).response.data.data.error as string);
    } finally {
      setIsEditRekan(false);
    }
  };

  const hapusRekan = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsHapusRekan(true);
    try {
      const response = await postWithAuth(
        "delete-pajak-rekan",
        {
          selectedId: onSelectedRekan,
        },
        token ?? ""
      );
      toastSuccess(response.data.meta.message);
      setShowHapusRekan(false);
      setTotalDataRekan(totalDataRekan + 1);
    } catch (error) {
      toastError((error as any).response.data.meta.message as string);
    } finally {
      setIsHapusRekan(false);
    }
  };

  return (
    <>
      <LoadingPage isLoad={isLoading} />

      {/* Add Rekan */}
      <Modal
        visible={showTambahRekan}
        onClose={() => setShowTambahRekan(false)}
      >
        <form
          onSubmit={(e) => tambahRekan(e)}
          className="flex w-full flex-col gap-4"
        >
          <h1 className="text-center text-24 font-bold xl:text-start xl:text-40">
            Tambah Rekan
          </h1>
          <div className="flex flex-col justify-between gap-4 xl:flex-row">
            <div className="w-full">
              <p className="mb-2 text-16 font-semibold">Nama Rekan</p>
              <TextField
                required
                type={"standart"}
                placeholder={"Masukkan Nama Rekan"}
                onChange={(e) => setNamaRekan(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col justify-between gap-4 xl:flex-row">
            <div className="w-full">
              <p className="mb-2 text-16 font-semibold">Biaya Jasa</p>
              <TextField
                required
                type={"standart"}
                placeholder={"Rp"}
                onChange={(e) => setBiayaJasa(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-5 flex w-full justify-center gap-4 xl:justify-end">
            <Button
              onClick={() => setShowTambahRekan(false)}
              text={"Batalkan"}
              type={"button"}
              style={"third"}
            />
            <Button
              text={"Tambah Data"}
              type={"submit"}
              style={"primary"}
              isLoading={isAddRekan}
            />
          </div>
        </form>
      </Modal>

      {/* Edit Rekan */}
      <Modal visible={showEditRekan} onClose={() => setShowEditRekan(false)}>
        <form
          onSubmit={(e) => editRekan(e)}
          className="flex w-full flex-col gap-4"
        >
          <h1 className="text-center text-24 font-bold xl:text-start xl:text-40">
            Edit Rekan
          </h1>
          <div className="flex flex-col justify-between gap-4 xl:flex-row">
            <div className="w-full">
              <p className="mb-2 text-16 font-semibold">Nama Rekan</p>
              <TextField
                required
                type={"standart"}
                placeholder={"Masukkan Nama Rekan"}
                value={namaRekan}
                onChange={(e) => setNamaRekan(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col justify-between gap-4 xl:flex-row">
            <div className="w-full">
              <p className="mb-2 text-16 font-semibold">Biaya Jasa</p>
              <TextField
                required
                type={"standart"}
                placeholder={"Rp"}
                value={biayaJasa}
                onChange={(e) => setBiayaJasa(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-5 flex w-full justify-center gap-4 xl:justify-end">
            <Button
              onClick={() => setShowEditRekan(false)}
              text={"Batalkan"}
              type={"button"}
              style={"third"}
            />
            <Button
              text={"Edit Data"}
              type={"submit"}
              style={"primary"}
              isLoading={isEditRekan}
            />
          </div>
        </form>
      </Modal>

      {/* Hapus Rekan */}
      <Modal visible={showHapusRekan} onClose={() => setShowHapusRekan(false)}>
        <form
          onSubmit={(e) => hapusRekan(e)}
          className="flex w-full flex-col gap-4"
        >
          <h1 className="text-center text-24 font-bold xl:text-start xl:text-40">
            Hapus Rekan
          </h1>
          <p className="mb-5 w-full text-center text-12 xl:text-left xl:text-16">
            Apakah Anda yakin menghapus data?
          </p>
          <div className="flex w-full justify-center gap-4 xl:justify-end">
            <Button
              onClick={() => setShowHapusRekan(false)}
              text={"Batalkan"}
              type={"button"}
              style={"third"}
            />
            <Button
              isLoading={isHapusRekan}
              text={"Hapus Data"}
              type={"submit"}
              style={"primary"}
            />
          </div>
        </form>
      </Modal>

      <Modal visible={showTambahAkta} onClose={() => setShowTambahAkta(false)}>
        <div className="flex w-full flex-col gap-4">
          <h1 className="text-center text-24 font-bold xl:text-start xl:text-40">
            Tambah Akta
          </h1>
          <div className="flex flex-col justify-between gap-4 xl:flex-row">
            <div className="w-full">
              <p className="mb-2 text-16 font-semibold">Tanggal</p>
              <DateFieldNormal text={"Masukkan Tanggel"} onChange={undefined} />
            </div>
          </div>
          <div className="flex flex-col justify-between gap-4 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <p className="mb-2 text-16 font-semibold">No Awal Angka</p>
              <TextField
                type={"standart"}
                label={""}
                placeholder={"Integer"}
                helpertext={""}
              />
            </div>
            <div className="w-full xl:w-1/2">
              <p className="mb-2 text-16 font-semibold">No Akhir Angka</p>
              <TextField
                type={"standart"}
                label={""}
                placeholder={"Integer"}
                helpertext={""}
              />
            </div>
          </div>
          <div className="flex w-full justify-center gap-4 xl:justify-end">
            <Button
              onClick={() => setShowTambahAkta(false)}
              text={"Batalkan"}
              type={"button"}
              style={"third"}
            />
            <Button text={"Tambah Data"} type={"button"} style={"primary"} />
          </div>
        </div>
      </Modal>

      <div className="flex min-h-screen w-full flex-col bg-background px-5 pb-9 pt-[104px] xl:px-24">
        <h1 className="mb-12 hidden text-40 font-bold xl:block">Pajak Rekan</h1>
        <div className="mb-5 flex w-full justify-between xl:justify-start">
          <p className="w-auto text-16 font-bold xl:w-[250px] xl:text-24">
            Total Transfer
          </p>
          <p className="text-16 font-semibold text-kText xl:text-24">
            <FormatRupiah value={totalTransfer} />
          </p>
        </div>
        <div className="mb-5 flex flex-col justify-between gap-11 xl:flex-row">
          <div className="flex w-full items-center justify-between xl:justify-start">
            <p className="w-auto text-16 font-bold xl:w-[250px] xl:text-24 ">
              Periode
            </p>
            <div className="w-[160px] md:w-[200px]">
              <Dropdown
                placeholder={"Select Period"}
                type={"month"}
                options={dataMonth(new Date("01/01/2000"), new Date())}
                onChange={(e) => setPeriod(e!)}
              />
            </div>
          </div>
          <div className="hidden w-full justify-center gap-4 xl:flex xl:justify-end">
            <Button
              onClick={() => setShowTambahRekan(true)}
              text={"Tambah Rekan +"}
              type={"button"}
              style={"primary"}
            />
          </div>
        </div>
        <p className="mb-5 block text-16 font-bold xl:hidden xl:text-24">
          Daftar Pajak Rekan
        </p>
        <div className="mb-5 flex w-full gap-4 xl:hidden xl:justify-end">
          <Button
            onClick={() => setShowTambahRekan(true)}
            text={"Tambah Rekan +"}
            type={"button"}
            style={"primary"}
          />
        </div>
        <div className="flex grow flex-col rounded-lg bg-white py-5 shadow-card">
          <div className="mb-5 flex w-full items-center justify-between gap-1 px-3">
            <p className="hidden text-16 font-bold xl:block xl:text-24">
              Daftar Pajak Rekan
            </p>
            <div className="flex items-center gap-2">
              <TextField
                type={"search"}
                placeholder={"Cari"}
                onChange={(e) => setSearchRekan(e.target.value)}
              />
              {/* <Button text={"Filter"} type={"button"} style={"seccondary"} /> */}
            </div>
            <div
              className={`${
                onSelectedRekan.length > 0 ? "visible" : "invisible"
              }`}
            >
              <Button
                onClick={() => setShowHapusRekan(true)}
                text={"Hapus"}
                type={"button"}
                style={"delete"}
              />
            </div>
          </div>
          <Table
            data={dataRekan}
            column={kolomRekan}
            isLoading={isTableLoad}
            page={pageRekan}
            dataLimit={10}
            onEdit={(val) => {
              setIdEditRekan((dataRekan[val] as any).id);
              setShowEditRekan(true);
              setNamaRekan((dataRekan[val] as any).nama);
              setBiayaJasa((dataRekan[val] as any).biaya_jasa);
            }}
            onSelected={(val) => setOnSelectedRekan(val)}
            selected={onSelectedRekan}
          />
          <Paginate
            totalPages={totalPageRekan}
            current={(page) => setPageRekan(page)}
            totalData={totalDataRekan}
            dataLimit={10}
          />
        </div>
      </div>

      {/* daftar akta */}
      <div className="flex min-h-screen w-full flex-col bg-background px-5 pb-24  xl:px-48">
        <div className="mb-5 hidden xl:block xl:text-end">
          <Button
            onClick={() => setShowTambahAkta(true)}
            text={"Tambah Data +"}
            type={"button"}
            style={"primary"}
          />
        </div>
        <p className="mb-5 block text-16 font-bold xl:hidden xl:text-24">
          Daftar Akta
        </p>
        <div className="mb-5 block xl:hidden xl:justify-end">
          <Button
            onClick={() => setShowTambahAkta(true)}
            text={"Tambah Data +"}
            type={"button"}
            style={"primary"}
          />
        </div>
        <div className="flex grow flex-col rounded-lg bg-white py-3 shadow-card">
          <div className="mb-5 flex w-full items-center justify-between gap-1 px-3">
            <p className="hidden text-16 font-bold xl:block xl:text-24">
              Daftar Akta
            </p>
            <div className="w-[160px] md:w-[200px]">
              <Dropdown
                placeholder={"Pilih Rekan"}
                type={"Rekan"}
                onChange={(e) => setRekan(e!)}
                options={rekanData}
              />
            </div>
            <Button text={"Hapus"} type={"button"} style={"delete"} />
          </div>
          <Table data={data1} column={kolom1} />
          <Paginate totalPages={10} />
        </div>
      </div>
    </>
  );
}

export default PajakRekan;
