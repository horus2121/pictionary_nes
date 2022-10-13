import { useEffect, useRef, useState } from "react";

const penCursor = "url('https://img.icons8.com/ios-glyphs/30/undefined/quill-pen.png') 0 30, auto"

export const Canvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const ctxRef = useRef<HTMLCanvasElement>(null)
    const [isDrawing, setIsDrawing] = useState(false)


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
    }, []
    )

    const startDrawing = ({ nativeEvent }: any) => {
        const { clientX, clientY, target: { offsetLeft, offsetTop } } = nativeEvent

        if (!canvasRef.current) return
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')

        if (!ctx) return
        ctx.beginPath()
        ctx.moveTo(clientX - offsetLeft, clientY - offsetTop)
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

        const { clientX, clientY, target: { offsetLeft, offsetTop } } = nativeEvent

        if (!canvasRef.current) return
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')

        if (!ctx) return
        ctx.lineTo(clientX - offsetLeft, clientY - offsetTop)
        ctx.stroke()
    }

    return (
        <div className="nes-container with-title is-centered col-start-2 col-span-5 row-start-2 row-span-4">
            <p className="title">Canvas</p>
            <p>Hey there. Draw something right hereeee.</p>
            <canvas></canvas>
        </div>
    )
}