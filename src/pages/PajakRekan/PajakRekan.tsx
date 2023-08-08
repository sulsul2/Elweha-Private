import { useEffect, useState } from "react";
import Dropdown from "../../components/Dropdown";
import Button from "../../components/Button";
import Table from "../../components/Table";
import Paginate from "../../components/Paginate";
import TextField from "../../components/TextField";
import Modal from "../../components/Modal";
import DateFieldNormal from "../../components/DateFieldNormal";
import LoadingPage from "../../components/LoadingPage";
import { toastError, toastSuccess } from "../../components/Toast";
import { getWithAuth, postWithAuth } from "../../api/api";
import { FormatRupiah } from "@arismun/format-rupiah";
import moment from "moment";

function PajakRekan() {
  // Loading
  const [isLoading, setIsLoading] = useState(true);
  const [isTableLoad, setIsTableLoad] = useState(false);
  const [isTableLoadAkta, setIsTableLoadAkta] = useState(false);
  const [isAddRekan, setIsAddRekan] = useState(false);
  const [isEditRekan, setIsEditRekan] = useState(false);
  const [isHapusRekan, setIsHapusRekan] = useState(false);
  const [isAddAkta, setIsAddAkta] = useState(false);
  const [isEditAkta, setIsEditAkta] = useState(false);
  const [isHapusAkta, setIsHapusAkta] = useState(false);

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
  const [rekan, setRekan] = useState<{ value: string; label: string }>();
  const [namaRekan, setNamaRekan] = useState("");
  const [biayaJasa, setBiayaJasa] = useState("");
  const [searchRekan, setSearchRekan] = useState("");
  const [tanggal, setTanggal] = useState<Date | null>();
  const [noAwal, setNoAwal] = useState("");
  const [noAkhir, setNoAkhir] = useState("");

  // Data
  const [dataRekan, setDataRekan] = useState([]);
  const [totalTransfer, setTotalTransfer] = useState(0);
  const [dataAkta, setDataAkta] = useState([]);

  // Table
  const [pageRekan, setPageRekan] = useState(1);
  const [totalPageRekan, setTotalPageRekan] = useState(1);
  const [totalDataRekan, setTotalDataRekan] = useState(0);
  const [idEditRekan, setIdEditRekan] = useState(-1);
  const [onSelectedRekan, setOnSelectedRekan] = useState<Array<number>>([]);
  const [pageAkta, setPageAkta] = useState(1);
  const [totalPageAkta, setTotalPageAkta] = useState(1);
  const [totalDataAkta, setTotalDataAkta] = useState(0);
  const [idEditAkta, setIdEditAkta] = useState(-1);
  const [onSelectedAkta, setOnSelectedAkta] = useState<Array<number>>([]);
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
  const kolomAkta = [
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
        toastError("Get Data Table Failed");
      } finally {
        setIsTableLoad(false);
      }
    }
  };

  const getAkta = async () => {
    setOnSelectedAkta([]);
    setIsTableLoadAkta(true);
    if (token) {
      try {
        const akta = await getWithAuth(
          token,
          `pajak-rekan-akta?limit=10&page=${pageAkta}&pajak_rekan_id=${
            rekan ? rekan?.value : ""
          }`
        );
        setDataAkta(
          akta.data.data.table.data.map((data: any) => {
            return {
              id: data.id,
              tanggal: moment(data.tanggal).format("DD MMMM YYYY"),
              noAwal: data.no_awal,
              noAkhir: data.no_awal,
              jumlahAkta: data.jumlah_akta,
              update: `${data.user.nama} pada ${moment(data.updated_at).format(
                "DD MMMM YYYY HH:MM"
              )}`,
            };
          })
        );
        setTotalPageAkta(akta.data.data.table.last_page);
        setTotalDataAkta(akta.data.data.table.total);
      } catch (error) {
        console.log(error);
        toastError("Get Data Table Failed");
      } finally {
        setIsTableLoadAkta(false);
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getPajakRekan();
  }, [pageRekan, totalDataRekan, searchRekan, totalDataAkta]);

  useEffect(() => {
    getAkta();
  }, [pageAkta, totalDataAkta, rekan]);

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

  const tambahAkta = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsAddAkta(true);
    try {
      const response = await postWithAuth(
        "pajak-rekan-akta",
        {
          pajak_rekan_id: rekan?.value,
          tanggal: moment(tanggal).format("YYYY-MM-DD HH:mm:ss"),
          no_awal: noAwal,
          no_akhir: noAkhir,
        },
        token ?? ""
      );
      toastSuccess(response.data.meta.message);
      setShowTambahAkta(false);
      setTotalDataAkta(totalDataRekan + 1);
    } catch (error) {
      toastError((error as any).response.data.data.error as string);
    } finally {
      setIsAddAkta(false);
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

      {/* Add Akta */}
      <Modal visible={showTambahAkta} onClose={() => setShowTambahAkta(false)}>
        <form
          onSubmit={(e) => tambahAkta(e)}
          className="flex w-full flex-col gap-4"
        >
          <h1 className="text-center text-24 font-bold xl:text-start xl:text-40">
            Tambah Akta
          </h1>
          <div className="flex flex-col justify-between gap-4 xl:flex-row">
            <div className="w-full">
              <p className="mb-2 text-16 font-semibold">Tanggal</p>
              <DateFieldNormal
                required
                text={"Masukkan Tanggal"}
                onChange={(val: Date) => setTanggal(val)}
              />
            </div>
          </div>
          <div className="flex flex-col justify-between gap-4 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <p className="mb-2 text-16 font-semibold">No Awal Angka</p>
              <TextField
                required
                type={"standart"}
                placeholder={"No Akta Awal"}
                onChange={(e) => setNoAwal(e.target.value)}
              />
            </div>
            <div className="w-full xl:w-1/2">
              <p className="mb-2 text-16 font-semibold">No Akhir Angka</p>
              <TextField
                required
                type={"standart"}
                placeholder={"No Akta Akhir"}
                onChange={(e) => setNoAkhir(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-5 flex w-full justify-center gap-4 xl:justify-end">
            <Button
              onClick={() => setShowTambahAkta(false)}
              text={"Batalkan"}
              type={"button"}
              style={"third"}
            />
            <Button
              text={"Tambah Data"}
              type={"submit"}
              style={"primary"}
              isLoading={isAddAkta}
            />
          </div>
        </form>
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
        <div className="mb-5 hidden xl:block xl:text-end">
          <Button
            onClick={() => setShowTambahRekan(true)}
            text={"Tambah Rekan +"}
            type={"button"}
            style={"primary"}
          />
        </div>
        <p className="mb-5 block text-16 font-bold xl:hidden xl:text-24">
          Daftar Pajak Rekan
        </p>
        <div className="mb-5 block xl:hidden xl:justify-end">
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
          <Table
            data={dataAkta}
            column={kolomAkta}
            isLoading={isTableLoadAkta}
            page={pageAkta}
            dataLimit={10}
            onEdit={(val) => {
              setIdEditAkta((dataAkta[val] as any).id);
              // setShowEditAkta(true);
              setTanggal(
                moment(Date.parse((dataAkta[val] as any).tanggal)).toDate()
              );
              setNoAwal((dataAkta[val] as any).no_awal);
              setNoAkhir((dataAkta[val] as any).no_akhir);
            }}
            onSelected={(val) => setOnSelectedAkta(val)}
            selected={onSelectedAkta}
          />
          <Paginate
            totalPages={totalPageAkta}
            current={(page) => setPageAkta(page)}
            totalData={totalDataAkta}
            dataLimit={10}
          />
        </div>
      </div>
    </>
  );
}

export default PajakRekan;
