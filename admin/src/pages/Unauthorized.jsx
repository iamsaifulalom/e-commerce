import { Link } from "react-router-dom"

export default function Unauthorized() {
  return (
    <div className='text-xl mt-16 text-center text-red-500'>
      <h1>😔 Sorry, you don't have access</h1>
      <Link to="/sign-in" className="border px-3 py-1.5 rounded text-sm">
        Try again
      </Link>
    </div>
  )
}
