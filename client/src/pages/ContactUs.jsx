import { MdOutlineContactMail } from "react-icons/md";
import { FaPhoneAlt, FaFacebook, FaYoutube, FaWhatsappSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdMarkEmailUnread } from "react-icons/md";
import { MdOutlineCastConnected } from "react-icons/md";


export default function ContactUs() {
  return (
    <div className="p-4 select-none text-slate-800 max-w-xl mx-auto">
      <h1 className="text-xl text-center">আমাদের  সাথে যোগাযোগ করুণ । </h1>
      <p className="text-sm mt-1 text-center">আপনার যেকোনো প্রশ্ন বা সহায়তার প্রয়োজনে আমাদের সাথে যোগাযোগ করুন। আমরা দ্রুত উত্তর দেওয়ার চেষ্টা করব।</p>
      <div className="grid grid-cols-1 mt-5 gap-3 md:grid-cols-2">

        {/* const info */}
        <div>
          <h1 className="text-lg flex items-center gap-3"><MdOutlineContactMail />যোগাযোগ তথ্য </h1>
          <h1 className="text-sm  flex mb-1 items-center gap-3"><FaPhoneAlt />ফোন নাম্বার </h1>
          <a href="tel:01326420991" className="text-sm ml-10 text-orange-400 hover:underline">
            01326420991
          </a> <br />
          <a href="tel:01875375515" className="text-sm ml-10 text-orange-400 hover:underline">
            01875375515
          </a>

          <h1 className="text-sm flex mb-1 items-center gap-3"><MdMarkEmailUnread />ইমেইল  </h1>
          <a
            href="mailto:support@bazarbhai.com"
            className="text-sm ml-10 text-orange-400 hover:underline"
          >
            support@bazarbhai.com
          </a>

        </div>
        {/* social handle */}
        <div>
          <h1 className="text-lg flex items-center gap-3"><MdOutlineCastConnected />আমাদের সাথে যুক্ত থাকুন</h1>
          <div className="flex gap-4 mt-2">
            <a
              href="https://www.facebook.com/foundersaiful"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook size={30} className="text-blue-600 hover:scale-110 transition-transform cursor-pointer" />
            </a>



            <a
              href="https://x.com/foundersaiful"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaXTwitter size={30} className="text-black hover:scale-110 transition-transform cursor-pointer" />
            </a>


            <a
              href="https://whatsapp.com/channel/0029VbBUVKV59PwIQrKij13R" // invite link
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsappSquare size={32} className="text-green-500 hover:scale-110 transition-transform" />
            </a>

            <a
              href="https://www.youtube.com/@founderSaiful" // Replace with your actual YouTube channel URL
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube size={35} className="text-red-600 hover:scale-110 transition-transform" />
            </a>

          </div>
        </div>
      </div>
    </div>
  )
}
