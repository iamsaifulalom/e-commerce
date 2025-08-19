import DynamicSettingsItems from "../compnents/clientCompnents/morePage/DynamicSettingsItems";
import StaticSettingsItems from "../compnents/clientCompnents/morePage/StaticSettingsItems";
import { Outlet } from "react-router-dom";
import { useUserInfo } from "../hooks/useUser";


export default function MorePage() {
    useUserInfo()
    
    return (
        <div className="p-4">
            <h1 className="text-xl font-bold">আরো অপশন</h1>
            <div className="flex gap-3">
                <div className="settings-sidebar">
                    <DynamicSettingsItems />
                    <StaticSettingsItems />
                </div>
                {/* ============= large screed ========== layout */}
                <div className="hidden md:block md:flex-1">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
