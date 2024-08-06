import { UserLog } from "../type/storage";
import { bigintReplacer, bigintReviver } from "./bigint";

const DATA_NAME_IN_LOCAL_STORAGE = "reinforced-log"

export function saveLogOnStorage(userLog: UserLog): void {
    let originalLogString: string | null = localStorage.getItem(DATA_NAME_IN_LOCAL_STORAGE);
    if (!originalLogString) {
        localStorage.setItem(DATA_NAME_IN_LOCAL_STORAGE, JSON.stringify([userLog], bigintReplacer));
        return;
    }

    let originalLog: UserLog[] = JSON.parse(originalLogString, bigintReviver);
    localStorage.setItem(DATA_NAME_IN_LOCAL_STORAGE, JSON.stringify([...originalLog, userLog], bigintReplacer));
}

export function getLogInStorage(): UserLog[] {
    let originalLogString: string | null = localStorage.getItem(DATA_NAME_IN_LOCAL_STORAGE);
    if (!originalLogString)
        return [];

    return JSON.parse(originalLogString, bigintReviver);
}

