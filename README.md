react-colorchange
React를 사용하여 배경 색상이 일정 시간마다 랜덤하게 변경되는 기능을 구현하였습니다. 

### 핵심 기능:
1. **배경 색상 랜덤 변경**: `getRandomColor` 함수는 랜덤한 색상을 생성합니다.
2. **색상 변경 시작/중지**: `startBgchange` 함수는 일정 시간마다 배경 색상을 변경하고, `stopBgchange` 함수는 색상 변경을 멈추게 합니다.
3. **버튼 제어**: "play" 버튼을 클릭하면 색상 변경이 시작되고, "stop" 버튼을 클릭하면 색상 변경이 멈추게 됩니다.

### 코드 설명:

```jsx
import React, { useState, useRef } from 'react'; // React 훅을 사용하기 위해 import
import './Colorchange.scss'; // 스타일시트 가져오기

const Colorchange = () => {
    // 랜덤 색상 생성 함수
    const getRandomColor = () => {
        const randomColor = '#' + Math.random().toString(16).slice(2, 8).padEnd(6, '0');
        return randomColor; // '#RRGGBB' 형식의 색상 반환
    };

    // 상태 설정
    const [bgColor, setBgColor] = useState(getRandomColor()); // 초기 색상은 랜덤으로 설정
    const [isPlaying, setIsPlaying] = useState(false); // 색상 변경이 진행 중인지 체크
    const intervalRef = useRef(null); // 인터벌 ID를 저장할 Ref

    // 색상 변경 시작 함수
    const startBgchange = () => {
        if (!intervalRef.current) { // 이미 인터벌이 설정되어 있지 않으면
            intervalRef.current = setInterval(() => {
                setBgColor(getRandomColor()); // 2초마다 랜덤 색상으로 변경
            }, 2000);
            setIsPlaying(true); // 상태 업데이트
        }
    };

    // 색상 변경 멈추는 함수
    const stopBgchange = () => {
        if (intervalRef.current) { // 인터벌이 설정되어 있으면
            clearInterval(intervalRef.current); // 인터벌을 정리
            intervalRef.current = null; // 인터벌 참조 초기화
            setIsPlaying(false); // 상태 업데이트
        }
    };

    return (
        <div>
            <div className='bg-container' style={{ backgroundColor: bgColor }}>
                <h1 className='color-code'>{bgColor.toUpperCase()}</h1> {/* 색상 코드 표시 */}
                <div className="button-group">
                    <button
                        onClick={startBgchange}
                        disabled={isPlaying} // 이미 실행 중일 때는 play 버튼 비활성화
                        className="control-button"
                    >
                        Play
                    </button>
                    <button
                        onClick={stopBgchange}
                        disabled={!isPlaying} // 실행 중이지 않으면 stop 버튼 비활성화
                        className="control-button"
                    >
                        Stop
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Colorchange;
```

### 주요 기능 설명:
- **`getRandomColor`**: 이 함수는 `#`과 함께 랜덤한 색상 코드(예: `#a1b2c3`)를 생성합니다.
- **`useState`**: 상태를 관리하는 훅으로 `bgColor`는 배경색을 저장하고, `isPlaying`은 색상 변경이 진행 중인지 체크하는 상태입니다.
- **`useRef`**: 인터벌 ID를 저장하는 `intervalRef`를 사용하여 색상 변경을 멈추거나 재개할 수 있도록 합니다.
- **`startBgchange`**: "Play" 버튼 클릭 시 실행되며, 2초마다 랜덤 색상으로 배경색을 변경합니다.
- **`stopBgchange`**: "Stop" 버튼 클릭 시 실행되며, 색상 변경을 멈추게 합니다.
