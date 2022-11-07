import { useEffect, useRef, useState } from "react";
import { Tools } from "./Tools";
import { ReactSketchCanvas } from "react-sketch-canvas";

const penCursor = "url('https://img.icons8.com/ios-glyphs/30/undefined/quill-pen.png') 0 30, auto"
const eraserCursor = "url('https://img.icons8.com/metro/26/undefined/eraser.png') 0 26, auto"

const getWidth = () => window.innerWidth
const getHeight = () => window.innerHeight

const styles = {
    border: '0.0625rem solid #9c9c9c',
    borderRadius: '0.25rem',
}

export const Canvas = (props: any) => {

    const { handleUpstream, receivedCanvasPath } = props
    const canvasRef = useRef(null)
    const [windowWidth, setWindowWidth] = useState(getWidth())
    const [windowHeight, setWindowHeight] = useState(getHeight())
    const [strokeColor, setStrokeColor] = useState('black')
    const [strokeWidth, setStrokeWidth] = useState(4)
    const [gameOn, setGameOn] = useState(false)
    const [drawOn, setDrawOn] = useState(false)

    useEffect(() => {

    }, [windowWidth, windowHeight]
    )

    useEffect(() => {
        const resizeListener = () => {
            setWindowWidth(getWidth())
            setWindowHeight(getHeight())
        };

        window.addEventListener('resize', resizeListener);


        return () => {
            window.removeEventListener('resize', resizeListener);
        }
    }, [windowWidth, windowHeight])


    const pen = () => {
        if (!canvasRef.current) return
        const canvas: any = canvasRef.current

        canvas.eraseMode(false)
    }

    const eraser = () => {
        if (!canvasRef.current) return
        const canvas: any = canvasRef.current

        canvas.eraseMode(true)
    }

    const bin = () => {
        if (!canvasRef.current) return
        const canvas: any = canvasRef.current

        canvas.resetCanvas()
    }

    const switchColor = (e: any) => {
        setStrokeColor(e.target.value)
    }

    const changeWidth = (e: any) => {
        setStrokeWidth(e.target.value)
    }

    const handleCanvasData = () => {
        if (!canvasRef.current) return
        const canvas: any = canvasRef.current

        if (drawOn) {
            const data = canvas.exportPaths()
            data.then((path: any) => handleUpstream(path))
        }
    }

    useEffect(() => {
        if (!canvasRef.current) return
        const canvas: any = canvasRef.current

        if (!receivedCanvasPath || Object.keys(receivedCanvasPath).length == 0) return
        // console.log(receivedCanvasPath)
        canvas.loadPaths(receivedCanvasPath)
    }, [receivedCanvasPath])

    return (
        <>
            <div className="nes-container with-title is-centered col-start-2 col-span-5 row-start-2 row-span-4" onMouseDown={() => setDrawOn(true)} onMouseUp={() => setDrawOn(false)}>
                <p className="title">Canvas</p>
                <ReactSketchCanvas
                    ref={canvasRef}
                    style={styles}
                    strokeColor={strokeColor}
                    strokeWidth={strokeWidth}
                    onChange={handleCanvasData} />
                {!gameOn &&
                    <button className="absolute top-1/2 left-1/2 nes-text is-error" onClick={() => setGameOn(true)}>Start</button>
                }
            </div>
            <Tools
                canvasRef={canvasRef}
                penCursor={penCursor}
                eraserCursor={eraserCursor}
                pen={pen}
                eraser={eraser}
                bin={bin}
                switchColor={switchColor}
                changeWidth={changeWidth} />
        </>
    )
}