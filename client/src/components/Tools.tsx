const colors = [
    {
        label: "Black",
        value: "#000000"
    },
    {
        label: "Red",
        value: "#FF0000"
    },
    {
        label: "Blue",
        value: "#0000CC"
    },
    {
        label: "Green",
        value: "#006600"
    },
    {
        label: "Yellow",
        value: "#FFFF00"
    },
    {
        label: "Orange",
        value: "#FFA500"
    },
    {
        label: "Purple",
        value: "#990099"
    },
]

const colorOptions = colors.map(color => {
    return (
        <option key={color.value}>{color.label}</option>
    )
})

const widths = [
    {
        label: "2",
        value: "2"
    },
    {
        label: "4",
        value: "4"
    },
    {
        label: "6",
        value: "6"
    },
    {
        label: "8",
        value: "8"
    },
    {
        label: "10",
        value: "10"
    },
    {
        label: "12",
        value: "12"
    },
    {
        label: "14",
        value: "14"
    },
    {
        label: "16",
        value: "16"
    },
]

const widthOptions = widths.map(width => {
    return (
        <option key={width.value}>{width.label}</option>
    )
})

export const Tools = (props: any) => {

    const { pen, eraser, bin, switchColor, changeWidth, gameOn, drawOn } = props


    return (
        <div
            style={gameOn && drawOn ? { pointerEvents: "auto" } : { pointerEvents: "none" }}
            className="flex flex-row col-start-2 col-span-5 row-start-6">
            <div className="w-40 shrink">
                <button type="button" className="nes-btn is-primary shrink cursot-pointer" onClick={pen}>Pencil</button>
            </div>
            <div className="w-40 shrink">
                <button type="button" className="nes-btn is-success shrink cursot-pointer" onClick={eraser}>Eraser</button>
            </div>
            <div className="w-40 shrink">
                <button type="button" className="nes-btn is-warning shrink cursot-pointer" onClick={bin}>CleanAll</button>
            </div>

            <div className="nes-select w-40 shrink cursot-pointer">
                <select required id="color" defaultValue="" onChange={switchColor}>
                    <option value="" disabled hidden>Color...</option>
                    {colorOptions}
                </select>
            </div>

            <div className="nes-select w-40 shrink cursot-pointer">
                <select required id="width" defaultValue="" onChange={changeWidth}>
                    <option value="" disabled hidden>Width...</option>
                    {widthOptions}
                </select>
            </div>
        </div>
    )
}