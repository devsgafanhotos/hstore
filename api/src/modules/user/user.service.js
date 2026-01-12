import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import env from "../../config/env.js";
import { getModels } from "../../config/postgresqlClient.js";
const { tokens: token_model, usuarios: user_model } = getModels();
const isProd = env.node_env === "dev";

export const cookieOptions = {
    httpOnly: !isProd ? false : true,
    sameSite: !isProd ? "none" : "lax",
    secure: !isProd,
    maxAge: env.cookie_expiration,
};

class classUserServices {
    async cadastrar(usuario) {
        const responseEmail = await this.verifyUserEmail(usuario.email);

        if (responseEmail.success) {
            return {
                success: false,
                status: 409,
                message: "Email indisponível!",
            };
        }

        const responseTelefone = await this.verifyUserTelefone(
            usuario.telefone
        );

        if (responseTelefone.success) {
            return {
                success: false,
                status: 409,
                message: "Telefone indisponível!",
            };
        }

        const senhaHash = await this.createHash(usuario.telefone);

        const usuario_criado = await user_model.create({
            nome: usuario.nome,
            telefone: usuario.telefone,
            email: usuario.email,
            tipo: usuario.role,
            senha: senhaHash,
        });

        return {
            success: true,
            message: "Usuário cadastrado com sucesso!",
            data: {
                id: usuario_criado.id_usuario,
                nome: usuario_criado.nome,
                telefone: usuario_criado.telefone,
                email: usuario_criado.email,
                role: usuario_criado.role,
            },
        };
    }

    async login(credencials, res) {
        const responseTelefone = await this.verifyUserTelefone(
            credencials?.telefone
        );

        if (!responseTelefone.success) {
            return {
                success: false,
                status: 404,
                message: "Telefone inexistente!",
            };
        }

        const responseSenha = await this.verifyHash(
            responseTelefone.data.senha,
            credencials.senha
        );

        if (!responseSenha) {
            return {
                success: false,
                status: 404,
                message: "Senha incorreta!",
            };
        }

        const payload = {
            id: responseTelefone.data.id_usuario,
            email: responseTelefone.data.email,
            nome: responseTelefone.data.nome,
            telefone: responseTelefone.data.telefone,
            role: responseTelefone.data.tipo,
            dataCadastro: responseTelefone.data.data_criacao,
        };

        const ACCESS_TOKEN = await this.createToken(
            payload,
            env.access_token_secret,
            env.access_token_expiration
        );

        const REFRESH_TOKEN = await this.createToken(
            payload,
            env.refresh_token_secret,
            env.refresh_token_expiration
        );

        token_model.create({
            usuario_id: responseTelefone.data.id_usuario,
            refresh_token: REFRESH_TOKEN,
        });
        console.log(cookieOptions);

        res.cookie("refreshToken", REFRESH_TOKEN, cookieOptions);

        return {
            success: true,
            message: "Seja bem-vindo!",
            user: payload,
            access_token: ACCESS_TOKEN,
        };
    }

    async logout(req, res) {
        try {
            const { user } = req.user;
            const refresh_token = req.cookies.refresh_token;

            token_model.destroy({
                where: { refresh_token: refresh_token },
            });

            res.clearCookie("refreshToken", cookieOptions);

            return {
                success: true,
                user: user,
                message: "Volte sempre...",
            };
        } catch (error) {
            return {
                success: false,
                message: "Erro ao fazer logout",
                errors: `${error}`,
            };
        }
    }

    async getUsuarios(id_usuario) {
        const idCondition = id_usuario && { id_usuario: id_usuario };

        let usuarios_encontrados = await user_model.findAll({
            attributes: [
                ["id_usuario", "id"],
                "nome",
                "telefone",
                "email",
                ["tipo", "role"],
                ["data_criacao", "dataCadastro"],
            ],
            where: idCondition,
            order: ["nome"],
        });

        if (!usuarios_encontrados) {
            return {
                success: false,
                data: [],
            };
        }

        return {
            success: true,
            data: usuarios_encontrados,
        };
    }

    async verifyUserEmail(email = "") {
        let usuario_encontrado = await user_model.findOne({
            where: {
                email: email,
            },
            raw: true,
        });

        if (!usuario_encontrado) {
            return {
                success: false,
            };
        }

        return {
            success: true,
            data: usuario_encontrado,
        };
    }

    async verifyUserTelefone(telefone) {
        let usuario_encontrado = await user_model.findOne({
            where: {
                telefone: telefone,
            },
            raw: true,
        });

        if (!usuario_encontrado) {
            return {
                success: false,
            };
        }

        return {
            success: true,
            data: usuario_encontrado,
        };
    }

    async createHash(string) {
        return await bcrypt.hashSync(string, 10);
    }

    async verifyHash(hash, string) {
        const valid = await bcrypt.compare(string, hash);
        return valid;
    }

    async createToken(payload, TOKEN_SECRET, TOKEN_EXPIRATION) {
        const token = jwt.sign({ payload }, TOKEN_SECRET, {
            expiresIn: TOKEN_EXPIRATION,
        });
        return token;
    }
}

const UserServices = new classUserServices();
export default UserServices;
