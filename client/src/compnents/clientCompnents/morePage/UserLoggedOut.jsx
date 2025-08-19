import { LiaSignInAltSolid } from "react-icons/lia";
import SettingsOption from "../../globalComponents/SettingsOption";

export default function UserLoggedOut() {
    return (
        <div>
            <SettingsOption
                Icon={<LiaSignInAltSolid />}
                text="সাইন ইন"
                path="/sign-in"
            />
        </div>
    )
}
