export function getFormattedDate(str: string): string {
    let date: Date = new Date(str)
    // 연, 월, 일, 시, 분, 초까지 받아온다
    let year: string = date.getFullYear().toString();
    let month: string = (date.getMonth() + 1).toString().padStart(2, '0'); // 길이가 2보다 짧으면 앞을 0으로 채움
    let day: string = date.getDate().toString().padStart(2, '0');
    let hour: string = date.getHours().toString().padStart(2, '0');
    let minute: string = date.getMinutes().toString().padStart(2, '0');
    let second: string = date.getSeconds().toString().padStart(2, '0');

    return `${year}/${month}/${day} ${hour}:${minute}:${second}`;
}