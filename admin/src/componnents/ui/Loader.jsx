export default function Loader({ style = "w-[35px]" }) {
    return (
        <div className='flex justify-center w-full mt-20'>
            <div 
            className={`aspect-square ${style} 
               duration-75 rounded-full border-4
             border-orange-400 animate-spin 
             border-l-transparent`}></div>
        </div>
    )
}
