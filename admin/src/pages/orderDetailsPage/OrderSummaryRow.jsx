
export default function OrderSummaryRow({ text, value }) {
  return (
    <>
      {value &&
        <div className={`flex justify-between items-center border-b border-gray-300`}>
          <span>{text}</span>
          <span className="font-bold">
            {value}
          </span>
        </div>}
    </>
  )
}
