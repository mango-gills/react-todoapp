import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Toast notifications

const notifyAddInput = () => {
  toast.info("Empty input is invalid", {
    position: "top-right",
    autoClose: 500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
  });
};

const notifyNewTodo = () => {
  toast("✔️ New task added!", {
    position: "top-right",
    autoClose: 500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
  });
};

const notifyDeleteId = "deletedTodo";
const notifyDeletedTodo = () => {
  toast("🗑️ Task(s) deleted!", {
    toastId: notifyDeleteId,
    position: "top-right",
    autoClose: 500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
  });
};

const noCompletedId = "noCompleted";
const notifyNoCompletedTodo = () => {
  toast("ℹ️ No completed task to remove.", {
    toastId: noCompletedId,
    position: "top-right",
    autoClose: 500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
  });
};

export {
  notifyAddInput,
  notifyNewTodo,
  notifyDeletedTodo,
  notifyNoCompletedTodo,
};
