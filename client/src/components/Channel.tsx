import { useEffect, useRef, useState } from "react"
import { useAppSelector } from "../app/hooks"
import { RootState } from "../app/store"
import { v4 as uuidv4 } from "uuid";

export const Channel = (props: any) => {

    const { handleUpstream, receivedMessage } = props
    const [message, setMessage] = useState('')
    const user = useAppSelector((state: RootState) => state.users)
    const chatRef = useRef<any>(null)

    useEffect(() => {

        if (!chatRef) return
        const chatContainer = chatRef.current

        chatContainer.maxScrollTop = chatContainer.scrollHeight - chatContainer.offsetHeight

        if (chatContainer.maxScrollTop - chatContainer.scrollTop <= chatContainer.offsetHeight) {
            chatContainer.scrollTop = chatContainer.scrollHeight
        } else {

        }

    }, [receivedMessage])

    return (
        <div className="row-start-7 col-start-2 col-span-5 mb-12">
            <div ref={chatRef} className="nes-container h-40 overflow-scroll">
                <div className="message-list">

                    {receivedMessage && receivedMessage.map((message: any) => {
                        if (user.username === message.sender) {
                            return (
                                <div className="message -right" key={uuidv4()}>
                                    <div className="nes-balloon from-right">
                                        <p className="text-sm">me: {message.message}</p>
                                    </div>
                                </div>
                            )
                        } else if (message.sender) {
                            return (
                                <div className="message -left" key={uuidv4()}>
                                    <div className="nes-balloon from-left">
                                        <p className="text-sm">{message.sender} : {message.message}</p>
                                    </div>
                                </div>
                            )
                        }
                    })}

                </div>
            </div>


            <div className="nes-field mt-2">
                <input type="text" id="message" className="nes-input" placeholder="Enter your message..." onChange={(e) => setMessage(e.target.value)} />
                <button onClick={() => handleUpstream(message)}>Send</button>
            </div>
        </div>
    )
}