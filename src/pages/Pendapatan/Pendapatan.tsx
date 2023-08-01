import { useEffect, useState } from "react";
import Button from "../../components/Button";
import Dropdown from "../../components/Dropdown";
import Navbar from "../../components/Navbar";
import TextField from "../../components/TextField";
import Table from "../../components/Table";
import Paginate from "../../components/Paginate";
import Modal from "../../components/Modal";
import DateFieldNormal from "../../components/DateFieldNormal";
import TextArea from "../../components/TextArea";
import LoadingPage from "../../components/LoadingPage";
import { dataMonth } from "../../data/month";
import { getWithAuth, postWithAuth } from "../../api/api";
import { toastError, toastSuccess } from "../../components/Toast";
import moment from "moment";
import Checkbox from "../../components/Checkbox";

function Pendapatan() {
  // Loading
  const [isLoading, setIsLoading] = useState(true);
  const [isTableLoad, setIsTableLoad] = useState(false);
  const [isAddKategori, setIsAddKategori] = useState(false);
  const [isAddPendapatan, setIsAddPendapatan] = useState(false);

  // User
  const [user, setUser] = useState<any | null>(null);

  // PopUp
  const [showTambahKategori, setShowTambahKategori] = useState(false);
  const [showTambahPendapatan, setShowTambahPendapatan] = useState(false);
  const [showEditPendapatan, setShowEditPendapatan] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  // Dropdown
  const [period, setPeriod] = useState<{ year: string; month: string }>({
    month: "",
    year: "",
  });
  const [kategoriData, setKategoriData] = useState<
    Array<{ value: string; label: string }>
  >([]);

  //Field
  const [addKategori, setAddKategori] = useState("");
  const [tanggal, setTanggal] = useState<Date | null>();
  const [kategori, setKategori] = useState("");
  const [jumlah, setJumlah] = useState("");
  const [pengirim, setPengirim] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [search, setSearch] = useState("");

  // Data
  const [data, setData] = useState([{}]);
  const kolom = [
    "No",
    "Tanggal",
    "Kategori",
    "Jumlah",
    "Pengirim",
    "deskripsi",
  ];

  // Table
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const [kategoriId, setKategoriId] = useState<Array<number>>([]);

  const token = localStorage.getItem("access_token");
  const getData = async () => {
    if (token) {
      try {
        const user = await getWithAuth(token, "user");
        setUser(user.data.data);
        const kategori = await getWithAuth(token, "kategori-pendapatan");
        setKategoriData(
          kategori.data.data.map((data: any) => {
            return { value: data.id, label: data.nama };
          })
        );
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const getPendapatan = async () => {
    setIsTableLoad(true);
    if (token) {
      try {
        var filter = "";
        kategoriId.forEach((id, idx) => {
          filter += `&kategori_id[${idx}]=${id}`;
        });
        console.log(filter);
        const pendapatan = await getWithAuth(
          token,
          `pendapatan?limit=10&page=${page}&month=${period?.month}&year=${period?.year}&search=${search}${filter}`
        );
        setData(
          pendapatan.data.data.data.map((data: any) => {
            return {
              tanggal: moment(data.tanggal).format("DD MMMM YYYY"),
              kategori: data.kategori.nama,
              jumlah: data.jumlah,
              pengirim: data.pengirim,
              deskripsi: data.deskripsi,
            };
          })
        );
        setTotalPage(pendapatan.data.data.last_page);
        setTotalData(pendapatan.data.data.total);
      } catch (error) {
        console.log(error);
      } finally {
        setIsTableLoad(false);
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getPendapatan();
  }, [page, totalData, period, search, kategoriId]);

  const tambahKategori = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsAddKategori(true);
    try {
      const response = await postWithAuth(
        "kategori-pendapatan",
        {
          nama: addKategori,
        },
        token ?? ""
      );
      toastSuccess(response.data.meta.message);
      setShowTambahKategori(false);
      setKategoriData([
        ...kategoriData,
        {
          value: response.data.data.id,
          label: response.data.data.nama,
        },
      ]);
    } catch (error) {
      toastError((error as any).response.data.data.error as string);
    } finally {
      setIsAddKategori(false);
    }
  };

  const tambahPendapatan = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsAddPendapatan(true);
    try {
      const response = await postWithAuth(
        "pendapatan",
        {
          user_id: user.id,
          tanggal: moment(tanggal).format("YYYY-MM-DD HH:mm:ss"),
          kategori_pendapatan_id: kategori,
          jumlah: jumlah,
          pengirim: pengirim,
          deskripsi: deskripsi,
        },
        token ?? ""
      );
      toastSuccess(response.data.meta.message);
      setShowTambahPendapatan(false);
      setTotalData(totalData + 1);
    } catch (error) {
      toastError((error as any).response.data.data.error as string);
    } finally {
      setIsAddPendapatan(false);
    }
  };

  return (
    <>
      <LoadingPage isLoad={isLoading} />
      <Navbar active={1} user={user} />
      <Modal
        visible={showTambahKategori}
        onClose={() => setShowTambahKategori(false)}
      >
        <form
          onSubmit={(e) => tambahKategori(e)}
          className="flex w-full flex-col gap-4"
        >
          <h1 className="text-center text-24 font-bold xl:text-start xl:text-40">
            Tambah Kategori Pendapatan
          </h1>
          <div className="mb-5 w-full">
            <p className="mb-2 text-16 font-semibold">Nama Kategori</p>
            <TextField
              required
              type={"standart"}
              placeholder={"Masukkan Nama Kategori"}
              onChange={(e) => setAddKategori(e.target.value)}
            />
          </div>
          <div className="flex w-full justify-center gap-4 xl:justify-end">
            <Button
              onClick={() => setShowTambahKategori(false)}
              text={"Batalkan"}
              type={"button"}
              style={"third"}
            />
            <Button
              isLoading={isAddKategori}
              text={"Simpan Data"}
              type={"submit"}
              style={"primary"}
            />
          </div>
        </form>
      </Modal>

      <Modal
        visible={showTambahPendapatan}
        onClose={() => setShowTambahPendapatan(false)}
      >
        <form
          onSubmit={(e) => tambahPendapatan(e)}
          className="flex w-full flex-col gap-4"
        >
          <h1 className="text-center text-24 font-bold xl:text-start xl:text-40">
            Tambah Pendapatan
          </h1>
          <div className="flex flex-col justify-between gap-4 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <p className="mb-2 text-16 font-semibold">Tanggal</p>
              <DateFieldNormal
                text={"Masukkan Tanggal"}
                onChange={(val: Date) => setTanggal(val)}
              />
            </div>
            <div className="w-full xl:w-1/2">
              <p className="mb-2 text-16 font-semibold">Kategori</p>
              <Dropdown
                placeholder={"Kategori"}
                type={"Kategori"}
                options={kategoriData}
                onChange={(e) => setKategori(e?.value!)}
              />
            </div>
          </div>
          <div className="flex flex-col justify-between gap-4 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <p className="mb-2 text-16 font-semibold">Jumlah Pendapatan</p>
              <TextField
                required
                type={"standart"}
                placeholder={"Rp"}
                onChange={(e) => setJumlah(e.target.value)}
              />
            </div>
            <div className="w-full xl:w-1/2">
              <p className="mb-2 text-16 font-semibold">Pengirim</p>
              <TextField
                required
                type={"standart"}
                placeholder={"Masukkan Nama Pengirim"}
                onChange={(e) => setPengirim(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full">
            <p className="mb-2 text-16 font-semibold">Deskripsi</p>
            <TextArea
              required
              placeholder={"Deskripsi"}
              onChange={(e) => setDeskripsi(e.target.value)}
            />
          </div>
          <div className="flex w-full justify-center gap-4 xl:justify-end">
            <Button
              onClick={() => setShowTambahPendapatan(false)}
              text={"Batalkan"}
              type={"button"}
              style={"third"}
            />
            <Button
              text={"Simpan Data"}
              type={"submit"}
              style={"primary"}
              isLoading={isAddPendapatan}
            />
          </div>
        </form>
      </Modal>

      <Modal
        visible={showEditPendapatan}
        onClose={() => setShowEditPendapatan(false)}
      >
        <div className="flex w-full flex-col gap-4">
          <h1 className="text-center text-24 font-bold xl:text-start xl:text-40">
            Edit Pendapatan
          </h1>
          <div className="flex flex-col justify-between gap-4 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <p className="mb-2 text-16 font-semibold">Tanggal</p>
              <DateFieldNormal text={"Masukkan Tanggal"} onChange={undefined} />
            </div>
            <div className="w-full xl:w-1/2">
              <p className="mb-2 text-16 font-semibold">Kategori</p>
              <Dropdown
                placeholder={"Kategori"}
                type={"Kategori"}
                options={undefined}
              />
            </div>
          </div>
          <div className="flex flex-col justify-between gap-4 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <p className="mb-2 text-16 font-semibold">Jumlah Pendapatan</p>
              <TextField
                type={"standart"}
                label={""}
                placeholder={"Rp"}
                helpertext={""}
              />
            </div>
            <div className="w-full xl:w-1/2">
              <p className="mb-2 text-16 font-semibold">Jenis</p>
              <Dropdown
                placeholder={"Jenis"}
                type={"Jenis"}
                options={undefined}
              />
            </div>
          </div>
          <div className="w-full">
            <p className="mb-2 text-16 font-semibold">Deskripsi</p>
            <TextArea
              style={""}
              label={""}
              placeholder={"Deskripsi"}
              helpertext={""}
            />
          </div>
          <div className="flex w-full justify-center gap-4 xl:justify-end">
            <Button
              onClick={() => setShowEditPendapatan(false)}
              text={"Batalkan"}
              type={"button"}
              style={"third"}
            />
            <Button text={"Edit Data"} type={"button"} style={"primary"} />
          </div>
        </div>
      </Modal>

      <div className="flex min-h-screen w-full flex-col bg-background px-5 pb-24 pt-[104px] xl:px-24">
        <h1 className="mb-12 hidden text-40 font-bold xl:block">Pendapatan</h1>
        <div className="mb-5 flex w-full justify-between xl:justify-start">
          <p className="w-auto text-16 font-bold xl:w-[250px] xl:text-24">
            Total Pendapatan
          </p>
          <p className="text-16 font-semibold text-kText xl:text-24">
            Rp 100.000.000.000000,-
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
                onChange={(e) =>
                  setPeriod(
                    e?.value == undefined
                      ? { month: "", year: "" }
                      : (e?.value as any)
                  )
                }
              />
            </div>
          </div>
          <div className="flex w-full justify-center gap-4 xl:justify-end">
            <Button
              onClick={() => setShowTambahPendapatan(true)}
              text={"Tambah Data +"}
              type={"button"}
              style={"primary"}
            />
            <Button
              onClick={() => setShowTambahKategori(true)}
              text={"Tambah Kategori +"}
              type={"button"}
              style={"third"}
            />
          </div>
        </div>
        <p className="mb-5 block text-16 font-bold xl:hidden xl:text-24">
          Daftar Pendapatan
        </p>
        <div className="flex grow flex-col rounded-lg bg-white py-3 shadow-card">
          <div className="mb-5 flex w-full items-center justify-between gap-1 px-3">
            <p className="hidden text-16 font-bold xl:block xl:text-24">
              Daftar Pendapatan
            </p>
            <div className="flex items-center gap-2">
              <TextField
                type={"search"}
                placeholder={"Cari"}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="relative">
                <Button
                  onClick={() => setShowFilter(!showFilter)}
                  text={"Filter"}
                  type={"button"}
                  style={"seccondary"}
                />
                {showFilter && (
                  <ul className="absolute z-10 max-h-[600%] w-[250%] overflow-auto rounded-lg bg-white bg-opacity-50 px-4 shadow-card backdrop-blur-md">
                    {kategoriData.map(
                      (
                        kategori: { value: string; label: string },
                        idx: number
                      ) => {
                        var isChecked = kategoriId.includes(
                          Number.parseInt(kategori.value)
                        );
                        return (
                          <li
                            key={idx}
                            onClick={() =>
                              isChecked
                                ? setKategoriId(
                                    kategoriId.filter(
                                      (item) =>
                                        item !== Number.parseInt(kategori.value)
                                    )
                                  )
                                : setKategoriId([
                                    ...kategoriId,
                                    Number.parseInt(kategori.value),
                                  ])
                            }
                            className="my-4 flex cursor-pointer items-center gap-2 hover:text-kOrange-300"
                          >
                            <div>
                              <Checkbox
                                checked={isChecked}
                                type={"check"}
                                id={kategori.label}
                              />
                            </div>
                            <p className="overflow-hidden text-ellipsis text-12 lg:text-14">
                              {kategori.label}
                            </p>
                          </li>
                        );
                      }
                    )}
                  </ul>
                )}
              </div>
            </div>
            <Button text={"Hapus"} type={"button"} style={"delete"} />
          </div>
          <Table
            data={data}
            column={kolom}
            isLoading={isTableLoad}
            page={page}
          />
          <Paginate
            totalPages={totalPage}
            current={(page) => setPage(page)}
            totalData={totalData}
          />
        </div>
      </div>
    </>
  );
}

export default Pendapatan;
