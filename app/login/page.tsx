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



  function handleCarnet(e: React.ChangeEvent<HTMLInputElement>): void {
    const value = e.target.value;
    setCarnet(value);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()

    console.log(correo , sha256(carnet))

    //console.log(nombreD, apellidoD, razon, fechaD)

    
    try {
      const res = await axios.post("/api/cliente/", {
        correo: user?.email,
        carnet: sha256(carnet).toString(),
        estado: 1,
        fechaRegistro: new Date().toISOString()

      })

      if (res && res.data) {
        window.location.href = '/autobuses/mostrar';
      }
    } catch (error) {

    }

  }

  return (
    <>
      <NavBarButtons />


      {user && (
        <>
          <h1>{user?.name} {user?.email}</h1>
          {user?.picture && <img src={user.picture} alt="foto" />}

          <form onSubmit={handleSubmit}>
            <Input
              type='text'
              label='Correo electronico'
              value={user.email?.toString()}
              isDisabled
            >
            </Input>
            <Input
              type='text'
              label='Carnet'
              value={carnet}
              onChange={handleCarnet}
            >
            </Input>

            <Button type="submit" >
              Registrar
            </Button>
          </form>
        </>
      )}

    </>
  );
}
