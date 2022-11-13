import { useState } from "react"

export const Channel = (props: any) => {

    const { handleUpstream, messageSender, receivedMessage, ownMessage } = props
    const [message, setMessage] = useState('')

    return (
        <div className="row-start-7 col-start-2 col-span-5 mb-12">
            <div className="nes-container h-40 overflow-scroll">
                <div className="message-list">
                    <div className="message -left">
                        <div className="nes-balloon from-left">
                            <p className="text-sm">{messageSender} : {receivedMessage}</p>
                        </div>
                    </div>

                    <div className="message -right">
                        <div className="nes-balloon from-right">
                            <p className="text-sm">{ownMessage}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="nes-field mt-2">
                <input type="text" id="message" className="nes-input" placeholder="Enter your message..." onChange={(e) => setMessage(e.target.value)} />
                <button onClick={() => handleUpstream(message)}>Send</button>
            </div>
        </div>
    )
}