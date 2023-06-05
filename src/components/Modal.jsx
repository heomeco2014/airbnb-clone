import React from 'react'
import useComponentVisible from './../Hooks/useComponentVisible'
function Modal(props) {
    const { ref, isComponentVisible } = useComponentVisible(true)
    if (!props.show) {
        return null
    }
    return (
        <div ref={ref}>
            {isComponentVisible && (
                <div className="fixed inset-0 left-[50%] top-[50%] flex h-[130px] w-[300px] translate-x-[-50%] flex-col overflow-hidden  rounded-xl bg-slate-300 p-4">
                    <div>
                        <h4 className=" font-semibold">{props.title}</h4>
                    </div>
                    <div className="w-[500px] overflow-hidden border-b-[1px] border-t-[1px] py-2">{props.children}</div>
                    <div>
                        <button onClick={props.yes}>Yes</button>
                        <button onClick={props.no}>No</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Modal
