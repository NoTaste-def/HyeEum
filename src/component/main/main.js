import React, { useState, useEffect } from 'react';
import Typewriter from 'typewriter-effect';
import './main.css';
import { logDOM } from '@testing-library/react';

function Main() {
    const [clickedVisible, setClickedVisible] = useState(false);

    useEffect(() => {
        // 컴포넌트가 마운트된 후 3초 후에 clicked 요소를 보이게 설정
        const timer = setTimeout(() => {
            setClickedVisible(true);
        }, 15000);

        // 컴포넌트가 언마운트되면 타이머를 클리어합니다.
        return () => clearTimeout(timer);
    }, []);

    const nextpage = () => {
        console.log("다음페이지로 이동");
        localStorage.setItem('boo', clickedVisible);
        localStorage.getItem('boo', clickedVisible);
    }

    return (
        <div className='main_container'>
            <Typewriter
                options={{
                    strings: ['오늘은 어땟나요?','오늘은 당신에게 무슨일이 있었나요?','당신의 이야기를 저에게 들려주세요', '그 전에 당신에 대해 몇가지만 물어볼게요'],
                    autoStart: true,
                    loop: false,
                    pauseFor: 1000,
                }}
            />
            {clickedVisible && (
                <div className='clicked' style={{ color: "white", display: "flex", justifyContent: "center" }} onClick={nextpage}>
                    이곳을 클릭해주세요
                </div>
            )}
        </div>
    );
}

export default Main;
