import React, { useState, useEffect } from "react";
import "../todoList/TodoList.css";
import "../todoList/ConfirmationModal.css";
import RealTimeClock from "../todoList/RealTimeClock";
import ConfirmationModal from "../todoList/ConfirmationModal";

const TodoList = () => {
  const [list, setList] = useState([]);
  const [newList, setNewList] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [confirmationMessageDelete, setConfirmationMessageDelete] = useState("");
  const [taskToDelete, setTaskToDelete] = useState(null); // Estado para almacenar la tarea que se va a eliminar

  // Cargar tareas desde localStorage al cargar el componente
  useEffect(() => {
    const savedList = JSON.parse(localStorage.getItem("todoList")) || [];
    setList(savedList);
  }, []);

  // Guardar lista en localStorage cada vez que cambie
  useEffect(() => {
    try {
      localStorage.setItem("todoList", JSON.stringify(list));
    } catch (error) {
      localStorage.removeItem("todoList");
      console.log(error);
    }
  }, [list]);

  const inputValue = (e) => {
    setNewList(e.target.value);
  };

  const addLista = () => {
    if (newList.trim() !== "") {
      const newTask = {
        id: Date.now(),
        description: newList,
        done: false,
        time: new Date().toLocaleString(),
      };
      setList([newTask, ...list]);
      setNewList("");

      setConfirmationMessage("¡Tarea agregada con éxito!"); // Mostrar mensaje de confirmación

      // Ocultar el mensaje después de 2 segundos
      setTimeout(() => {
        setConfirmationMessage("");
      }, 2000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (editingId !== null) {
        // Si estamos editando, guardar
        saveEdit(editingId);
      } else {
        // Si no estamos editando, agregar la tarea
        addLista();
      }
    }
  };

  const deleteBtn = (taskId) => {
    setTaskToDelete(taskId);
    setShowModal(true);
  };

  const confirmDelete = () => {
    setList(list.filter((task) => task.id !== taskToDelete));
    setShowModal(false);
    setTaskToDelete(null);

    setConfirmationMessageDelete("¡Tarea eliminada!"); // Mostrar mensaje de confirmación
    // Ocultar el mensaje después de 2 segundos
    setTimeout(() => {
      setConfirmationMessageDelete("");
    }, 2000);
  };

  const cancelDelete = () => {
    setShowModal(false);
    setTaskToDelete(null);
  };

  const toggleDone = (taskId) => {
    const updatedList = list.map((task) =>
      task.id === taskId ? { ...task, done: !task.done } : task
    );
    setList(updatedList);
  };

  const startEditing = (task) => {
    setEditingId(task.id);
    setEditText(task.description);
  };

  const saveEdit = (taskId) => {
    const updatedList = list.map((task) =>
      task.id === taskId ? { ...task, description: editText } : task
    );
    setList(updatedList);
    setEditingId(null);

    setConfirmationMessage("¡Tarea actualizada!"); // Mostrar mensaje de confirmación
    // Ocultar el mensaje después de 2 segundos
    setTimeout(() => {
      setConfirmationMessage("");
    }, 2000);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  return (
    <div>
      {confirmationMessage && (
        <div className="container-confirmation">
          <p className="confirmation-message">{confirmationMessage}</p>
        </div>
      )}
      {confirmationMessageDelete && (
        <div className="container-confirmation">
          <p className="confirmation-message-delete">
            {confirmationMessageDelete}
          </p>
        </div>
      )}

      <div className="container">
        <RealTimeClock />
        <h1>Lista de Tareas</h1>
        <div className="flex">
          <input
            className="input-search"
            type="text"
            placeholder="Escribe tu tarea..."
            value={newList}
            onChange={inputValue}
            onKeyDown={handleKeyPress} //Detectamos el presionado de la tecla Enter
          />
          <button
            className={newList.length >= 3 ? "btn-add" : "button-add-pending"}
            onClick={addLista}
            disabled={newList.length < 3}
          >
            Agregar
          </button>
        </div>

        <section className="section">
          {list.length === 0 ? (
            <>
              <p className="pPending">No tienes nada pendiente.</p>
              <div>
                <hr />
              </div>
            </>
          ) : (
            list.map((task) => (
              <div key={task.id} className="li-container">
                {editingId === task.id ? (
                  <>
                    <p className="pEdit">Actualizando la tarea</p>
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyDown={handleKeyPress} //Detectamos el presionado de la tecla Enter
                    />
                    <button
                      onClick={() => saveEdit(task.id)}
                      className="btn-save"
                    >
                      Guardar
                    </button>
                    <button onClick={cancelEdit} className="btn-cancel">
                      Cancelar
                    </button>
                  </>
                ) : (
                  <>
                    <p className={task.done ? "task-done" : "none"}>
                      {task.description}
                    </p>
                    <p className="pTime">{task.time}</p>
                    <button
                      className="btn-delete"
                      onClick={() => deleteBtn(task.id)}
                    >
                      Eliminar
                    </button>
                    <button
                      className={task.done ? "button-edit-pending" : "btn-edit"}
                      onClick={() => startEditing(task)}
                      disabled={task.done} // Deshabilitar si la tarea está completada
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => toggleDone(task.id)}
                      className={
                        task.done ? "btn-finish" : "button-finish-pending"
                      }
                    >
                      {task.done ? "Terminado" : "Terminar"}
                    </button>
                  </>
                )}
              </div>
            ))
          )}
        </section>
        {showModal && (
          <ConfirmationModal
            message="¿Estás seguro de que deseas eliminar esta tarea?"
            onConfirm={confirmDelete}
            onCancel={cancelDelete}
          />
        )}
      </div>
    </div>
  );
};

export default TodoList;
