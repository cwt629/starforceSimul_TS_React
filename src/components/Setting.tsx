function Setting() {
    return (
        <form className="setting">
            <h3>시뮬레이션 설정</h3>
            <table>
                <tr>
                    <td>장비 레벨 *</td>
                    <td colSpan={2}>
                        <input type="text" name="level" placeholder="ex) 150, 160, 200, 250" maxLength={3} /> 레벨
                    </td>
                </tr>
                <tr>
                    <td rowSpan={2}>시뮬레이션 목표 *</td>
                    <td>시작</td>
                    <td>목표</td>
                </tr>
                <tr>
                    <td><input type="text" name="starfrom" placeholder="0~24 정수" maxLength={2} />성</td>
                    <td><input type="text" name="starto" placeholder="1~25 정수" maxLength={2} />성</td>
                </tr>
                <tr>
                    <td>장비 복구 비용</td>
                    <td colSpan={2}>
                        <input type="text" name="restorecost" defaultValue={0} /> 메소
                        <div className="explain">복구 비용은 선택 사항이며, 0메소로 입력 시 파괴된 장비의 개수로 결과가 안내됩니다.</div>
                    </td>
                </tr>
            </table>
            <button type="submit">시작</button>
        </form>
    )
}

export default Setting;