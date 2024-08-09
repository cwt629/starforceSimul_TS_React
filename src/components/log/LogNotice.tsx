function LogNotice() {
    return (
        <div className="mt-4 p-3 bg-primary text-white rounded">
            <h3>나의 강화 기록 확인하기</h3>
            <ul className="log-notice-list">
                <li>카드를 클릭하면 해당 강화에서 수행한 강화의 모든 결과를 확인할 수 있습니다.</li>
                <li>해당 기록은 로컬스토리지를 기반으로 저장되어, 브라우저 등의 환경이 달라질 경우 기록이 따로 저장됩니다.</li>
            </ul>
        </div>
    )
}

export default LogNotice;