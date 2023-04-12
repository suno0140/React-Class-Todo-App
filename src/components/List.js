import React, { useState } from "react";

const List = React.memo(
  ({ todoData, setTodoData, data, provided, snapshot }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(data.title);

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

    const handleEditChange = (e) => {
      setEditedTitle(e.target.value);
    };

    const handleSubmit = () => {
      let newTodoData = todoData.map((value) => {
        if (value.id === data.id) {
          value.title = editedTitle;
        }
        return value;
      });
      setTodoData(newTodoData);
      setIsEditing(false);
    };

    if (isEditing) {
      return (
        <div
          className={`bg-gray-100 flex items-center justify-between w-full px-4 py-3 my-2 text-gray-600 rounded`}
        >
          <div className="items-center">
            {" "}
            <form onSubmit={handleSubmit}>
              <input
                className="w-full px-3 py-2 mr-4 text-gray-500"
                defaultChecked={false}
                value={editedTitle}
                autoFocus
                onChange={handleEditChange}
              />
            </form>
          </div>
          <div className="items-center">
            <button
              className="px-4 py-2 float-right"
              onClick={() => {
                handleClick(data.id);
              }}
            >
              x
            </button>{" "}
            <button
              type="submit"
              className="px-4 py-2 float-right"
              onClick={handleSubmit}
            >
              저장하기
            </button>
          </div>
        </div>
      );
    } else {
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
              className="px-4 py-2 float-right"
              onClick={() => {
                handleClick(data.id);
              }}
            >
              x
            </button>{" "}
            <button
              className="px-4 py-2 float-right"
              onClick={() => {
                setIsEditing(true);
              }}
            >
              수정하기
            </button>
          </div>
        </div>
      );
    }
  }
);

export default List;
