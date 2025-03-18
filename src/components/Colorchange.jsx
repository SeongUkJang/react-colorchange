    import React, {useState, useRef} from 'react'
    import './Colorchange.scss'
    const Colorchange = () => {
        
        const getRandomColor = () => {
            const randomColor = '#'+Math.random().toString(16).slice(2,8).padEnd(6,'0')
            return randomColor
        }
        const [bgColor,setBgColor]= useState(getRandomColor())
        const [isPlaying, setIsPlaying] = useState(false)
        const intervalRef = useRef(null)
        const startBgchange=()=>{
            if(!intervalRef.current){
                intervalRef.current=setInterval(()=>{
                    setBgColor(getRandomColor())
                },2000)
                setIsPlaying(true)
            }
        }
        const stopBgchange=()=>{
            if(intervalRef.current){
                clearInterval(intervalRef.current)
                intervalRef.current = null
                setIsPlaying(false)
            }
        }


    return (
    <div>
        <div className='bg-container' style={{backgroundColor:bgColor}}>
            <h1 className='color-code'>{bgColor.toUpperCase()}</h1>
            <div className="button-group">
            <button onClick={startBgchange}
            disabled={isPlaying}
            className="control-button">
                play
                </button>
            <button 
            onClick={stopBgchange}
            disabled={!isPlaying}
            className="control-button">stop</button>
            </div>
        </div>
    </div>
    )
    }

    export default Colorchange
