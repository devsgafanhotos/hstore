const fs = require('fs');
const path = require('path');

/**
 * Gera um arquivo Python com exemplos práticos dos conceitos fundamentais de
 * Orientação a Objetos (OO): classes, instâncias, atributos, métodos,
 * encapsulamento, propriedades, métodos de classe/estáticos, herança,
 * polimorfismo, overriding, ABCs, mixins, composição, dataclasses,
 * operator overloading e exemplos de uso.
 *
 * Uso:
 *   node teste.js                # gera ./oopython_examples.py
 *   node teste.js ./out.py       # gera no caminho fornecido
 */
function generatePythonOOPExamples(outputPath = './oopython_examples.py') {
    const content = `#!/usr/bin/env python3
\"\"\"Exemplos didáticos de conceitos fundamentais e práticos de Orientação a Objetos em Python.
Abra e execute para ver os comportamentos.
\"\"\"

from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import List

# 1) Classe simples, atributos de instância e métodos
class Pessoa:
        especie = "Homo sapiens"  # atributo de classe

        def __init__(self, nome: str, idade: int):
                self.nome = nome               # atributo público
                self._idade = idade            # "protegido" por convenção
                self.__cpf = None              # "privado" via name mangling

        def aniversario(self):
                self._idade += 1

        def set_cpf(self, cpf: str):
                self.__cpf = cpf

        def get_cpf(self):
                return self.__cpf

        # 2) propriedade (encapsulamento elegante)
        @property
        def idade(self):
                return self._idade

        @idade.setter
        def idade(self, valor):
                if valor < 0:
                        raise ValueError("Idade não pode ser negativa")
                self._idade = valor

        @classmethod
        def criar_recem_nascido(cls, nome: str):
                return cls(nome, 0)

        @staticmethod
        def saudacao():
                return "Olá!"

# 3) Dataclass (reduz boilerplate para classes de dados)
@dataclass
class Endereco:
        rua: str
        numero: int
        cidade: str

# 4) Composição (Pessoa tem um Endereco)
class Cliente(Pessoa):
        def __init__(self, nome: str, idade: int, endereco: Endereco):
                super().__init__(nome, idade)
                self.endereco = endereco

# 5) Herança, polimorfismo e overriding
class Animal(ABC):
        def __init__(self, nome: str):
                self.nome = nome

        @abstractmethod
        def falar(self) -> str:
                pass

class Cachorro(Animal):
        def falar(self) -> str:
                return "Au!"

class Gato(Animal):
        def falar(self) -> str:
                return "Miau!"

# 6) Mixins (comportamentos reutilizáveis)
class VoarMixin:
        def voar(self):
                return f\"{self.nome} está voando!\"

class Passaro(Animal, VoarMixin):
        def falar(self) -> str:
                return "Piu!"

# 7) Operator overloading
class Vetor2D:
        def __init__(self, x: float, y: float):
                self.x = x
                self.y = y

        def __add__(self, outro):
                return Vetor2D(self.x + outro.x, self.y + outro.y)

        def __repr__(self):
                return f\"Vetor2D({self.x}, {self.y})\"

# 8) Exemplo de uso e demonstração de conceitos
def main():
        print(\"-- Pessoa e propriedades --\")
        p = Pessoa.criar_recem_nascido(\"Ana\")
        print(p.nome, p.idade, Pessoa.saudacao())
        p.idade = 1
        try:
                p.idade = -2
        except ValueError as e:
                print(\"Erro idade:\", e)

        p.set_cpf(\"123.456.789-00\")
        print(\"CPF (via getter):\", p.get_cpf())

        print(\"\\n-- Cliente (composição) --\")
        end = Endereco(\"Rua A\", 10, \"CidadeX\")
        c = Cliente(\"Carlos\", 30, end)
        print(c.nome, c.endereco, c.endereco.cidade)

        print(\"\\n-- Herança e polimorfismo --\")
        animais: List[Animal] = [Cachorro(\"Rex\"), Gato(\"Mimi\"), Passaro(\"Tico\")]
        for a in animais:
                print(a.nome, \"->\", a.falar())
                # se VoarMixin presente, chama voar (polimorfismo por tipo)
                if hasattr(a, 'voar'):
                        print(a.voar())

        print(\"\\n-- Operator overloading --\")
        v1 = Vetor2D(1, 2)
        v2 = Vetor2D(3, 4)
        print(v1, \"+\", v2, \"=\", v1 + v2)

        print(\"\\n-- Encapsulamento (atributo privado) --\")
        try:
                print(p.__cpf)  # gera AttributeError por name mangling
        except Exception as e:
                print(\"Não é possível acessar __cpf diretamente:\", e)

        # acesso via name mangling (não recomendado)
        print(\"Acesso via mangling (não use em produção):\", getattr(p, f\"_Pessoa__cpf\"))

if __name__ == '__main__':
        main()
`;

    const resolved = path.resolve(outputPath);
    fs.writeFileSync(resolved, content, { encoding: 'utf8', mode: 0o755 });
    console.log(`Arquivo gerado em: ${resolved}`);
}

if (require.main === module) {
    const out = process.argv[2] || './oopython_examples.py';
    generatePythonOOPExamples(out);
}

module.exports = { generatePythonOOPExamples };