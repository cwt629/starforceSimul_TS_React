import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { SwalIcon } from "../type/swal";

const ReactSwal = withReactContent(Swal);

interface alertOptions {
    icon: SwalIcon,
    text: string,
    buttonClass: string,
    buttonClass2?: string
}

export async function alertWithSwal({ icon, text, buttonClass }: alertOptions) {
    const result = await ReactSwal.fire({
        icon: icon,
        html: text.replaceAll('\n', '<br/>'), // \n이 제대로 띄어쓰기 처리되도록 처리
        confirmButtonText: '확인',
        customClass: {
            confirmButton: buttonClass
        },
        buttonsStyling: false // sweetalert2 기본 스타일 비활성화
    });
    return result;
}

export async function confirmWithSwal({ icon, text, buttonClass, buttonClass2 }: alertOptions) {
    const result = await ReactSwal.fire({
        icon: icon,
        html: text.replaceAll('\n', '<br/>'), // \n이 제대로 띄어쓰기 처리되도록 처리
        showDenyButton: true,
        confirmButtonText: '확인',
        denyButtonText: '취소',
        customClass: {
            confirmButton: buttonClass,
            denyButton: buttonClass2
        },
        buttonsStyling: false
    })
    return result;
}