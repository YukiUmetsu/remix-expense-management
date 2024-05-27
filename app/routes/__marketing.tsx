import { Outlet } from "@remix-run/react";
import MainHeader from "~/components/navigation/MainHeader";
import { getUserFromSession } from "~/data/auth.server";
import marketingStyles from "~/styles/marketing.css";

// this file is to only apply styles without extra routing to files under __marketing folder
const MarketingLayout = () => {
    return (
        <>
            <MainHeader/>
            <Outlet />
        </>
    );
}
export default MarketingLayout;

export const links = () => {
    return [{ rel: "stylesheet", href: marketingStyles}]
}

export const loader = ({request}) => {
    return getUserFromSession(request);
}