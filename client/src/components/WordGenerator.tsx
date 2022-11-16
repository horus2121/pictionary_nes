export const WordGenerator = (props: any) => {

    const { gameOn, drawOn, currentDrawer, word } = props

    return (
        <>
            {(!gameOn) ?
                <div className="col-start-3 col-span-3 row-start-1 mt-5">
                    <span className="nes-texty flex flex-row flex-nowrap">
                        Waiting for players...
                    </span>
                </div>
                : (drawOn) ?
                    <div className="col-start-3 col-span-3 row-start-1 mt-5">
                        <span className="nes-texty flex flex-row flex-nowrap">
                            Please draw: {word}
                        </span>
                    </div>
                    :
                    <div className="col-start-3 col-span-3 row-start-1 mt-5">
                        <span className="nes-texty flex flex-row flex-nowrap">
                            {currentDrawer} is drawing...
                        </span>
                    </div>
            }
        </>
    )
}