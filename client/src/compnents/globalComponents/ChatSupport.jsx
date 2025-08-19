import { useState } from 'react'
import { FaPhoneFlip } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";


const contactInfo = [
    { Icon: <FiPhoneCall />, href: "tel:01935679071" },
    { Icon: <FaWhatsapp />, href: "https://wa.me/8801935679071" },
]

function ChatSupport() {

    const [isShow, setIsShow] = useState(false)

    return (
        <>
            {isShow &&
                <div className="fixed shadow flex flex-col gap-4 px-2 py-3 border border-gray-300 rounded-xl bg-white bottom-35 w-16 right-5">
                    {contactInfo?.map(item => (
                        <ReachOutButton onClick={()=> window.location.href = item.href} Icon={item.Icon} />
                    ))}
                </div>}
            <ReachOutButton onClick={() => setIsShow(p => !p)} className="fixed bottom-20 right-5" Icon={<FaPhoneFlip />} />
        </>
    )
}

export default ChatSupport;

function ReachOutButton({ className, Icon, onClick }) {
    return (
        <div onClick={onClick} className={`${className} cursor-pointer text-2xl text-white p-3 rounded-full bg-orange-400`}>
            {Icon}
        </div>
    )
}
