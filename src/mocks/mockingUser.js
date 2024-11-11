import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

const generateUsers = (count = 50) => {
    const users = [];
    for (let i = 0; i < count; i++) {
        const passwordHash = bcrypt.hashSync('coder123', 10);
        users.push({
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            age: faker.number.int({ min: 1, max: 80 }),
            password: passwordHash,
            role: Math.random() > 0.5 ? 'admin' : 'user', 
            pets: []
        });
    }
    return users;
};

export default generateUsers;
