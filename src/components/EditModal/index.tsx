import { useRef } from "react";
import { Task } from "../../types/Task";

type EditModalProps = {
  id: number;
  tasks: Task[];
  isOpen: boolean;
  saveEdit: (id: number, name: string) => void;
  close: () => void;
}

export default function EditModal({ id, isOpen, saveEdit, close, tasks }: EditModalProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    if(inputRef.current) {
      inputRef.current.value = e.currentTarget.value;
    }
  }



  const handleEdit = () => {
    if(inputRef.current) {
      saveEdit(id, inputRef.current.value)
    }
  }

  return (
    <div className="background" id={isOpen ? 'show-background' : 'close-background'} onClick={close}>
      <div className="modal" id={isOpen ? 'show' : 'close'} onClick={(e) => e.stopPropagation()}>
        <input type="text" className="edit-input" placeholder={tasks[id].name}  onChange={handleInput} ref={inputRef} />
        <button onClick={handleEdit} className="edit-button">Edit</button>
      </div>
    </div>
  )
}