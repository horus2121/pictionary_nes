import { useEffect, useRef, useState } from "react"
import { useAppSelector } from "../app/hooks"
import { RootState } from "../app/store"
import { v4 as uuidv4 } from "uuid";

export const Channel = (props: any) => {

    const { handleUpstream, receivedMessage, chatListRef, chatInputRef } = props
    const [message, setMessage] = useState('')
    const user = useAppSelector((state: RootState) => state.users)
    const chatContainerRef = useRef<any>(null)

    useEffect(() => {

        if (!chatContainerRef) return
        const chatContainer = chatContainerRef.current

        chatContainer.maxScrollTop = chatContainer.scrollHeight - chatContainer.offsetHeight

        // chatContainer.maxScrollTop - chatContainer.scrollTop <= chatContainer.offsetHeight
        if (chatContainer.scrollTop <= chatContainer.offsetHeight * 2) {
            chatContainer.scrollTop = chatContainer.scrollHeight
        } else {

        }

    }, [receivedMessage])

    const onEnterKey = (e: any) => {
        if (e.key === "Enter") {
            handleUpstream(message)
        }
    }

    return (
        <div className="row-start-7 col-start-2 col-span-5 mb-12">
            <div ref={chatContainerRef} className="nes-container h-40 overflow-scroll">
                <div ref={chatListRef} className="message-list">

                    {/* {receivedMessage && receivedMessage.map((message: any) => {
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
                    })} */}

                </div>
            </div>


            <div className="nes-field mt-2">
                <input ref={chatInputRef} type="text" id="message" className="nes-input" placeholder="Enter your message..." onKeyDown={onEnterKey} onChange={(e) => setMessage(e.target.value)} />
                <button onClick={() => handleUpstream(message)}>Send</button>
            </div>
        </div>
    )
}