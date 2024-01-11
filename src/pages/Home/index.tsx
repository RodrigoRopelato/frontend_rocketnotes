import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';

import { api } from '../../services/api';

import { Container, Brand, Menu, Search, Content, NewNote } from './styles';

import { Input } from '../../components/Input';
import { Header } from '../../components/Header';
import { Section } from '../../components/Section';
import { ButtonText } from './../../components/ButtonText/index';
import { Note } from '../../components/Note';

interface Tag {
    id: number;
    name: string;
}

interface Note {
    id: string;
    title: string;
    description: string;
    tags: Tag[];
}

export function Home() {
    const [search, setSearch] = useState<string>("");
    const [tags, setTags] = useState<Tag[]>([]);
    const [tagsSelected, setTagsSelected] = useState<string[]>([]);
    const [notes, setNotes] = useState<Note[]>([]);

    const navigate = useNavigate();

    function handleTagSelected(tagName: string) {
        if (tagName === "all") {
            return setTagsSelected([]);
        }

        const alreadySelected = tagsSelected.includes(tagName);

        if (alreadySelected) {
            const filteredTags = tagsSelected.filter(tag => tag !== tagName);
            setTagsSelected(filteredTags);
        } else {
            setTagsSelected(prevState => [...prevState, tagName])
        }

    }

    function handleDetails(id: string) {
        navigate(`/details/${id}`)
    }

    useEffect(() => {
        async function fechTags() {
            const response = await api.get<Tag[]>("/tags");
            setTags(response.data);
        }

        fechTags();
    }, [])

    useEffect(() => {
        async function fetchNotes() {
            // const response = await api.get<Note[]>(`/notes?title=${search}&tags=${tagsSelected}`)
            const response = await api.get<Note[]>(
                `/notes?title=${search}&tags=${tagsSelected.join(",")}`
              );
            setNotes(response.data)
        }

        fetchNotes();
    }, [tagsSelected, search])

    return (
        <Container>
            <Brand>
                <h1>Rocketnotes</h1>
            </Brand>

            <Header />

            <Menu>
                <li>
                    <ButtonText
                        title='Todos'
                        onClick={() => handleTagSelected("all")}
                        isActive={tagsSelected.length === 0}
                    />
                </li>
                {
                    tags && tags.map(tag => (
                        <li key={String(tag.id)}>
                            <ButtonText
                                title={tag.name}
                                onClick={() => handleTagSelected(tag.name)}
                                isActive={tagsSelected.includes(tag.name)}
                            />
                        </li>
                    ))
                }
            </Menu>

            <Search>
                <Input
                    placeholder="Pesquisar pelo título"
                    onChange={(e) => setSearch(e.target.value)}
                />
            </Search>

            <Content>
                <Section title="Minhas notas">
                    {
                        notes.map(note => (
                            <Note
                                key={String(note.id)}
                                data={note}
                                onClick={() => handleDetails(note.id)}
                            />
                        ))
                    }
                </Section>
            </Content>

            <NewNote to="/new">
                <FiPlus />
                Criar Nota
            </NewNote>
        </Container>
    )
}