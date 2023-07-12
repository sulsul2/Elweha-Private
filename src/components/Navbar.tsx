import { useRef, useState } from "react";
import { useEventListener } from "usehooks-ts";

function Navbar() {
  const [active, setActive] = useState(0);
  const [navOpen, setNavOpen] = useState(false);
  const [isAccount, setAccount] = useState(false);

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

  return (
    <>
      <div className="fixed flex h-[80px] w-full items-center justify-between bg-white px-3 lg:px-14">
        <button
          type="button"
          className={`${
            navOpen ? "bg-kOrange-400" : "bg-white"
          } hamburger absolute z-10 h-[40px] w-[40px] cursor-pointer lg:hidden`}
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
        <a href="#">
          <img
            src="assets/logo.svg"
            alt="Elweha"
            className="hidden h-[66px] p-2 lg:block"
          />
        </a>
        <h1 className="mx-auto text-24 font-bold text-kText lg:hidden">
          {active == 0
            ? "Dashboard"
            : active == 1
            ? "Pendapatan"
            : active == 2
            ? "Pengeluaran"
            : active == 3
            ? "Pajak"
            : "Stok"}
        </h1>
        <div
          className={`${
            !navOpen && "-translate-x-full"
          } absolute left-0 top-0 h-screen w-[90%] bg-white shadow-lg duration-300 ease-in-out md:w-[70%] lg:static lg:block lg:h-auto lg:w-auto lg:bg-transparent lg:py-0 lg:shadow-none`}
        >
          <a href="#">
            <img
              src="assets/logo.svg"
              alt="Elweha"
              className="mx-auto mb-7 mt-2 h-[60px] lg:hidden"
            />
          </a>
          <div className="flex flex-col px-7 lg:mt-0 lg:flex-row lg:items-center lg:gap-[24px] lg:px-0">
            <a
              href="#"
              onClick={() => setActive(0)}
              className={`${
                active == 0 ? "text-kOrange-400" : "text-kText"
              } rounded-[10px] p-3 text-16 font-bold hover:bg-kOrange-400 hover:text-white`}
            >
              Dashboard
            </a>
            <a
              href="#"
              onClick={() => setActive(1)}
              className={`${
                active == 1 ? "text-kOrange-400" : "text-kText"
              } rounded-[10px] p-3 text-16 font-bold hover:bg-kOrange-400 hover:text-white`}
            >
              Pendapatan
            </a>
            <a
              href="#"
              onClick={() => setActive(2)}
              className={`${
                active == 2 ? "text-kOrange-400" : "text-kText"
              } rounded-[10px] p-3 text-16 font-bold hover:bg-kOrange-400 hover:text-white`}
            >
              Pengeluaran
            </a>
            <a
              href="#"
              onClick={() => setActive(3)}
              className={`${
                active == 3 ? "text-kOrange-400" : "text-kText"
              } rounded-[10px] p-3 text-16 font-bold hover:bg-kOrange-400 hover:text-white `}
            >
              Pajak
            </a>
            <a
              href="#"
              onClick={() => setActive(4)}
              className={`${
                active == 4 ? "text-kOrange-400" : "text-kText"
              } rounded-[10px] p-3 text-16 font-bold hover:bg-kOrange-400 hover:text-white`}
            >
              Stok
            </a>
            <div className="hidden h-12 w-[1px] bg-kGrey-100 lg:block"></div>
            <div className="account-detail group absolute bottom-3 p-3 lg:relative lg:bottom-0">
              <div
                className="account-detail hamburger flex cursor-pointer items-center"
                onClick={() => setAccount(!isAccount)}
              >
                <img
                  src=""
                  className="account-detail hamburger h-12 w-12 shrink-0 rounded-full bg-kGrey-100"
                  alt="Profile"
                />
                <div className="account-detail hamburger ml-3">
                  <p className="hamburger account-detail w-[160px] overflow-hidden text-ellipsis whitespace-nowrap text-16 font-bold text-kText group-hover:text-kOrange-400 md:w-[350px] lg:w-[60px] xl:w-[240px]">
                    Nama User Panjang Sekaliiiiiiiiii
                  </p>
                  <p className="hamburger account-detail text-14 text-kText group-hover:text-kOrange-400">
                    Role
                  </p>
                </div>
              </div>
              {isAccount && (
                <div className="absolute flex w-full -translate-y-44 flex-col bg-white p-3 shadow-lg lg:translate-y-4">
                  <a
                    href="#"
                    className="p-3 text-16 font-bold text-kText hover:text-kOrange-300"
                  >
                    Daftar Akun
                  </a>
                  <a
                    href="#"
                    className="p-3 text-16 font-bold text-kText hover:text-kOrange-300"
                  >
                    Keluar
                  </a>
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
