import React, { useState } from "react";
import Whave from "../assets/olas-del-mar.png";
import WhaveIcon from "../assets/wave-icon.png";
import Clock from "../assets/clock.png";

function MareaCalculator() {
  const [horaPleamar, setHoraPleamar] = useState("");
  const [alturaPleamar, setAlturaPleamar] = useState("");
  const [horaBajamar, setHoraBajamar] = useState("");
  const [alturaBajamar, setAlturaBajamar] = useState("");
  const [alturaDeseada, setAlturaDeseada] = useState("");
  const [horaResultado, setHoraResultado] = useState(null);

  const calcularHoraMarea = () => {
    // Convertir alturas a números
    const alturaPleamarNum = parseFloat(alturaPleamar);
    const alturaBajamarNum = parseFloat(alturaBajamar);
    const alturaDeseadaNum = parseFloat(alturaDeseada);

    // Validar que la altura deseada esté entre la altura de bajamar y pleamar
    if (
      alturaDeseadaNum < alturaBajamarNum ||
      alturaDeseadaNum > alturaPleamarNum
    ) {
      alert(
        "La altura deseada debe estar entre la altura de pleamar y la bajamar."
      );
      return;
    }

    const msPleamar = new Date(`1970-01-01T${horaPleamar}:00Z`).getTime();
    const msBajamar = new Date(`1970-01-01T${horaBajamar}:00Z`).getTime();

    const alturaTotal = alturaPleamarNum - alturaBajamarNum;
    const duracionTotal = msBajamar - msPleamar;

    const alturaRelativa = alturaPleamarNum - alturaDeseadaNum;

    const fracciones = [1 / 12, 2 / 12, 3 / 12, 3 / 12, 2 / 12, 1 / 12];
    let alturaAcumulada = 0;
    let horasTranscurridas = 0;

    for (let i = 0; i < fracciones.length; i++) {
      alturaAcumulada += alturaTotal * fracciones[i];
      horasTranscurridas += duracionTotal / (6 * 60 * 60 * 1000);

      if (alturaRelativa <= alturaAcumulada) {
        break;
      }
    }

    const msResultado = msPleamar + horasTranscurridas * 60 * 60 * 1000;
    const hora = new Date(msResultado).toISOString().substring(11, 16);

    setHoraResultado(hora);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 p-4">
      <h2 className="text-xl font-bold mb-4 text-blue-700 flex align-middle gap-4">
        Calculador de Mareas{" "}
        <img src={Whave} alt="Olas del mar" style={{ width: "40px" }} />
      </h2>
      <div className="w-full max-w-md bg-white p-4 rounded-xl shadow-lg">
        <div className="mb-2">
          <label className="block text-gray-700 mb-1 text-sm">
            Hora de Pleamar:
          </label>
          <input
            type="time"
            value={horaPleamar}
            onChange={(e) => setHoraPleamar(e.target.value)}
            placeholder="12:00"
            className="w-full p-1 border border-gray-300 rounded-xl focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <div className="mb-3">
          <label className="block text-gray-700 mb-1 text-sm">
            Altura de Pleamar (m):
          </label>
          <div className="flex items-center border border-gray-300 rounded-xl focus-within:ring focus-within:ring-blue-300 p-1">
            <input
              type="number"
              value={alturaPleamar}
              onChange={(e) => setAlturaPleamar(e.target.value)}
              placeholder="1.00"
              className="w-full p-1 outline-none"
            />
            <img src={WhaveIcon} alt="Icono de Ola" className="w-6 h-6 ml-2" />
          </div>
        </div>
        <div className="mb-3">
          <label className="block text-gray-700 mb-1 text-sm">
            Hora de Bajamar:
          </label>
          <input
            type="time"
            value={horaBajamar}
            onChange={(e) => setHoraBajamar(e.target.value)}
            placeholder="12:00"
            className="w-full p-1 border border-gray-300 rounded-xl focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <div className="mb-3">
          <label className="block text-gray-700 mb-1 text-sm">
            Altura de Bajamar (m):
          </label>
          <div className="flex items-center border border-gray-300 rounded-xl focus-within:ring focus-within:ring-blue-300 p-1">
            <input
              type="number"
              value={alturaBajamar}
              onChange={(e) => setAlturaBajamar(e.target.value)}
              placeholder="1.00"
              className="w-full p-1 outline-none"
            />
            <img src={WhaveIcon} alt="Icono de Ola" className="w-6 h-6 ml-2" />
          </div>
        </div>
        <div className="mb-3">
          <label className="block text-gray-700 mb-1 text-sm">
            Altura Deseada (m):
          </label>
          <input
            type="number"
            value={alturaDeseada}
            onChange={(e) => setAlturaDeseada(e.target.value)}
            placeholder="1.00"
            className="w-full p-1 border border-gray-300 rounded-xl focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <button
          onClick={calcularHoraMarea}
          className="w-full py-2 px-2 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 text-base"
        >
          Calcular Hora de la Marea
        </button>
        {horaResultado && (
          <div className="mt-4">
            <h3 className="text-xl font-semibold text-blue-600">
              Hora aproximada para alcanzar la altura deseada: {horaResultado}
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default MareaCalculator;
