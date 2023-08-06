import { useEffect, useRef, useState } from "react";
import { useEventListener } from "usehooks-ts";
import { getWithAuth } from "../api/api";
import { toastError } from "./Toast";
import { NavLink, useLocation } from "react-router-dom";

function Navbar() {
  const [navOpen, setNavOpen] = useState(false);
  const [isAccount, setAccount] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any | null>(null);
  const location = useLocation();
  const [active, setActive] = useState(0);

  const documentRef = useRef<Document>(document);
  const onClickAccount = (event: Event) => {
    let cekAccount = true;
    const doc = document.getElementsByClassName("account-detail");
    for (let index = 0; index < doc.length; index++) {
      cekAccount = cekAccount && event.target != doc[index];
    }
    if (cekAccount) {
      setAccount(false);
    }
  };
  useEventListener("click", onClickAccount, documentRef);
  const onClickHamburger = (event: Event) => {
    let cekHamburger = true;
    const doc = document.getElementsByClassName("hamburger");
    for (let index = 0; index < doc.length; index++) {
      cekHamburger = cekHamburger && event.target != doc[index];
    }
    if (cekHamburger) {
      setNavOpen(false);
    }
  };
  useEventListener("click", onClickHamburger, documentRef);

  const token = localStorage.getItem("access_token");
  const getUser = async () => {
    if (token) {
      try {
        const response = await getWithAuth(token, "user");
        const data = response.data?.data;
        setUser(data);
      } catch (error) {
        toastError("Get User Failed");
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    getUser();
  }, [isLoading]);

  useEffect(() => {
    switch (location.pathname) {
      case "/dashboard":
        setActive(0);
        break;
      case "/pendapatan":
        setActive(1);
        break;
      case "/pengeluaran":
        setActive(2);
        break;
      case "/pajak-rekan":
        setActive(3);
        break;
      case "/stok":
        setActive(4);
        break;
      case "/pajak-perusahaan":
        setActive(5);
        break;
      case "/gaji":
        setActive(6);
        break;
      default:
        setActive(0);
        break;
    }
  }, [location.pathname]);

  return (
    <>
      <div className="fixed z-50 flex h-[80px] w-full items-center justify-between bg-white bg-opacity-50 px-3 shadow-button backdrop-blur-sm xl:px-7">
        <button
          type="button"
          className={`${
            navOpen ? "bg-kOrange-400" : "bg-white"
          } hamburger absolute z-10 h-[40px] w-[40px] cursor-pointer xl:hidden`}
          onClick={() => setNavOpen(!navOpen)}
        >
          <span
            className={`${
              navOpen
                ? "top-[1.2em] h-[2px] rotate-[135deg] transition"
                : "top-[0.7em] h-[3px]"
            } hamburger line absolute left-0 right-0 mx-auto h-[3px] w-[20px] rounded-xl ${
              navOpen ? "bg-white" : "bg-kOrange-400"
            } duration-300 ease-in-out`}
          ></span>
          <span
            id="span2"
            className={`${
              navOpen ? "h-[2px] scale-0 transition" : "top-[1.2em] h-[3px]"
            } hamburger line absolute left-0 right-0 mx-auto h-[3px] w-[20px] rounded-xl ${
              navOpen ? "bg-white" : "bg-kOrange-400"
            } duration-300 ease-in-out`}
          ></span>
          <span
            id="span3"
            className={`${
              navOpen
                ? "top-[1.2em] h-[2px] rotate-45 transition"
                : "top-[1.7em] h-[3px]"
            } hamburger line absolute left-0 right-0 mx-auto h-[3px] w-[20px] rounded-xl ${
              navOpen ? "bg-white" : "bg-kOrange-400"
            } duration-300 ease-in-out`}
          ></span>
        </button>
        <NavLink to="/">
          <img
            src="assets/logo.svg"
            alt="Elweha"
            className="hidden h-[66px] p-2 xl:block"
          />
        </NavLink>
        <h1 className="mx-auto text-24 font-bold text-kText xl:hidden">
          {active == 0
            ? "Dashboard"
            : active == 1
            ? "Pendapatan"
            : active == 2
            ? "Pengeluaran"
            : active == 3
            ? "Pajak Rekan"
            : active == 4
            ? "Stok"
            : active == 5
            ? "Pajak Perusahaan"
            : "Gaji"}
        </h1>
        <div
          className={`${
            navOpen ? "translate-x-0" : "-translate-x-full xl:translate-x-0"
          } absolute left-0 top-0 h-screen w-[90%] bg-white shadow-lg duration-300 ease-in-out md:w-[70%] xl:static xl:block xl:h-auto xl:w-auto xl:bg-transparent xl:py-0 xl:shadow-none`}
        >
          <NavLink to="/">
            <img
              src="assets/logo.svg"
              alt="Elweha"
              className="mx-auto mb-7 mt-2 h-[60px] xl:hidden"
            />
          </NavLink>
          <div className="flex flex-col gap-[8px] px-7 xl:mt-0 xl:flex-row xl:items-center xl:gap-[16px] xl:px-0">
            <NavLink
              to="/"
              className={`${
                active == 0 ? "text-kOrange-400" : "text-kText"
              } rounded-[10px] p-3 text-16 font-bold hover:bg-kOrange-400 hover:text-white`}
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/pendapatan"
              className={`${
                active == 1 ? "text-kOrange-400" : "text-kText"
              } rounded-[10px] p-3 text-16 font-bold hover:bg-kOrange-400 hover:text-white`}
            >
              Pendapatan
            </NavLink>
            <NavLink
              to="/pengeluaran"
              className={`${
                active == 2 ? "text-kOrange-400" : "text-kText"
              } rounded-[10px] p-3 text-16 font-bold hover:bg-kOrange-400 hover:text-white`}
            >
              Pengeluaran
            </NavLink>
            <NavLink
              to="/pajak-rekan"
              className={`${
                active == 3 ? "text-kOrange-400" : "text-kText"
              } rounded-[10px] p-3 text-16 font-bold hover:bg-kOrange-400 hover:text-white `}
            >
              Pajak Rekan
            </NavLink>
            <NavLink
              to="/stok"
              className={`${
                active == 4 ? "text-kOrange-400" : "text-kText"
              } rounded-[10px] p-3 text-16 font-bold hover:bg-kOrange-400 hover:text-white`}
            >
              Stok
            </NavLink>
            <NavLink
              to="/pajak-perusahaan"
              className={`${
                active == 5 ? "text-kOrange-400" : "text-kText"
              } rounded-[10px] p-3 text-16 font-bold hover:bg-kOrange-400 hover:text-white`}
            >
              Pajak Perusahaan
            </NavLink>
            <NavLink
              to="/gaji"
              className={`${
                active == 6 ? "text-kOrange-400" : "text-kText"
              } rounded-[10px] p-3 text-16 font-bold hover:bg-kOrange-400 hover:text-white`}
            >
              Gaji
            </NavLink>
            <div className="hidden h-12 w-[1px] bg-kGrey-100 xl:block"></div>
            <div className="account-detail group absolute bottom-3 p-3 xl:relative xl:bottom-0">
              {user ? (
                <>
                  <div
                    className="account-detail hamburger flex cursor-pointer items-center"
                    onClick={() => setAccount(!isAccount)}
                  >
                    <img
                      src={user.profile_photo_url}
                      className="account-detail hamburger h-12 w-12 shrink-0 rounded-full bg-kGrey-100"
                      alt="Profile"
                    />
                    <div className="account-detail hamburger ml-3">
                      <p className="hamburger account-detail w-[160px] overflow-hidden text-ellipsis whitespace-nowrap text-16 font-bold text-kText group-hover:text-kOrange-400 md:w-[350px] xl:w-[180px]">
                        {user.nama}
                      </p>
                      <p className="hamburger account-detail text-14 text-kText group-hover:text-kOrange-400">
                        {user.role}
                      </p>
                    </div>
                  </div>
                  {isAccount && (
                    <div className="absolute flex w-full -translate-y-44 flex-col bg-white p-3 shadow-lg xl:translate-y-4">
                      <NavLink
                        to="#"
                        className="p-3 text-16 font-bold text-kText hover:text-kOrange-300"
                      >
                        Daftar Akun
                      </NavLink>
                      <NavLink
                        to="#"
                        className="p-3 text-16 font-bold text-kText hover:text-kOrange-300"
                      >
                        Keluar
                      </NavLink>
                    </div>
                  )}
                </>
              ) : (
                <div className="account-detail flex cursor-pointer items-center">
                  <div className="account-detail h-12 w-12 shrink-0 animate-pulse rounded-full bg-kGrey-100" />
                  <div className="account-detail ml-3 flex flex-col gap-2">
                    <div className="account-detail h-4 w-[160px] animate-pulse  bg-kGrey-100 md:w-[350px] xl:w-[180px]"></div>
                    <div className="account-detail h-4 w-[160px] animate-pulse  bg-kGrey-100 md:w-[350px] xl:w-[180px]"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
