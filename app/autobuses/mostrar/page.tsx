'use client'
import { NavBarButtons } from '@/components/nav-bar-buttons';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, user } from '@nextui-org/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

import { useUser } from "@auth0/nextjs-auth0/client";


export default function page() {
  const { user } = useUser();
  const [buses, setBuses] = useState([]);
  const [asientos, setAsientos] = useState([]);
  const [selectBuses, setSelectBuses] = useState("");
  const [idAsiento, setidAsiento] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [asientoEstado, setAsientoEstado] = useState<number | null>(null);





  useEffect(() => {
    axios.get("/api/buses").then((res) => {
      if (res.data && res.data.bus) {
        console.log(res.data.bus)
        setBuses(res.data.bus)
      }
    })
  }, [])

  function changeAvion(event: React.ChangeEvent<HTMLSelectElement>): void {
    const selectedBus = event.target.value;
    setSelectBuses(selectedBus);

    axios.get(`/api/asientos/${selectedBus}`).then((res) => {
      if (res.data && res.data.asientos) {
        console.log(res.data.asientos);
        setAsientos(res.data.asientos);

      }
    });
  }

  const ClickModal = (asientoId: any, asientoNombre: string) => {
    if (!selectBuses) {
      //setContinentCode(null); // Si no se ha ingresado ningún país, se establece el código de continente como nulo
      return;
    }

    const estado = asientos.find(asiento => asiento['id'] === Number(asientoId))?.['estado']
    console.log(estado)
    setAsientoEstado(Number(estado));




    setModalTitle(`Asiento "${asientoNombre}"`);
    setidAsiento(asientoId)
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const Reservar = async (asientoId: any) => {
    //console.log(selectAvion, selectedCity + selectedCountry, selectedDestCity + selectedDestCountry, asientoId)

    const res = await axios.post("/api/send/", {
      email: user?.email

    })

    if (res.data && res.data.data) {
      console.log("Gmail enviado" + res.data);
    }
    /*await axios.put(`/api/asientoEstado/${asientoId}`, {
      estado: 2

    });*/

    /*await axios.get(`/api/asiento/${selectBuses}`).then((res) => {
      if (res.data && res.data.asientos) {
        setAsientos(res.data.asientos);
        //setMostrarCuadrados(true);
      }
    });*/





    closeModal();

  }

  return (
    <>
      <NavBarButtons />
      <h1> {user?.email} </h1>
      <div className="flex flex-col items-center justify-center min-h-screen">

        <div className="w-64 mb-8 text-black">
          <Select
            aria-label="Selecciona un empleado"
            placeholder="Seleccione un Bus"
            value={selectBuses}
            onChange={changeAvion}
          //fullWidth={false}

          >
            {buses.map((bus) => (
              <SelectItem key={bus['id']} textValue={bus['modelo']}>
                {bus['modelo']}
              </SelectItem>
            ))}
          </Select>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {asientos.map((asiento) => (
            <Button
              key={asiento['id']}
              className={`p-4 rounded-md shadow-md ${asiento['estado'] === 0
                ? 'bg-blue-500 hover:bg-blue-600'
                : asiento['estado'] === 1
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-yellow-500 hover:bg-yellow-600'
                } text-white font-bold`}
              onClick={() => ClickModal(asiento['id'], asiento['numero'])}
              disabled={asiento['estado'] === 1}
            >
              <img
                src="https://www.logocrea.com/wp-content/uploads/2016/07/silla-oficina1.png"
                alt={`Seat ${asiento['numero']}`}
                className="w-full h-full object-cover"
              />
            </Button>
          ))}

          <Modal isOpen={isOpen} onClose={closeModal}>
            <ModalContent>
              <ModalHeader>{modalTitle}</ModalHeader>
              <ModalBody>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit dolor adipisicing. Mollit dolor
                  eiusmod sunt ex incididunt cillum quis. Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod.
                  Et mollit incididunt nisi consectetur esse laborum eiusmod pariatur proident Lorem eiusmod et. Culpa deserunt nostrud
                  ad veniam.
                </p>
              </ModalBody>
              <ModalFooter>
                {asientoEstado === 0 && ( // Mostrar botón de Reservar si el estado del asiento es 0
                  <Button color="primary" onClick={() => Reservar(idAsiento)}>
                    Reservar
                  </Button>
                )}
                {/* {(asientoEstado === 0 || asientoEstado === 2) && ( // Mostrar botón de Pagar si el estado del asiento es 0 o 2
                <Button color="primary" onClick={() => Comprar(idAsiento)}>
                  Pagar
                </Button>
              )} */}
                <Button color="danger" variant="light" onClick={closeModal}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      </div>


    </>
  )
}
