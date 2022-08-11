import { useEffect, useState } from "react";
import bgDesktopDark from "./assets/bg-desktop-dark.jpg";
import bgMobileDark from "./assets/bg-mobile-dark.jpg";
import sunIcon from "./assets/icon-sun.svg";
import { db } from "../firebase-config";
import {
  doc,
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  updateDoc,
  onSnapshot,
  orderBy,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";
import { ToastContainer } from "react-toastify";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import {
  notifyAddInput,
  notifyNewTodo,
  notifyDeletedTodo,
  notifyNoCompletedTodo,
} from "./ToastNotifications";
import { taskVariant } from "./Variants";
import Todos from "./components/Todos";

function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [newTodo, setNewTodo] = useState("");
  const [todosList, setTodosList] = useState([]);
  const [isActive, setIsActive] = useState(false);

  // collection referece
  const collectionRef = collection(db, "todos");

  const handleWindowResize = () => {
    if (window.innerWidth < 376) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    getTodos();
  }, []);

  // Add new todo to firestore
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newTodo === "") {
      notifyAddInput();
    } else {
      notifyNewTodo();
      await addDoc(collectionRef, {
        title: newTodo,
        isCompleted: false,
        createdAt: serverTimestamp(),
      });
      setNewTodo("");
    }
  };

  // Get todos from firestore
  const getTodos = () => {
    const q = query(collectionRef, orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({
          ...doc.data(),
          id: doc.id,
          createdAt: doc.data().createdAt,
        });
      });
      setTodosList(todosArr);
    });
    return () => unsubscribe();
  };

  // Update todo
  const updateTodo = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      isCompleted: !todo.isCompleted,
    });
  };

  // Delete todo
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
    notifyDeletedTodo();
  };

  // Clear completed tasks
  const deleteCompletedTodo = () => {
    todosList.forEach((doc) => {
      if (doc.isCompleted === true) {
        deleteTodo(doc.id);
      }
    });
    const notCompleted = todosList.find((item) => item.isCompleted == true);
    if (notCompleted === undefined) {
      notifyNoCompletedTodo();
    }
  };

  // Sort and Filter Todos
  const sortByNewest = () => {
    const tempNewest = todosList.sort(
      (x, y) => y.createdAt.seconds - x.createdAt.seconds
    );
    setTodosList(tempNewest);
  };

  const sortByOldest = () => {
    const tempOldest = todosList.sort(
      (x, y) => x.createdAt.seconds - y.createdAt.seconds
    );
    setTodosList(tempOldest);
  };

  const filterActive = () => {
    const active = todosList.filter((todo) => todo.isCompleted !== true);
    setTodosList(active);
  };

  const filterCompleted = () => {
    const completed = todosList.filter((todo) => todo.isCompleted === true);
    setTodosList(completed);
  };

  return (
    <>
      <div className="w-full h-screen relative text-white md:flex md:justify-center ">
        <img
          className="absolute -z-10 top-0 bg-center sm:h-[350px] sm:object-cover lg:h-[300px] lg:w-full"
          // src={bgMobileDark}
          src={isMobile ? bgMobileDark : bgDesktopDark}
          alt="desktop background"
        />

        <div className="px-5 py-10 h-full md:w-[500px] md:pt-20">
          <div className="flex justify-between items-center mb-5">
            <h1 className="text-2xl font-bold tracking-[.8rem]">TODO</h1>
            <img className="w-5" src={sunIcon} alt="Sun Icon" />
          </div>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="todo-input py-2 px-4 rounded-md my-6 flex items-center"
          >
            <input
              className="w-6 h-6 rounded-full bg-transparent border-gray-500 "
              type="checkbox"
              disabled
            />
            {/* New Todo Input */}
            <input
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              className="text-gray-400 w-full text-md text-md bg-transparent border-none focus:border-none focus:ring-0"
              type="text"
              placeholder="Create a new todo..."
            />
          </form>
          <div className="todos min-h-[400px] rounded-md  flex flex-col justify-between">
            <div className="todos-list overflow-y-scroll scrollbar-hide">
              <Reorder.Group values={todosList} onReorder={setTodosList}>
                <AnimatePresence>
                  {todosList.map((item, idx) => (
                    <Todos
                      key={item.id}
                      item={item}
                      taskVariant={taskVariant}
                      updateTodo={updateTodo}
                      deleteTodo={deleteTodo}
                    />
                  ))}
                </AnimatePresence>
              </Reorder.Group>
            </div>
            <div className="flex justify-between text-sm text-gray-500 px-5 py-3">
              <p>{todosList.length} items left</p>
              <p
                className="cursor-pointer hover:text-purple-600"
                onClick={deleteCompletedTodo}
              >
                Clear Completed
              </p>
            </div>
          </div>

          <div className="todos-status w-full flex justify-around px-12 py-4 text-sm my-5 rounded-md">
            <p
              className="cursor-pointer hover:text-purple-600"
              onClick={sortByNewest}
            >
              Newest
            </p>
            <p
              onClick={sortByOldest}
              className="cursor-pointer hover:text-purple-600"
            >
              Oldest
            </p>
            <p
              onClick={filterActive}
              className="cursor-pointer hover:text-purple-600"
            >
              Active
            </p>
            <p
              onClick={filterCompleted}
              className="cursor-pointer hover:text-purple-600"
            >
              Completed
            </p>
            <p className="cursor-pointer hover:text-purple-600">All</p>
          </div>

          <p className="text-center text-sm mt-12 text-gray-600">
            Drag and drop to reorder list
          </p>
        </div>
      </div>
      <ToastContainer pauseOnFocusLoss={false} />
    </>
  );
}

export default App;
