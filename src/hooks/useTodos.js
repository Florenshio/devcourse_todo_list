import { useState, useEffect } from "react";
import axios from "axios";

export function useTodos(selectedTeamId) {
  // 백엔드 연동시 아래 빈 배열로 초기화
  //  const [todos, setTodos] = useState([]);
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "개인 할일",
      status: "todo",
    },
    {
      id: 2,
      title: "개인 할일",
      status: "done",
    },
    {
      id: 3,
      title: "팀 할일",
      status: "todo",
      team_id: 2,
    },
    {
      id: 4,
      title: "팀 할일",
      status: "done",
      team_id: 3,
    },
  ]);
  const [editId, setEditId] = useState(null);
  const [editInput, setEditInput] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // 할 일 목록 가져오기
  const fetchTodos = async () => {
    try {
      const params =
        selectedTeamId === null
          ? { team_id: null }
          : { team_id: selectedTeamId };
      const response = await axios.get("/api/tasks", { params });
      if (response.status === 200) {
        setTodos(response.data);
        console.log("할 일 목록 조회 성공");
      } else {
        console.error("할 일 목록 조회 실패");
      }
    } catch (error) {
      console.error("할 일 목록 조회 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    if (selectedTeamId !== undefined) {
      fetchTodos();
    }
  }, [selectedTeamId]);

  // 할일 생성
  const handleAddTodo = async (todoInput) => {
    if (!todoInput.trim()) return;

    try {
      const response = await axios.post("/api/tasks", {
        title: todoInput,
        team_id: selectedTeamId || null,
      });

      if (response.status === 201) {
        setTodos([...todos, response.data]);
        console.log("할 일 생성 성공");
        return true;
      } else {
        console.error("할 일 생성 실패");
        return false;
      }
    } catch (error) {
      console.error("할 일 추가 중 오류 발생:", error);
      return false;
    }
  };

  // 할일 상태 변경
  const handleToggle = async (id) => {
    try {
      const todo = todos.find((t) => t.id === id);
      const newStatus = todo.status === "todo" ? "done" : "todo";

      const response = await axios.patch(`/api/tasks/${id}/status`, {
        status: newStatus,
      });

      if (response.status === 200) {
        const updatedTodos = todos.map((todo) =>
          todo.id === id ? { ...todo, status: newStatus } : todo
        );
        setTodos(updatedTodos);
        console.log("할일 상태 변경 성공");
      } else {
        console.error("할일 상태 변경 실패");
      }
    } catch (error) {
      console.error("할일 상태 변경 중 오류 발생:", error);
    }
  };

  // 할일 수정
  const handleEdit = (id, title) => {
    setEditId(id);
    setEditInput(title);
  };

  const handleUpdate = async (id) => {
    if (editInput.trim() === "") {
      console.error("할 일 내용이 비어있습니다.");
      return;
    }

    const todo = todos.find((t) => t.id === id);
    if (todo.title === editInput) {
      console.log("변경된 내용이 없습니다.");
      setEditId(null);
      return;
    }

    try {
      const response = await axios.patch(`/api/tasks/${id}`, {
        title: editInput,
      });

      if (response.status === 200) {
        const updatedTodos = todos.map((todo) =>
          todo.id === id ? { ...todo, title: editInput } : todo
        );
        setTodos(updatedTodos);
        setEditId(null);
        console.log("할 일 수정 성공");
      } else {
        console.error("할 일 수정 실패");
      }
    } catch (error) {
      console.error("할 일 수정 중 오류 발생:", error);
    }
  };

  const handleCancel = () => {
    setEditId(null);
    setEditInput("");
  };

  // 할일 삭제
  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await axios.delete(`/api/tasks/${deleteId}`);

      if (response.status === 204) {
        const updatedTodos = todos.filter((todo) => todo.id !== deleteId);
        setTodos(updatedTodos);
        console.log("할 일 삭제 성공");
      } else {
        console.error("할 일 삭제 실패");
      }
    } catch (error) {
      console.error("할 일 삭제 중 오류 발생:", error);
    } finally {
      setShowDeleteModal(false);
      setDeleteId(null);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  return {
    todos,
    editId,
    editInput,
    setEditInput,
    showDeleteModal,
    handleAddTodo,
    handleToggle,
    handleEdit,
    handleUpdate,
    handleCancel,
    handleDelete,
    handleDeleteConfirm,
    handleDeleteCancel,
  };
}
