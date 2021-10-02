import Jwt, { JwtPayload } from "jsonwebtoken";

export interface Role{
    Jwt:string|JwtPayload,
    role:string[]
}