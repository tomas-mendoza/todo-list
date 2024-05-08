import { useRef, useState, type FormEvent } from 'react'
import { Task } from './types/Task';
import EditModal from './components/EditModal';

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')!) : []);
  const [modalState, setModalState] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number>(0);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleInput = (e: FormEvent<HTMLInputElement>) => {
    if(inputRef.current) {
      inputRef.current.value = e.currentTarget.value;
    }
  }

  const saveEdit = (id: number, newName: string) => {
    const newTasks = [... tasks];
    newTasks[id].name = newName;
    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
    const newModalState = false;
    setModalState(newModalState);
  }

  const close = () => {
    const newModalState = !modalState;
    setModalState(newModalState);
  }

  const handleCreate = () => {
    if(inputRef.current) {
      const newTasks: Task[] = [... tasks, { name: inputRef.current.value, status: 'pending' }];
      setTasks(newTasks);
      localStorage.setItem('tasks', JSON.stringify(newTasks));
      inputRef.current.value = '';
    }
  }

  const handleDelete = (id: number) => {
    const newTasks: Task[] = tasks.filter((_, index) => index !== id);
    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  }

  const handleEdit = (id: number) => {
    setSelectedId(id);
    const newModalState = !modalState;
    setModalState(newModalState);
  }

  return (
    <>
      <main>
        <div className="input-container">
          <input type="text" ref={inputRef} onChange={handleInput} placeholder='type a task name...' className='create-input' />
          <button onClick={handleCreate} className='create-button'>create</button>
        </div>
        <div className="tasks-container">
          {
            tasks.map((task, index) => (
              <div className='task-container' key={index}>
                <p>{ task.name }</p>
                <div className="button-container">
                  <button onClick={() => handleEdit(index)}>Edit</button>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </div>
              </div>
            ))
          }
        </div>
      </main>
      <EditModal id={selectedId} isOpen={modalState} close={close} saveEdit={saveEdit} tasks={tasks} />
    </>
  )
}