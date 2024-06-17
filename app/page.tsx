"use client"
import React, { useState } from 'react'
import { NavBarButtons } from '@/components/nav-bar-buttons'
import { useUser } from "@auth0/nextjs-auth0/client";
import { Button, Input } from '@nextui-org/react';
import { sha256 } from 'js-sha256';
import axios from 'axios';

export default function Page() {
  const { user } = useUser();

  const [correo, setCorreo] = useState("");
  const [carnet, setCarnet] = useState("");

  function handleCorreo(e: React.ChangeEvent<HTMLInputElement>): void {
    const value = e.target.value;
    setCorreo(value);
  }

  function handleCarnet(e: React.ChangeEvent<HTMLInputElement>): void {
    const value = e.target.value;
    setCarnet(value);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()

    console.log(correo , sha256(carnet))

    //console.log(nombreD, apellidoD, razon, fechaD)

    /*
    try {
      const res = await axios.post("/api/cliente/", {
        correo: correo,
        carnet: sha256(carnet)

      })

      if (res && res.data) {
        window.location.href = '/Material/Mostrar';
      }
    } catch (error) {

    }*/

  }

  return (
    <>
      <NavBarButtons />
      <h1>{user?.name} {user?.email}</h1>

    </>
  );
}
