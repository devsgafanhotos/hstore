const base = `${new Date().getFullYear()}-${new Date().getMonth() + 1}`;
const day = Number(new Date().toString().slice(8, 10));

export const ontem = `${base}-${day - 1}`;
export const hoje = `${base}-${day}`;
export const amanha = `${base}-${day + 1}`;