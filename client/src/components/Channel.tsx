export const Channel = () => {
    return (
        <div className="row-start-7 col-start-2 col-span-5">
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
                <input type="text" id="name_field" className="nes-input" placeholder="Enter your message..." />
            </div>
        </div>
    )
}