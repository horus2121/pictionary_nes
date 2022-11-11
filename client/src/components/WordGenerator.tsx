export const WordGenerator = (props: any) => {

    const { gameOn, currentDrawer } = props

    return (
        <>
            {gameOn ?
                <div className="col-start-3 col-span-3 row-start-1 mt-5">
                    <span className="nes-texty flex flex-row flex-nowrap">
                        Please draw: something
                    </span>

                    <span className="nes-texty flex flex-row flex-nowrap">
                        Player {currentDrawer} is drawing
                    </span>
                </div>
                :
                <div className="col-start-3 col-span-3 row-start-1 mt-5">
                    <span className="nes-texty flex flex-row flex-nowrap">
                        Waiting for players...
                    </span>
                </div>
            }
        </>
    )
}