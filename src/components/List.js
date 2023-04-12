import React from "react";

export default function List({
  todoData,
  setTodoData,
  data,
  provided,
  snapshot,
}) {
  const handleClick = (id) => {
    let newTodoData = todoData.filter((data) => data.id !== id);
    setTodoData(newTodoData);
  };

  const handleCompleChange = (id) => {
    let newTodoData = todoData.map((data) => {
      if (data.id === id) {
        data.completed = !data.completed;
      }
      return data;
    });
    setTodoData(newTodoData);
  };
  return (
    <div
      key={data.id}
      {...provided.draggableProps}
      ref={provided.innerRef}
      {...provided.dragHandleProps}
      className={`${
        snapshot.isDragging ? "bg-gray-400" : "bg-gray-100"
      } flex items-center justify-between w-full px-4 py-3 my-2 text-gray-600 rounded`}
    >
      <div className="items-center">
        <input
          type="checkbox"
          defaultChecked={false}
          onClick={() => handleCompleChange(data.id)}
        />
        <span
          className={` 
                            ${data.completed ? "line-through" : undefined}
                            px-1
                          `}
        >
          {data.title}
        </span>
      </div>
      <div className="items-center">
        <button
          onClick={() => {
            handleClick(data.id);
          }}
        >
          x
        </button>
      </div>
    </div>
  );
}
