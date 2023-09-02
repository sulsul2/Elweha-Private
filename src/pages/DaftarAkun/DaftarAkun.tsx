import { useContext, useEffect, useState } from "react";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import Paginate from "../../components/Paginate";
import Table from "../../components/Table";
import TextField from "../../components/TextField";
import Dropdown from "../../components/Dropdown";
import { getWithAuth, postWithAuth } from "../../api/api";
import { toastError, toastSuccess } from "../../components/Toast";
import Checkbox from "../../components/Checkbox";
import { UserContext } from "../../Context/UserContext";
import NotFound from "../../components/NotFound";

function DaftarAkun() {
  // Loading
  const [isTableLoad, setIsTableLoad] = useState(false);
  const [isAddAkun, setIsAddAkun] = useState(false);
  const [isEditAkun, setIsEditAkun] = useState(false);
  const [isHapusAkun, setIsHapusAkun] = useState(false);

  // PopUp
  const [showTambahAkun, setShowTambahAkun] = useState(false);
  const [showEditAkun, setShowEditAkun] = useState(false);
  const [showHapusAkun, setShowHapusAkun] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  // Dropdown
  const [roleData] = useState<Array<{ value: string; label: string }>>([
    { value: "OFFICER", label: "Officer" },
    { value: "BOD", label: "Board Of Director" },
  ]);

  // Field
  const [nama, setNama] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<{ value: string; label: string }>();
  const [search, setSearch] = useState("");

  // Data
  const [data, setData] = useState([]);

  // Table
  const kolom = ["No", "Nama", "Username", "Email", "Role"];
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const [totalAkun, setTotalAkun] = useState(0);
  const [idEdit, setIdEdit] = useState(-1);
  const [roleFilter, setRoleFilter] = useState<Array<String>>([
    "OFFICER",
    "BOD",
  ]);
  const [onSelected, setOnSelected] = useState<Array<number>>([]);

  const { user } = useContext(UserContext);
  const token = user?.token;
  if (user?.role != "BOD") {
    return <NotFound />;
  }

  const getDaftarAkun = async () => {
    setOnSelected([]);
    setIsTableLoad(true);
    if (token) {
      try {
        var filter = "";
        roleFilter.forEach((id, idx) => {
          filter += `&role[${idx}]=${id}`;
        });
        const pendapatan = await getWithAuth(
          token,
          `daftar-user?limit=10&page=${page}&search=${search}${filter}`
        );
        setData(
          pendapatan.data.data.table.data.map((data: any) => {
            return {
              id: data.id,
              nama: data.nama,
              username: data.username,
              email: data.email,
              role: data.role == "BOD" ? "Board Of Director" : "Officer",
            };
          })
        );
        setTotalAkun(pendapatan.data.data.total);
        setTotalPage(pendapatan.data.data.table.last_page);
        setTotalData(pendapatan.data.data.table.total);
      } catch (error) {
        console.log(error);
        toastError("Get Data Table Failed");
      } finally {
        setIsTableLoad(false);
      }
    }
  };

  useEffect(() => {
    getDaftarAkun();
  }, [page, totalData, search, roleFilter]);

  const tambahAkun = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsAddAkun(true);
    try {
      const response = await postWithAuth(
        "add-account",
        {
          nama: nama,
          email: email == "" ? null : email,
          username: username,
          password: password,
          role: role?.value,
        },
        token ?? ""
      );
      toastSuccess(response.data.meta.message);
      setShowTambahAkun(false);
      setTotalData(totalData + 1);
    } catch (error) {
      toastError((error as any).response.data.data.error as string);
    } finally {
      setIsAddAkun(false);
    }
  };

  const editAkun = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsEditAkun(true);
    try {
      const response = await postWithAuth(
        "edit-account",
        {
          id: idEdit,
          nama: nama,
          email: email == "" ? null : email,
          username: username,
          password: password == "" ? null : password,
          role: role?.value,
        },
        token ?? ""
      );
      toastSuccess(response.data.meta.message);
      setShowEditAkun(false);
      setTotalData(totalData + 1);
    } catch (error) {
      toastError((error as any).response.data.data.error as string);
    } finally {
      setIsEditAkun(false);
    }
  };

  const hapusAkun = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsHapusAkun(true);
    try {
      const response = await postWithAuth(
        "delete-account",
        {
          selectedId: onSelected,
        },
        token ?? ""
      );
      toastSuccess(response.data.meta.message);
      setShowHapusAkun(false);
      setTotalData(totalData + 1);
    } catch (error) {
      toastError((error as any).response.data.meta.message as string);
    } finally {
      setIsHapusAkun(false);
    }
  };

  return (
    <>
      {/* Add Akun */}
      <Modal visible={showTambahAkun} onClose={() => setShowTambahAkun(false)}>
        <form
          onSubmit={(e) => tambahAkun(e)}
          className="flex w-full flex-col gap-4"
        >
          <h1 className="text-center text-24 font-bold xl:text-start xl:text-40">
            Tambah Akun
          </h1>
          <div className="flex flex-col justify-between gap-4 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <p className="mb-2 text-16 font-semibold">Nama</p>
              <TextField
                required
                type={"standart"}
                placeholder={"Masukkan Nama"}
                onChange={(e) => setNama(e.target.value)}
              />
            </div>
            <div className="w-full xl:w-1/2">
              <p className="mb-2 text-16 font-semibold">Username</p>
              <TextField
                required
                type={"standart"}
                placeholder={"Masukkan Username"}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col justify-between gap-4 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <p className="mb-2 text-16 font-semibold">Email</p>
              <TextField
                type={"standart"}
                placeholder={"Masukkan Email"}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="w-full xl:w-1/2">
              <p className="mb-2 text-16 font-semibold">Password</p>
              <TextField
                required
                type={"standart"}
                placeholder={"Masukkan Password"}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col justify-between gap-4 xl:flex-row">
            <div className="w-full pr-2 xl:w-1/2">
              <p className="mb-2 text-16 font-semibold">Role</p>
              <Dropdown
                required
                placeholder={"Role"}
                type={"Role"}
                options={roleData}
                onChange={(e) => setRole(e!)}
              />
            </div>
          </div>
          <div className=" mt-5 flex w-full justify-center gap-4 xl:justify-end">
            <Button
              onClick={() => setShowTambahAkun(false)}
              text={"Batalkan"}
              type={"button"}
              style={"third"}
            />
            <Button
              text={"Tambah Akun"}
              type={"submit"}
              style={"primary"}
              isLoading={isAddAkun}
            />
          </div>
        </form>
      </Modal>

      {/* Edit Akun */}
      <Modal visible={showEditAkun} onClose={() => setShowEditAkun(false)}>
        <form
          onSubmit={(e) => editAkun(e)}
          className="flex w-full flex-col gap-4"
        >
          <h1 className="text-center text-24 font-bold xl:text-start xl:text-40">
            Edit Akun
          </h1>
          <div className="flex flex-col justify-between gap-4 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <p className="mb-2 text-16 font-semibold">Nama</p>
              <TextField
                required
                type={"standart"}
                placeholder={"Masukkan Nama"}
                onChange={(e) => setNama(e.target.value)}
                value={nama}
              />
            </div>
            <div className="w-full xl:w-1/2">
              <p className="mb-2 text-16 font-semibold">Username</p>
              <TextField
                required
                type={"standart"}
                placeholder={"Masukkan Username"}
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
            </div>
          </div>
          <div className="flex flex-col justify-between gap-4 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <p className="mb-2 text-16 font-semibold">Email</p>
              <TextField
                type={"standart"}
                placeholder={"Masukkan Email"}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="w-full xl:w-1/2">
              <p className="mb-2 text-16 font-semibold">Password</p>
              <TextField
                type={"standart"}
                placeholder={"Masukkan Password Baru"}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col justify-between gap-4 xl:flex-row">
            <div className="w-full pr-2 xl:w-1/2">
              <p className="mb-2 text-16 font-semibold">Role</p>
              <Dropdown
                required
                placeholder={"Role"}
                type={"Role"}
                options={roleData}
                onChange={(e) => setRole(e!)}
                value={role}
              />
            </div>
          </div>
          <div className=" mt-5 flex w-full justify-center gap-4 xl:justify-end">
            <Button
              onClick={() => setShowEditAkun(false)}
              text={"Batalkan"}
              type={"button"}
              style={"third"}
            />
            <Button
              text={"Edit Akun"}
              type={"submit"}
              style={"primary"}
              isLoading={isEditAkun}
            />
          </div>
        </form>
      </Modal>

      {/* Hapus Akun */}
      <Modal visible={showHapusAkun} onClose={() => setShowHapusAkun(false)}>
        <form
          onSubmit={(e) => hapusAkun(e)}
          className="flex w-full flex-col gap-4"
        >
          <h1 className="text-center text-24 font-bold xl:text-start xl:text-40">
            Hapus Akun
          </h1>
          <p className="mb-5 w-full text-center text-12 xl:text-left xl:text-16">
            Apakah Anda yakin menghapus akun ini?
          </p>
          <div className="flex w-full justify-center gap-4 xl:justify-end">
            <Button
              onClick={() => setShowHapusAkun(false)}
              text={"Batalkan"}
              type={"button"}
              style={"third"}
            />
            <Button
              isLoading={isHapusAkun}
              text={"Hapus Data"}
              type={"submit"}
              style={"primary"}
            />
          </div>
        </form>
      </Modal>

      <div className="flex min-h-screen w-full flex-col bg-background px-5 pb-24 pt-[104px] xl:px-24">
        <h1 className="mb-12 hidden text-40 font-bold xl:block">Daftar Akun</h1>
        <div className="mb-5 flex flex-col justify-between gap-11 xl:flex-row xl:pr-40">
          <div className="flex justify-between">
            <p className="w-auto text-16 font-bold xl:w-[250px] xl:text-24">
              Total Akun
            </p>
            <p className="text-16 font-semibold text-kText xl:text-24">
              {`${totalAkun} Akun`}
            </p>
          </div>
          <Button
            onClick={() => {
              setShowTambahAkun(true);
              setEmail("");
            }}
            text={"Tambah Akun +"}
            type={"button"}
            style={"primary"}
          />
        </div>
        <div className="flex grow flex-col rounded-lg bg-white py-3 shadow-card xl:mx-40">
          <div className="mb-5 flex w-full items-center justify-between gap-1 px-3">
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
                    {roleData.map(
                      (
                        kategori: { value: string; label: string },
                        idx: number
                      ) => {
                        var isChecked = roleFilter.includes(kategori.value);
                        const handleCheck = () =>
                          isChecked
                            ? setRoleFilter(
                                roleFilter.filter(
                                  (item) => item !== kategori.value
                                )
                              )
                            : setRoleFilter([...roleFilter, kategori.value]);
                        return (
                          <li
                            key={idx}
                            onClick={handleCheck}
                            className="my-4 flex cursor-pointer items-center gap-2 hover:text-kOrange-300"
                          >
                            <div>
                              <Checkbox
                                onChange={handleCheck}
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
            <div
              className={`${onSelected.length > 0 ? "visible" : "invisible"}`}
            >
              <Button
                onClick={() => setShowHapusAkun(true)}
                text={"Hapus"}
                type={"button"}
                style={"delete"}
              />
            </div>
          </div>
          <Table
            data={data}
            column={kolom}
            isLoading={isTableLoad}
            page={page}
            dataLimit={10}
            onEdit={(val) => {
              setIdEdit((data[val] as any).id);
              setShowEditAkun(true);
              setRole(
                roleData.filter(
                  (item) => item.label == (data[val] as any).role
                )[0]
              );
              setNama((data[val] as any).nama);
              setUsername((data[val] as any).username);
              setEmail((data[val] as any).email);
              setPassword(""); // soalnya tidak wajib : reset dulu
            }}
            onSelected={(val) => setOnSelected(val)}
            selected={onSelected}
          />
          <Paginate
            totalPages={totalPage}
            current={(page) => setPage(page)}
            totalData={totalData}
            dataLimit={10}
          />
        </div>
      </div>
    </>
  );
}

export default DaftarAkun;
