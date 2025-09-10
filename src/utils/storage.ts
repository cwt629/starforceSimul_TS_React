import Swal from "sweetalert2";
import { UserLog } from "../type/storage";
import { alertWithSwal } from "./alert";
import { bigintReplacer, bigintReviver } from "./bigint";

const DATA_NAME_IN_LOCAL_STORAGE = "reinforced-log";

export function saveLogOnStorage(userLog: UserLog): void {
  let originalLogString: string | null = localStorage.getItem(
    DATA_NAME_IN_LOCAL_STORAGE
  );
  if (!originalLogString) {
    localStorage.setItem(
      DATA_NAME_IN_LOCAL_STORAGE,
      JSON.stringify([userLog], bigintReplacer)
    );
    return;
  }

  let originalLog: UserLog[] = JSON.parse(originalLogString, bigintReviver);
  localStorage.setItem(
    DATA_NAME_IN_LOCAL_STORAGE,
    JSON.stringify([...originalLog, userLog], bigintReplacer)
  );
}

export function getLogInStorage(): UserLog[] {
  let originalLogString: string | null = localStorage.getItem(
    DATA_NAME_IN_LOCAL_STORAGE
  );
  if (!originalLogString) return [];

  return JSON.parse(originalLogString, bigintReviver);
}

export function deleteLogInStorage(index: number): void {
  let originalLogString: string | null = localStorage.getItem(
    DATA_NAME_IN_LOCAL_STORAGE
  );
  if (!originalLogString) return;

  let originalLog: UserLog[] = JSON.parse(originalLogString, bigintReviver);
  // 해당 인덱스를 제외한다
  localStorage.setItem(
    DATA_NAME_IN_LOCAL_STORAGE,
    JSON.stringify([
      ...originalLog.slice(0, index),
      ...originalLog.slice(index + 1),
    ])
  );
}

export async function finishAndGetTitle(userLog: UserLog): Promise<string> {
  await alertWithSwal({
    icon: "success",
    text: `목표 단계인 ${
      userLog.setting.goal
    }성에 도달했습니다!\n총 소비: ${userLog.total.cost.toLocaleString()}메소${
      userLog.total.destroy > 0 && userLog.setting.restoreCost === BigInt(0)
        ? " + 장비 " + userLog.total.destroy.toLocaleString() + "개"
        : ""
    }`,
    buttonClass: "btn btn-success",
  });

  let { value: userInput } = await Swal.fire({
    text: "(선택) 강화 내역에 제목을 달 수 있습니다.",
    input: "text",
    inputPlaceholder: "저장할 강화 제목(15자 이내)",
    inputAttributes: {
      maxLength: "15",
    },
    confirmButtonText: "저장",
    customClass: {
      confirmButton: "btn btn-primary",
    },
    buttonsStyling: false,
    allowOutsideClick: false, // 모달 밖 클릭 비활성화
  });

  if (!userInput) userInput = "이름 없음";

  return userInput;
}
