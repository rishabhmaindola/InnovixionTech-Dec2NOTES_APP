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
      <div className="flex-1 px-2 flex flex-wrap gap-5 overflow-y-scroll scrollbar-hide">
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
          <h3 className="text-black dark:text-stone-200">No Notes present</h3>
        )}
      </div>
    </div>
  );
}

export default NoteContainer;
