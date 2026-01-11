import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { api } from "../api/axios";
import MyList from "../components/List/MyList";
let peopleBase = [];
const max_people = 50;
export default function PeopleList({ type = "Usuarios" }) {
    const [people, setPeople] = useState([]);
    const [filterValue, setFilterValue] = useState("");
    const [pageState, setPageState] = useState("loading");
    const navigate = useNavigate();

    async function getPeople() {
        try {
            const url =
                type === "Usuarios" ? "/user/usuarios" : "/agent/agentes";
            const { data } = await api.get(url);
            peopleBase.push(...data.data);
            return setPeople(data.data.slice(-max_people));
        } catch (error) {
            setPeople([]);
        } finally {
            setPageState("done");
        }
    }

    useEffect(() => {
        setPageState("loading");
        setPeople(() => {
            const newPeople = peopleBase.filter((value) => {
                const nome = value?.nome.toLocaleLowerCase();
                const telefone = value?.telefone;
                const id = value?.id;

                if (
                    String(nome).includes(filterValue?.toLocaleLowerCase()) ||
                    String(telefone).includes(
                        filterValue?.toLocaleLowerCase()
                    ) ||
                    String(id).includes(filterValue?.toLocaleLowerCase())
                )
                    return value;
            });
            return newPeople.slice(-max_people);
        });
        const timeOut = setTimeout(() => {
            setPageState("done");
        }, 1000);

        return () => clearTimeout(timeOut);
    }, [filterValue]);

    useEffect(() => {
        peopleBase = [];
        setFilterValue("");
        setPageState("loading");
        getPeople();
    }, [type]);

    return (
        <div className="flex-1 md:p-2" key={type}>
            <Box paddingBottom={1.5}>
                <div className="flex items-center justify-end">
                    <span
                        style={{
                            padding: 8,
                            borderRight: ".1px solid var(--color-gray-light)",
                        }}
                        className="rounded-tl-full rounded-bl-full bg-(--color-bg)"
                    >
                        <FaSearch size={15} color="var(--color-primary)" />
                    </span>
                    <input
                        style={{
                            padding: 6,
                            fontSize: ".8rem",
                        }}
                        className="outline-0 rounded-tr-full rounded-br-full bg-(--color-bg) min-w-60"
                        placeholder="Filtrar Por Nome"
                        value={filterValue}
                        onChange={(e) => {
                            setFilterValue(e.target.value);
                        }}
                    />
                </div>
            </Box>
            <MyList
                ListItems={people}
                title={type}
                pageState={pageState}
                buttonPluss={{ to: `/${type}/cadastrar` }}
                handleItemClick={(id) => {
                    const to =
                        type === "Usuarios"
                            ? `/perfil/${id}`
                            : `/subagente/${id}`;
                    navigate(to);
                }}
            />
        </div>
    );
}
