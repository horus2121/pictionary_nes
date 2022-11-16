import { useEffect, useState } from "react";
import { Tools } from "./Tools";
import { ReactSketchCanvas } from "react-sketch-canvas";

const penCursor = "url('https://img.icons8.com/ios-glyphs/30/undefined/quill-pen.png') 0 30, auto"
const eraserCursor = "url('https://img.icons8.com/metro/26/undefined/eraser.png') 0 26, auto"

const styles = {
    border: '0.0625rem solid #9c9c9c',
    borderRadius: '0.25rem',
}

export const Canvas = (props: any) => {

    const { canvasRef, gameOn, drawOn, handleUpstream, receivedCanvasPath, bin } = props
    const [strokeColor, setStrokeColor] = useState('black')
    const [strokeWidth, setStrokeWidth] = useState(4)
    const [pointerInCanvasRange, setPointerInCanvasRange] = useState(false)

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

    const switchColor = (e: any) => {
        setStrokeColor(e.target.value)
    }

    const changeWidth = (e: any) => {
        setStrokeWidth(e.target.value)
    }

    const handleCanvasData = () => {
        if (!canvasRef.current) return
        const canvas: any = canvasRef.current

        if (pointerInCanvasRange) {
            const data = canvas.exportPaths()
            data.then((path: any) => handleUpstream(path))
        }
    }

    useEffect(() => {
        if (!canvasRef.current) return
        const canvas: any = canvasRef.current

        if (!receivedCanvasPath || Object.keys(receivedCanvasPath).length === 0) return
        canvas.loadPaths(receivedCanvasPath)
    }, [receivedCanvasPath])

    return (
        <>
            <div
                style={gameOn && drawOn ? { pointerEvents: "auto", height: "500px" } : { pointerEvents: "none", height: "500px" }}
                className="nes-container with-title is-centered col-start-2 col-span-5 row-start-2 row-span-4"
                onMouseDown={() => setPointerInCanvasRange(true)}
                onMouseUp={() => setPointerInCanvasRange(false)}>
                <p className="title">Canvas</p>
                <ReactSketchCanvas
                    ref={canvasRef}
                    style={styles}
                    strokeColor={strokeColor}
                    strokeWidth={strokeWidth}
                    onChange={handleCanvasData} />
            </div>
            <Tools
                gameOn={gameOn}
                drawOn={drawOn}
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