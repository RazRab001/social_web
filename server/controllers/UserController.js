// Import required modules and models
const { User, Chat, ChatUser } = require('../models/models');
const bcrypt = require('bcrypt');

class UserController {
    async registration(req, res) {
        const { name, surname, email, birth_date, password } = req.body;

        try {
            // Check if the user already exists
            const find_user = await User.findOne({ where: { email } });
            if (find_user) {
                return res.status(401).json({ message: "User already exists" });
            }

            // Hash the password before storing it
            const hashPassword = await bcrypt.hash(password, 10);

            // Create a new user
            const user = await User.create({
                name,
                surname,
                email,
                birth_date,
                password: hashPassword,
            });

            res.status(201).json(user);
        } catch (error) {
            console.error("Error during registration:", error);
            res.status(500).json({ message: "Registration failed" });
        }
    }

    async login(req, res) {
        // Implement user login logic here
    }

    async change(req, res) {
        // Implement user profile update logic here
    }

    async getAll(req, res) {
        // Implement fetching all users logic here
    }

    async getOne(req, res) {
        // Implement fetching one user's details logic here
    }
}

module.exports = new UserController();
