import { useState } from "react"

export const Channel = (props: any) => {

    const { handleUpstream } = props
    const [message, setMessage] = useState('')

    const handleChatMessage = async (content: any) => {

        const res = await fetch('/chat_messages', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                content: content
            })
        })

    }

    return (
        <div className="row-start-7 col-start-2 col-span-5 mb-12">
            <div className="nes-container h-40 overflow-scroll">
                <div className="message-list">
                    <div className="message -left">
                        <div className="nes-balloon from-left">
                            <p className="text-sm">Goodd Morning.</p>
                        </div>
                    </div>

                    <div className="message -left">
                        <div className="nes-balloon from-left">
                            <p className="text-sm">Goodd Night.</p>
                        </div>
                    </div>

                    <div className="message -left">
                        <div className="nes-balloon from-left">
                            <p className="text-sm">Byebye.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="nes-field mt-2">
                <input type="text" id="message" className="nes-input" placeholder="Enter your message..." onChange={(e) => setMessage(e.target.value)} />
                <button onClick={() => handleChatMessage(message)}>Send</button>
            </div>
        </div>
    )
}