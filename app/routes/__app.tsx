import { Outlet } from "@remix-run/react";
import ExpensesHeader from "~/components/navigation/ExpensesHeader";
import expensesStyles from "~/styles/expenses.css";

// this file is to only apply styles without extra routing to files under __app folder
const ExpensesAppLayout = () => {
    return (
        <>
            <ExpensesHeader/>
            <Outlet />
        </>
    );
}
export default ExpensesAppLayout;

export const links = () => {
    return [{ rel: "stylesheet", href: expensesStyles}]
}