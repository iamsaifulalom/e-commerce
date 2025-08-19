import { Link } from "react-router-dom"

export default function UserTableRow({ user }) {
    return (
        <tr className="border border-gray-300">
            <td className="border pl-2 border-gray-300">
                {user?.role}
            </td>
            <td className="border text-center border-gray-300">
                {user?.phoneNumber}
            </td>
            <td className="border cursor-pointer text-blue-500 text-center border-gray-300">
                <Link
                    className="active:underline underline-offset-2 hover:underline"
                    to={`/create-user?id=${user?._id}`}>
                    Update
                </Link>

            </td>
        </tr>
    );
}