import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Graph from "react-graph-vis";

import "./styles.css";

export default function App() {
  const { register, handleSubmit, reset } = useForm();

  const [nodeCounter, setNodeCounter] = useState(0);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const graph = {
    nodes: nodes,
    edges: edges
  };

  const options = {
    layout: {
      hierarchical: false
    },
    edges: {
      color: "#000000",
      arrows: {
        to: {
          enabled: false
        }
      }
    },
    height: "500px"
  };

  const handleReset = () => {
    reset({ nodeName: "", edgeStart: "", edgeEnd: "", edgeValue: "" });
    setNodeCounter(0);
    setNodes([]);
    setEdges([]);
  };

  const onSubmit = (data) => {
    if (data.nodeName && nodeCounter < 20) {
      setNodeCounter(nodeCounter + 1);
      setNodes([...nodes, { id: nodeCounter, label: data.nodeName }]);
      reset({ nodeName: "", edgeStart: "", edgeEnd: "", edgeValue: "" });
    }
    if (
      data.edgeStart &&
      data.edgeEnd &&
      data.edgeValue &&
      nodes.find((current) => data.edgeStart === current.label) &&
      nodes.find((current) => data.edgeEnd === current.label)
    ) {
      setEdges([
        ...edges,
        {
          from: nodes.find((current) => data.edgeStart === current.label).id,
          to: nodes.find((current) => data.edgeEnd === current.label).id,
          label: data.edgeValue
        }
      ]);
      reset({ nodeName: "", edgeStart: "", edgeEnd: "", edgeValue: "" });
    }
  };

  return (
    <div className="App">
      <div className="InputBox">
        <p>Nome do vértice</p>
        <input {...register("nodeName")}></input>
        {nodeCounter > 1 && (
          <p>Nome do primeiro vértice já existente da aresta*</p>
        )}
        {nodeCounter > 1 && <input {...register("edgeStart")}></input>}
        {nodeCounter > 1 && (
          <p>Nome do segundo vértice já existente da aresta*</p>
        )}
        {nodeCounter > 1 && <input {...register("edgeEnd")}></input>}
        {nodeCounter > 1 && <p>Valor da aresta*</p>}
        {nodeCounter > 1 && (
          <input type="number" {...register("edgeValue")}></input>
        )}
        {nodeCounter > 1 && (
          <p>
            Para inserir uma aresta, todos os campos (*) precisam ser
            preenchidos
          </p>
        )}
        <div className="ButtonContainer">
          <button onClick={handleSubmit(onSubmit)}>Enviar</button>
          <button onClick={() => handleReset()}>Limpar</button>
        </div>
      </div>
      <Graph key={Math.random()} graph={graph} options={options} />
    </div>
  );
}
