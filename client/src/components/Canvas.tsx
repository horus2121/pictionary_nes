import { useEffect, useRef, useState } from "react";
import { Tools } from "./Tools";

const penCursor = "url('https://img.icons8.com/ios-glyphs/30/undefined/quill-pen.png') 0 30, auto"
const eraserCursor = "url('https://img.icons8.com/metro/26/undefined/eraser.png') 0 26, auto"

const getWidth = () => window.innerWidth
const getHeight = () => window.innerHeight

export const Canvas = (props: any) => {

    const { handleUpstream } = props
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [isDrawing, setIsDrawing] = useState(false)
    const [eraserOn, setEraserOn] = useState(false);
    const [windowWidth, setWindowWidth] = useState(getWidth())
    const [windowHeight, setWindowHeight] = useState(getHeight())
    const [canvasData, setCanvasData] = useState<void | {}>({})

    useEffect(() => {
        if (!canvasRef.current) return
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')

        canvas.height = window.innerHeight * 0.5
        canvas.width = window.innerWidth * 0.5

        if (!ctx) return
        ctx.lineCap = "round"
        ctx.strokeStyle = "black"
        ctx.lineWidth = 2
        canvasRef.current.style.cursor = penCursor

    }, [windowWidth, windowHeight]
    )

    useEffect(() => {
        const resizeListener = () => {
            setWindowWidth(getWidth())
            setWindowHeight(getHeight())
        };

        window.addEventListener('resize', resizeListener);

        resize()

        return () => {
            window.removeEventListener('resize', resizeListener);
        }
    }, [windowWidth, windowHeight])

    const startDrawing = ({ nativeEvent }: any) => {
        const { offsetX, offsetY } = nativeEvent

        if (!canvasRef.current) return
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')

        if (!ctx) return
        ctx.beginPath()
        // ctx.moveTo(clientX - offsetLeft, clientY - offsetTop)
        ctx.moveTo(offsetX, offsetY)
        setIsDrawing(true)
    }

    const endDrawing = () => {
        if (!canvasRef.current) return
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')

        if (!ctx) return
        ctx.closePath()
        setIsDrawing(false)
    }

    const draw = ({ nativeEvent }: any) => {
        if (!isDrawing) return

        const { offsetX, offsetY } = nativeEvent

        if (!canvasRef.current) return
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')

        if (!ctx) return
        // ctx.lineTo(clientX - offsetLeft, clientY - offsetTop)
        ctx.lineTo(offsetX, offsetY)
        ctx.stroke()
    }

    const resize = () => {
        if (!canvasRef.current) return
        const canvas = canvasRef.current

        canvas.height = window.innerHeight * 0.5
        canvas.width = window.innerWidth * 0.5
    }

    const pen = () => {
        if (!canvasRef.current) return
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')

        if (!ctx) return
        ctx.strokeStyle = "black";
        canvasRef.current.style.cursor = penCursor;
        setEraserOn(false);
    }

    const eraser = () => {
        if (!canvasRef.current) return
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')

        if (!ctx) return
        ctx.strokeStyle = "white";
        canvasRef.current.style.cursor = eraserCursor;
        setEraserOn(true);
    }

    const bin = () => {
        if (!canvasRef.current) return
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')

        if (!ctx) return
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        // handleReset();
    }

    const switchColor = (nativeEvent: any) => {
        if (eraserOn) return;
        // ctxRef.current.strokeStyle = nativeEvent.target.value;
        // console.log(nativeEvent.target.value)
        // setActivedColor(nativeEvent.target.value);
        // console.log(activedColor)
        // ctxRef.current.strokeStyle = activedColor;
    }

    const changeWidth = ({ nativeEvent }: any) => {
        if (!canvasRef.current) return
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')

        if (!ctx) return
        ctx.lineWidth = nativeEvent.target.value;
    }

    useEffect(() => {
        if (!canvasRef.current) return
        const canvas = canvasRef.current

        setCanvasData(canvas.toDataURL())
        console.log(canvasData)
        handleUpstream(canvasData)

    }, [startDrawing, draw, endDrawing, bin])

    return (
        <>
            <div className="nes-container with-title is-centered col-start-2 col-span-5 row-start-2 row-span-4">
                <p className="title">Canvas</p>
                <p>Hey there. Draw something right hereeee.</p>
                <canvas
                    ref={canvasRef}
                    onMouseDown={startDrawing}
                    onMouseUp={endDrawing}
                    onMouseMove={draw}></canvas>
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