import { Token } from "../services/TokenService";

export const authorizeProtection = () => Token.get() === null