import { AuthInterface } from "../types"

export const getUserName = (t: AuthInterface) : string => {
    if(t.firstname === undefined && t.midname === undefined && t.lastname === undefined) {
        return t.email!
    } else if(t.midname === undefined) {
        return `${t.firstname} ${t.lastname}`
    } else {
        return `${t.firstname} ${t.midname} ${t.lastname}`
    }
}