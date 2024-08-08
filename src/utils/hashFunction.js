import bcrypt from "bcrypt";

const SALT_ROUND = 10;

export async function hashCreated(password) {
    const hashPassword = await bcrypt.hash(
        password,
        bcrypt.genSaltSync(SALT_ROUND)
    );
    return hashPassword;
}

export async function comparePassword(password, hash) {
    const isPasswordValid = await bcrypt.compare(password, hash);
    return isPasswordValid;
}