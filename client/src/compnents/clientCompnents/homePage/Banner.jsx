import { Link } from "react-router-dom";

export default function Banner() {
    return (
        <div className="home-page-bannar">
            <img src="/images/banner.webp" alt="Banner"
                className="w-full h-full brightness-75 object-cover" />
            <div className="absolute select-none top-1/2 text-white text-2xl w-full  text-center left-1/2 -translate-x-1/2 -translate-y-1/2">
                এখন কেনাকাটা হবে ঘরে বসে <br />
                <span className="text-slate-800 font-bold">বাজার ভাই.কমে</span>
                <br />
                <Link to="/shop">
                    <div className="text-lg px-4 py-1 mt-2 border-orange-400 border inline-block bg-orange-400 rounded-full">শপিং করি</div>
                </Link>
            </div>
        </div>
    );
}