import React, { useState } from "react";
import { Container, Form } from "./styles";

import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";

import { ButtonText } from "../../components/ButtonText";
import { Textarea } from "../../components/Textarea";
import { NoteItem } from "../../components/NoteItem";
import { Section } from "../../components/Section";
import { Button } from "../../components/Button";
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';


export function New() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [links, setLinks] = useState<string[]>([]);
    const [newLink, setNewLink] = useState("");

    const [tags, setTags] = useState<string[]>([]);
    const [newTag, setNewTag] = useState("");

    const navigate = useNavigate();

    function handleAddLink() {
        if (newLink !== "") {
            setLinks(prevState => [...prevState, newLink]);
            setNewLink("");
        } else {
            alert("Preencha o campo para poder adicionar um link")
        }

    }

    function handleRemoveLink(deleted) {
        setLinks(prevState => prevState.filter(link => link !== deleted));
    }

    function handleAddTag() {
        if (newTag !== "") {
            setTags(prevState => [...prevState, newTag]);
            setNewTag("");
        } else {
            alert("Preencha o campo para poder adicionar uma Tag")
        }
    }

    function handleRemoveTag(deleted) {
        setTags(prevState => prevState.filter(tag => tag !== deleted))
    }

    async function handleNewNote() {
        if (!title) {
            return alert("Digite o título da nota")
        }
        if (links.length == 0) {
            return alert("Deve ser adicionado no minímo um link")
        }
        if (tags.length == 0) {
            return alert("Deve ser adicionado no minímo uma tag")
        }


        if (newLink) {
            return alert("Existem links preenchidos que não foram adicionados, clique em adicionar ou deixe o campo vazio.")
        }
        if (newTag) {
            return alert("Existem tags preenchidas que não foram adicionadas, clique em adicionar ou deixe o campo vazio.")
        }

        await api.post("/notes", {
            title,
            description,
            tags,
            links
        });

        alert("Nota criada com sucesso!");
        navigate(-1);
    }

    function handleBack() {
        navigate(-1);
      }

    return (
        <Container>
            <Header />

            <main>
                <Form>
                    <header>
                        <h1>Criar nota</h1>
                        <ButtonText title="voltar" onClick={handleBack}/>
                    </header>

                    <Input
                        placeholder="Título"
                        onChange={e => setTitle(e.target.value)}
                    />

                    <Textarea
                        placeholder="Observações"
                        onChange={e => setDescription(e.target.value)}
                    />
                    <Section title="Links úteis">
                        {
                            links.map((link, index) => (
                                <NoteItem
                                    key={String(index)}
                                    value={link}
                                    onClick={() => handleRemoveLink(link)} />
                            ))
                        }
                        <NoteItem
                            isNew
                            placeholder="Novo link"
                            value={newLink}
                            onChange={e => setNewLink(e.target.value)}
                            onClick={handleAddLink} />
                    </Section>

                    <Section title="Marcadores">
                        <div className="tags">
                            {
                                tags.map((tag, index) => (
                                    <NoteItem
                                        key={String(index)}
                                        value={tag}
                                        onClick={() => handleRemoveTag(tag)} />
                                ))
                            }
                            <NoteItem
                                isNew
                                placeholder="Nova tag"
                                value={newTag}
                                onChange={e => setNewTag(e.target.value)}
                                onClick={handleAddTag}
                            />
                        </div>
                    </Section>

                    <Button
                        title="Salvar"
                        onClick={handleNewNote}
                    />
                </Form>
            </main>


        </Container >
    )
}