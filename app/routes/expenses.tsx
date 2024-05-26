import { Outlet } from "@remix-run/react";

const ExpensesLayout = () => {
    return (
        <main>
            <Outlet />
        </main>
    );
}

export default ExpensesLayout;