import { FaRegAddressCard } from "react-icons/fa";
import SettingsOption from "../../globalComponents/SettingsOption";

export default function StaticSettingsItems() {

    return (
        <div className="w-full">
            <SettingsOption
                Icon={<FaRegAddressCard />}
                text="আমাদের সম্পর্কে"
                path="/about-us"
            />
        </div>
    )
}
