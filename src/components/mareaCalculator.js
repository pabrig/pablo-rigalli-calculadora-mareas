import React, { useState } from "react";

// Definimos las rutas de las imágenes usando PUBLIC_URL para GitHub Pages
const Whave = `${process.env.PUBLIC_URL}/assets/olas-del-mar.png`;
const WhaveIcon = `${process.env.PUBLIC_URL}/assets/wave-icon.png`;
const Clock = `${process.env.PUBLIC_URL}/assets/clock.png`;

function MareaCalculator() {
  const [horaPleamar, setHoraPleamar] = useState("");
  const [alturaPleamar, setAlturaPleamar] = useState("");
  const [horaBajamar, setHoraBajamar] = useState("");
  const [alturaBajamar, setAlturaBajamar] = useState("");
  const [alturaDeseada, setAlturaDeseada] = useState("");
  const [horaResultado, setHoraResultado] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [modoCalculo, setModoCalculo] = useState("pleamarABajamar");

  const calcularHoraMarea = () => {
    const alturaPleamarNum = parseFloat(alturaPleamar);
    const alturaBajamarNum = parseFloat(alturaBajamar);
    const alturaDeseadaNum = parseFloat(alturaDeseada);

    if (
      modoCalculo === "pleamarABajamar" &&
      (alturaDeseadaNum < alturaBajamarNum ||
        alturaDeseadaNum > alturaPleamarNum)
    ) {
      alert(
        "La altura deseada debe estar entre la altura de pleamar y la bajamar."
      );
      return;
    }
    if (
      modoCalculo === "bajamarAPleamar" &&
      (alturaDeseadaNum < alturaPleamarNum ||
        alturaDeseadaNum > alturaBajamarNum)
    ) {
      alert(
        "La altura deseada debe estar entre la altura de bajamar y la pleamar."
      );
      return;
    }

    const msPleamar = new Date(`1970-01-01T${horaPleamar}:00Z`).getTime();
    const msBajamar = new Date(`1970-01-01T${horaBajamar}:00Z`).getTime();

    const alturaTotal =
      modoCalculo === "pleamarABajamar"
        ? alturaPleamarNum - alturaBajamarNum
        : alturaBajamarNum - alturaPleamarNum;
    const duracionTotal =
      modoCalculo === "pleamarABajamar"
        ? msBajamar - msPleamar
        : msPleamar - msBajamar;

    const alturaRelativa =
      modoCalculo === "pleamarABajamar"
        ? alturaPleamarNum - alturaDeseadaNum
        : alturaDeseadaNum - alturaBajamarNum;

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

    const msResultado =
      (modoCalculo === "pleamarABajamar" ? msPleamar : msBajamar) +
      horasTranscurridas * 60 * 60 * 1000;
    const hora = new Date(msResultado).toISOString().substring(11, 16);

    setHoraResultado(hora);
  };

  const limpiarCampos = () => {
    setHoraPleamar("");
    setAlturaPleamar("");
    setHoraBajamar("");
    setAlturaBajamar("");
    setAlturaDeseada("");
    setHoraResultado(null);
  };

  const isFormValid = () => {
    return (
      horaPleamar &&
      alturaPleamar &&
      horaBajamar &&
      alturaBajamar &&
      alturaDeseada
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 p-4">
      <h2 className="text-xl font-bold mb-4 text-blue-700 flex align-middle gap-4">
        Calculador de Mareas{" "}
        <img src={Whave} alt="Olas del mar" style={{ width: "40px" }} />
      </h2>

      <div className="w-full max-w-md bg-white p-4 rounded-xl shadow-lg">
        <div className="mb-4">
          <label className="block text-gray-700 mb-1 text-sm">
            Modo de Cálculo:
          </label>
          <select
            value={modoCalculo}
            onChange={(e) => setModoCalculo(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring focus:ring-blue-300 text-lg"
          >
            <option value="pleamarABajamar">Pleamar a Bajamar</option>
            <option value="bajamarAPleamar">Bajamar a Pleamar</option>
          </select>
        </div>

        {modoCalculo === "pleamarABajamar" ? (
          <>
            <div className="mb-2">
              <label className="block text-gray-700 mb-1 text-sm">
                Hora de Pleamar:
              </label>
              <input
                type="time"
                value={horaPleamar}
                onChange={(e) => setHoraPleamar(e.target.value)}
                className="w-full p-1 border border-gray-300 rounded-xl text-2xl"
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 mb-1 text-sm">
                Altura de Pleamar (m):
              </label>
              <input
                type="number"
                value={alturaPleamar}
                onChange={(e) => setAlturaPleamar(e.target.value)}
                className="w-full p-1 border border-gray-300 rounded-xl text-2xl"
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 mb-1 text-sm">
                Hora de Bajamar:
              </label>
              <input
                type="time"
                value={horaBajamar}
                onChange={(e) => setHoraBajamar(e.target.value)}
                className="w-full p-1 border border-gray-300 rounded-xl text-2xl"
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 mb-1 text-sm">
                Altura de Bajamar (m):
              </label>
              <input
                type="number"
                value={alturaBajamar}
                onChange={(e) => setAlturaBajamar(e.target.value)}
                className="w-full p-1 border border-gray-300 rounded-xl text-2xl"
              />
            </div>
          </>
        ) : (
          <>
            <div className="mb-2">
              <label className="block text-gray-700 mb-1 text-sm">
                Hora de Bajamar:
              </label>
              <input
                type="time"
                value={horaBajamar}
                onChange={(e) => setHoraBajamar(e.target.value)}
                className="w-full p-1 border border-gray-300 rounded-xl text-2xl"
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 mb-1 text-sm">
                Altura de Bajamar (m):
              </label>
              <input
                type="number"
                value={alturaBajamar}
                onChange={(e) => setAlturaBajamar(e.target.value)}
                className="w-full p-1 border border-gray-300 rounded-xl text-2xl"
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 mb-1 text-sm">
                Hora de Pleamar:
              </label>
              <input
                type="time"
                value={horaPleamar}
                onChange={(e) => setHoraPleamar(e.target.value)}
                className="w-full p-1 border border-gray-300 rounded-xl text-2xl"
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 mb-1 text-sm">
                Altura de Pleamar (m):
              </label>
              <input
                type="number"
                value={alturaPleamar}
                onChange={(e) => setAlturaPleamar(e.target.value)}
                className="w-full p-1 border border-gray-300 rounded-xl text-2xl"
              />
            </div>
          </>
        )}

        <div className="mb-3">
          <label className="block text-gray-700 mb-1 text-sm">
            Altura Deseada (m):
          </label>
          <input
            type="number"
            value={alturaDeseada}
            onChange={(e) => setAlturaDeseada(e.target.value)}
            className="w-full p-1 border border-gray-300 rounded-xl text-3xl"
          />
        </div>

        <button
          onClick={calcularHoraMarea}
          disabled={!isFormValid()}
          className={`w-full p-2 text-white rounded-xl text-lg font-bold ${
            isFormValid()
              ? "bg-blue-500 hover:bg-blue-600 cursor-pointer"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Calcular Hora
        </button>

        <button
          onClick={limpiarCampos}
          className="w-full mt-3 p-2 bg-gray-400 hover:bg-gray-500 text-white rounded-xl text-lg font-bold "
        >
          Limpiar Campos
        </button>

        {horaResultado && (
          <p className="mt-4 text-2xl text-center font-bold text-blue-700">
            Hora estimada de marea: {horaResultado}
          </p>
        )}
      </div>
    </div>
  );
}

export default MareaCalculator;
