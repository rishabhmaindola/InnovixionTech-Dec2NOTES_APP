import React from "react";
import Master from "./Master";
import Note from "./Note";

function NoteContainer(props) {
  const reverArray = (arr) => {
    const array = [];

    for (let i = arr.length - 1; i >= 0; --i) {
      array.push(arr[i]);
    }

    return array;
  };

  const notes = reverArray(props.notes);

  return (
    <div className="w-full h-full flex flex-col">
      <Master />
      <div className="flex px-2 w-full  flex-wrap gap-5 overflow-y-scroll scrollbar-hide">
        {notes?.length > 0 ? (
          notes.map((item) => (
            <Note
              key={item.id}
              note={item}
              deleteNote={props.deleteNote}
              updateText={props.updateText}
            />
          ))
        ) : (
          <div className="flex flex-col w-full text-black dark:text-stone-200">
            <p className="text-nowrap">No Notes present</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default NoteContainer;
