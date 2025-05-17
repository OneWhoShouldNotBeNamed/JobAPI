"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const JWT_SECRET = process.env.JWT_SECRET || "secret";
const generateToken = (id, role) => {
    return jsonwebtoken_1.default.sign({ id, role }, JWT_SECRET, { expiresIn: "1d" });
};
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Check if user already exists manually (optional)
        const userExists = await User_1.default.findOne({ email });
        if (userExists) {
            return res
                .status(400)
                .json({ message: "Email already present in the system" });
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const user = await User_1.default.create({ name, email, password: hashedPassword });
        const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        res.status(201).json({ token });
    }
    catch (err) {
        if (err.code === 11000 && err.keyValue.email) {
            return res
                .status(400)
                .json({ message: "Email already present in the system" });
        }
        res.status(500).json({ message: "Something went wrong" });
    }
};
exports.register = register;
const login = async (req, res) => {
    const { email, password } = req.body;
    const user = (await User_1.default.findOne({ email }));
    if (!user || !(await user.comparePassword(password))) {
        res.status(401).json({ message: "Invalid credentials" });
    }
    const token = generateToken(user._id.toString(), user.role);
    res.json({ token });
};
exports.login = login;
