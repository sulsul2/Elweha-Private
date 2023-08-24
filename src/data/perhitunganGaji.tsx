import { formatRp } from "./formatRp";

export const perhitungan = (gaji: any) => {
  function hitungPajak(totalGaji: number) {
    var satuJuta = 1000000;
    if (totalGaji <= 60 * satuJuta) {
      return totalGaji * 0.05;
    } else if (totalGaji > 60 * satuJuta && totalGaji <= 250 * satuJuta) {
      return 60 * satuJuta * 0.05 + (totalGaji - 60 * satuJuta) * 0.15;
    } else if (totalGaji > 250 * satuJuta && totalGaji <= 500 * satuJuta) {
      return (
        60 * satuJuta * 0.05 +
        190 * satuJuta * 0.15 +
        (totalGaji - 250 * satuJuta) * 0.25
      );
    } else if (totalGaji > 500 * satuJuta && totalGaji <= 5000 * satuJuta) {
      return (
        60 * satuJuta * 0.05 +
        190 * satuJuta * 0.15 +
        250 * satuJuta * 0.25 +
        (totalGaji - 500 * satuJuta) * 0.3
      );
    } else {
      return (
        60 * satuJuta * 0.05 +
        190 * satuJuta * 0.15 +
        250 * satuJuta * 0.25 +
        4500 * satuJuta * 0.3 +
        (totalGaji - 5000 * satuJuta) * 0.35
      );
    }
  }

  let total = 0;
  var hasil = gaji.data.data.data.map((data: any) => {
    var bonus_kehadiran =
      data.kehadiran_standart == 0
        ? 0
        : (data.keterlambatan == 0 ? 200000 : 0) +
          (data.kehadiran_actual >= data.kehadiran_standart - 1 ? 100000 : 0);

    var variabel = data.variabel.reduce(
      (sum: number, { total }: any) => sum + total,
      0
    );
    var skil = data.skil.reduce(
      (sum: number, { besar_bonus }: any) => sum + besar_bonus,
      0
    );

    var totalGaji = 0;
    if (data.jenis_gaji == "Tetap") {
      totalGaji =
        (data.kehadiran_actual / (data.kehadiran_standart - 1)) *
          data.besar_gaji +
        bonus_kehadiran +
        variabel +
        skil;
    } else {
      totalGaji =
        data.kehadiran_actual * data.besar_gaji +
        skil +
        variabel +
        bonus_kehadiran;
    }

    var pph = hitungPajak(totalGaji);

    total += totalGaji - pph;

    return {
      id: data.gaji_id,
      nama_karyawan: data.nama_karyawan,
      jenis_gaji: data.jenis_gaji,
      besar_gaji: formatRp(data.besar_gaji),
      kehadiran: `${data.kehadiran_actual}/${data.kehadiran_standart}`,
      terlambat: data.keterlambatan,
      bonus_kehadiran: formatRp(bonus_kehadiran),
      variabel_bonus: formatRp(variabel),
      skil_bonus: formatRp(skil),
      pph_dipotong: formatRp(pph),
      total_gaji: formatRp(totalGaji - pph),
    };
  });
  return { hasil, total };
};
