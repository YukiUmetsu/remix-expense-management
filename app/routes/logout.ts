import { json } from "remix"
import { destroyUserSession } from "~/data/auth.server"

export const action = ({request}) => {
    if (request.method !== 'POST') {
        throw json({ message: 'Method not allowed' }, { status: 400 })
    }

    return destroyUserSession(request);
}