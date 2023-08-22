import moment from "moment";

export function readEmt(originalData: any) {
  interface EmployeeAttendance {
    nama_karyawan: string;
    tanggal: Date;
    kehadiran_actual: number;
    kehadiran_standart: number;
    keterlambatan: number;
  }

  const mappedData: EmployeeAttendance[] = [];

  let kehadiranStandard = 0;
  for (let i = 3; i < originalData.length; i += 3) {
    const temp = Object.keys(originalData[i]).length;
    if (kehadiranStandard < temp) {
      kehadiranStandard = temp;
    }
  }

  function compareTimeStrings(timeString1: string, timeString2: string) {
    const [hours1, minutes1] = timeString1.split(":").map(Number);
    const [hours2, minutes2] = timeString2.split(":").map(Number);

    if (hours1 < hours2 || (hours1 === hours2 && minutes1 < minutes2)) {
      return 0; // timeString1 is earlier
    } else if (hours1 === hours2 && minutes1 === minutes2) {
      return 0; // Both time strings are equal
    } else {
      return 1; // timeString1 is later
    }
  }

  const referenceTime = "08:00";
  function getKeterlambatan(obj: Object) {
    let lambat = 0;
    var value = Object.values(obj);
    for (const val of value) {
      const timeString = val.split("\n")[0];
      const comparisonResult = compareTimeStrings(timeString, referenceTime);

      if (comparisonResult === 1) {
        lambat++;
      }
    }

    return lambat;
  }

  for (let i = 2; i < originalData.length; i += 3) {
    const employeeInfo: EmployeeAttendance = {
      nama_karyawan: originalData[i]["__EMPTY_8"],
      tanggal: moment(originalData[0]["__EMPTY_1"], "YYYY-MM-DD").toDate(),
      kehadiran_actual: Object.keys(originalData[i + 1]).length,
      kehadiran_standart: kehadiranStandard,
      keterlambatan: getKeterlambatan(originalData[i + 1]),
    };
    mappedData.push(employeeInfo);
  }

  return mappedData;
}
