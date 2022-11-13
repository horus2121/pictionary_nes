import { useEffect } from "react"

export const WordGenerator = (props: any) => {

    const { gameOn, currentDrawer, word, setWord } = props

    // useEffect(() => {

    //     if (gameOn) {
    //         fetch('https://random-word-api.herokuapp.com/word')
    //             .then(res => res.json())
    //             .then(json => console.log(json[0]))
    //             .catch(err => console.log(err))
    //     }

    // }, [gameOn, currentDrawer])

    return (
        <>
            {gameOn ?
                <div className="col-start-3 col-span-3 row-start-1 mt-5">
                    <span className="nes-texty flex flex-row flex-nowrap">
                        Please draw: {word}
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