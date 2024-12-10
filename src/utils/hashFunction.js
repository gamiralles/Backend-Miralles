import bcryptjs from "bcryptjs";

const SALT_ROUND = 10;

export async function hashCreated(password) {
    const hashPassword = await bcryptjs.hash(
        password,
        bcryptjs.genSaltSync(SALT_ROUND)
    );
    return hashPassword;
}

export async function comparePassword(password, hash) {
    const isPasswordValid = await bcryptjs.compare(password, hash);
    return isPasswordValid;
}