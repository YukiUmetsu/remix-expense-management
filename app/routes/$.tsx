import { redirect } from "remix"

export const loader = ({params}) => {
    if (params['*'] === 'exp') {
        return redirect('/expenses')
    }
    throw new Response('not found', {status: 404})
}