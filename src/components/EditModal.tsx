import { useState } from "react";
import Button from "./Button";
import Modal from "./Modal";
import TextField from "./TextField";

function EditModal({
  dataItems,
  visible,
  onClose,
  onEdit,
  onDelete,
  onAdd,
  title,
}: {
  dataItems: Array<{ value: string; label: string }>;
  visible: boolean;
  onClose: VoidFunction;
  onEdit: (x: { value: string; label: string }) => void;
  onDelete: (x: string) => void;
  onAdd: (x: string) => void;
  title: string;
}) {
  const [edit, setEdit] = useState<{ value: string; label: string }>();
  const [add, setAdd] = useState("");
  const [hapus, setHapus] = useState("");
  const [showHapus, setShowHapus] = useState(false);

  return (
    <>
      <Modal visible={visible} onClose={onClose}>
        <div className="flex w-full flex-col gap-4">
          <h1 className="text-center text-24 font-bold xl:text-start xl:text-40">
            Tambah {title}
          </h1>
          <p className="text-16 font-semibold">{title} yang sudah ada:</p>
          <div className="flex flex-col gap-2 pl-2">
            {dataItems.map(
              (value: { value: string; label: string }, idx: number) => {
                return (
                  <div
                    key={idx}
                    className="flex flex-col xl:flex-row xl:justify-between"
                  >
                    <input
                      type="text"
                      placeholder="Nama Kategori"
                      disabled={edit?.value != value.value}
                      value={
                        edit?.value != value.value ? value.label : edit.label
                      }
                      onChange={(e) => {
                        setEdit({
                          value: value.value,
                          label: e.target.value,
                        });
                      }}
                      className={`w-full rounded-lg border-2 px-2 placeholder:text-[#6B6B6B] hover:border-kOrange-200 focus:outline-kOrange-400 disabled:border-transparent disabled:bg-transparent`}
                    />
                    <div className="flex">
                      <button
                        type="button"
                        disabled={edit?.value == value.value}
                        onClick={() =>
                          setEdit({
                            value: value.value,
                            label: value.label,
                          })
                        }
                        className="px-2 text-kBlue-300 hover:text-kBlue-100 active:text-kBlue-400 disabled:text-kGrey-200"
                      >
                        Edit
                      </button>
                      <button
                        disabled={
                          edit?.value != value.value ||
                          edit?.label == value.label
                        }
                        onClick={() => {
                          onEdit(edit!);
                          setEdit(undefined);
                        }}
                        className="px-2 text-kOrange-400 hover:text-kOrange-200 active:text-kOrange-500 disabled:text-kGrey-200"
                      >
                        Simpan
                      </button>
                      <button
                        onClick={() => {
                          setShowHapus(true);
                          setHapus(value.value);
                        }}
                        className="px-2 text-kRed hover:text-red-400 active:text-red-800"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                );
              }
            )}
          </div>
          <p className="text-16 font-semibold">Tambah {title}</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onAdd(add);
              setAdd("");
            }}
            className="mb-2 flex items-center"
          >
            <div className="mr-4 w-full xl:w-1/2">
              <TextField
                required
                type={"standart"}
                placeholder={`Nama ${title}`}
                value={add}
                onChange={(e) => setAdd(e.target.value)}
              />
            </div>
            <Button text={"Tambah"} type={"submit"} style={"third"} />
          </form>
          <div className="flex w-full justify-center gap-4 xl:justify-end">
            <Button
              onClick={() => {
                onClose();
                setEdit(undefined);
                setAdd("");
              }}
              text={"Selesai"}
              type={"button"}
              style={"primary"}
            />
          </div>
        </div>
      </Modal>

      {/* Hapus Pendapatan */}
      <Modal visible={showHapus} onClose={() => setShowHapus(false)}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onDelete(hapus);
            setShowHapus(false);
          }}
          className="flex w-full flex-col gap-4"
        >
          <h1 className="text-center text-24 font-bold xl:text-start xl:text-40">
            Hapus {title}
          </h1>
          <p className="mb-5 w-full text-center text-12 xl:text-left xl:text-16">
            Apakah Anda yakin menghapus? <br /> Semua data dengan {title}{" "}
            tersebut akan terhapus
          </p>
          <div className="flex w-full justify-center gap-4 xl:justify-end">
            <Button
              onClick={() => setShowHapus(false)}
              text={"Batalkan"}
              type={"button"}
              style={"third"}
            />
            <Button text={"Hapus Data"} type={"submit"} style={"primary"} />
          </div>
        </form>
      </Modal>
    </>
  );
}

export default EditModal;
