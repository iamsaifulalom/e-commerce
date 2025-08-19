import UserLoggedIn from "./UserLoggedIn";
import UserLoggedOut from "./UserLoggedOut";

export default function DynamicSettingsItems() {
    const user = localStorage.getItem("authToken")

    return (
        <div className="w-full mt-6">
            {user ? <UserLoggedIn /> : <UserLoggedOut />}
        </div>
    )
}
