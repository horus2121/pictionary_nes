export const Tools = (props: any) => {

    const { pen, eraser, bin, switchColor, changeWidth } = props


    return (
        <div className="col-start-3 col-span-3 row-start-6">
            <button type="button" className="nes-btn is-primary" onClick={pen}>Pencil</button>
            <button type="button" className="nes-btn is-success" onClick={eraser}>Eraser</button>
            <button type="button" className="nes-btn is-warning" onClick={bin}>CleanAll</button>
            <button type="button" className="nes-btn is-error" onClick={switchColor}>Color</button>
            <button type="button" className="nes-btn is-error" onClick={changeWidth}>Width</button>
        </div>
    )
}