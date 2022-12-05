"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// variables 
const PORT = process.env.PORT || 3001;
// servidor
const app = (0, express_1.default)();
// midelware
app.use(express_1.default.json());
// seguridad
app.use((0, cors_1.default)());
// rutas
app.get("/", (req, res) => {
    console.log("inicio");
    res.send("welcome");
});
// iniciar el servidor
app.listen(PORT, () => {
    console.log("servidor montado");
});
