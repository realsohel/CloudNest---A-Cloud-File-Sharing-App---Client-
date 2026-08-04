import { Outlet } from "react-router-dom";
import { Show, RedirectToSignIn } from "@clerk/react";

const ProtectedLayout = () => {
    return (
        <>
        <Show when="signed-in">
            <Outlet />
        </Show>

        <Show when="signed-out">
            <RedirectToSignIn />
        </Show>
        </>
    );
};

export default ProtectedLayout;