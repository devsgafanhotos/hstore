import { DataTypes } from "sequelize";
import _agentes from "./agentes.js";
import _faturacoes from "./faturacoes.js";
import _pagamentos from "./pagamentos.js";
import _usuarios from "./usuarios.js";
import _tokens from "./tokens.js";

export default function initModels(sequelize) {
    var agentes = _agentes(sequelize, DataTypes);
    var faturacoes = _faturacoes(sequelize, DataTypes);
    var pagamentos = _pagamentos(sequelize, DataTypes);
    var tokens = _tokens(sequelize, DataTypes);
    var usuarios = _usuarios(sequelize, DataTypes);

    faturacoes.belongsTo(agentes, { as: "agente", foreignKey: "agente_id" });
    agentes.hasMany(faturacoes, { as: "faturacos", foreignKey: "agente_id" });
    pagamentos.belongsTo(agentes, { as: "agente", foreignKey: "agente_id" });
    agentes.hasMany(pagamentos, { as: "pagamentos", foreignKey: "agente_id" });
    agentes.belongsTo(usuarios, { as: "usuario", foreignKey: "usuario_id" });
    usuarios.hasMany(agentes, { as: "agentes", foreignKey: "usuario_id" });
    faturacoes.belongsTo(usuarios, { as: "usuario", foreignKey: "usuario_id" });
    usuarios.hasMany(faturacoes, { as: "faturacos", foreignKey: "usuario_id" });
    pagamentos.belongsTo(usuarios, { as: "usuario", foreignKey: "usuario_id" });
    usuarios.hasMany(pagamentos, {
        as: "pagamentos",
        foreignKey: "usuario_id",
    });
    tokens.belongsTo(usuarios, {
        as: "id_usuario_usuario",
        foreignKey: "id_usuario",
    });
    usuarios.hasMany(tokens, { as: "tokens", foreignKey: "id_usuario" });

    return {
        agentes,
        faturacoes,
        pagamentos,
        tokens,
        usuarios,
    };
}
