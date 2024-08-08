import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { SwalIcon } from "../type/swal";
import { autoScrollByID } from "./autoscroll";

const ReactSwal = withReactContent(Swal);

interface alertOptions {
    icon: SwalIcon,
    text: string,
    buttonClass: string,
    buttonClass2?: string,
    scrollbarPadding?: boolean
}

export async function alertWithSwal({ icon, text, buttonClass, scrollbarPadding = true }: alertOptions) {
    const result = await ReactSwal.fire({
        icon: icon,
        html: text.replaceAll('\n', '<br/>'), // \n이 제대로 띄어쓰기 처리되도록 처리
        confirmButtonText: '확인',
        scrollbarPadding: scrollbarPadding,
        customClass: {
            confirmButton: buttonClass
        },
        buttonsStyling: false // sweetalert2 기본 스타일 비활성화
    });
    return result;
}

export async function confirmWithSwal({ icon, text, buttonClass, buttonClass2, scrollbarPadding = true }: alertOptions) {
    const result = await ReactSwal.fire({
        icon: icon,
        html: text.replaceAll('\n', '<br/>'), // \n이 제대로 띄어쓰기 처리되도록 처리
        showDenyButton: true,
        confirmButtonText: '확인',
        denyButtonText: '취소',
        scrollbarPadding: scrollbarPadding,
        customClass: {
            confirmButton: buttonClass,
            denyButton: buttonClass2
        },
        buttonsStyling: false,
        didClose: () => {
            autoScrollByID("leaderboard");
        }
    })
    return result;
}

// 시뮬레이션 재시작에 대한 swal(자동 스크롤과 겸비)
export async function confirmRestartSimulation(): Promise<boolean> {
    const result = await ReactSwal.fire({
        icon: 'warning',
        html: '현재 진행 중인 강화를 초기화하고 다시 강화를 시작하시겠습니까?',
        showDenyButton: true,
        confirmButtonText: '확인',
        denyButtonText: '취소',
        scrollbarPadding: false,
        customClass: {
            confirmButton: 'btn btn-primary mg-10',
            denyButton: 'btn btn-secondary mg-10'
        },
        buttonsStyling: false,
    })
    if (result.isConfirmed) {
        await ReactSwal.fire({
            icon: 'success',
            html: '시뮬레이션을 재시작합니다.',
            confirmButtonText: '확인',
            scrollbarPadding: false,
            customClass: {
                confirmButton: 'btn btn-success'
            },
            buttonsStyling: false,
            didClose: () => {
                autoScrollByID("leaderboard");
            }
        });
    }

    return result.isConfirmed;
}