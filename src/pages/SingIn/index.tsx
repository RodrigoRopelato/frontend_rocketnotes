import React,{useState} from "react";
import { FiLock, FiMail } from "react-icons/fi";
import { Link } from "react-router-dom";

import { useAuth } from "../../hooks/auth"; 

import { Container, Form, Backgroud } from "./styles";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

export function SingIn(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {singIn} = useAuth();

    function handleSingIn(){
        singIn({email,password});
    }
    

    return(
        <Container>
            <Form>  
                <h1>Rocket Notes</h1>
                <p>Aplicação para salvar e gerenciar seus links íteis.</p>

                <h2>Faça seu login</h2>

                <Input
                    placeholder="Email"
                    type="text"
                    icon={FiMail}
                    onChange= {e=> setEmail(e.target.value)}
                    />
                <Input
                    placeholder="Senha"
                    type="password"
                    icon={FiLock}
                    onChange= {e=> setPassword(e.target.value)}
                />

                <Button title="Entrar" onClick={handleSingIn}/>

                <Link to="/register">Criar conta</Link>

            </Form>

            <Backgroud/>
        </Container>
    )
}