import { useState, useEffect } from "react";
import axios from "axios";

export function useTeams() {
  // 백엔드 연동시 아래 빈 배열로 초기화
  //  const [teams, setTeams] = useState([]);
  const [teams, setTeams] = useState([
    {
      id: 1,
      name: "A",
    },
  ]);
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [teamName, setTeamName] = useState("");

  // 팀 삭제 모달 상태 및 삭제할 팀 id
  const [showTeamDeleteModal, setShowTeamDeleteModal] = useState(false);
  const [teamToDeleteId, setTeamToDeleteId] = useState(null);

  // 팀 목록 가져오기
  const fetchTeams = async () => {
    try {
      const response = await axios.get("/api/teams");
      if (response.status === 200) {
        setTeams(response.data);
        console.log("팀 목록 조회 성공");
      } else {
        console.error("팀 목록 조회 실패");
      }
    } catch (error) {
      console.error("팀 목록 조회 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const handleCreateTeam = async () => {
    if (!teamName.trim()) {
      console.error("팀 이름을 입력해주세요.");
      return;
    }

    try {
      const response = await axios.post("/api/teams", {
        name: teamName,
      });

      if (response.status === 201) {
        console.log("팀 생성 성공");
        setTeams([...teams, response.data]);
        setShowTeamModal(false);
        setTeamName("");
      } else {
        console.error("팀 생성 실패");
      }
    } catch (error) {
      console.error("팀 생성 중 오류 발생:", error);
    }
  };

  const handleTeamSelect = (teamId) => {
    setSelectedTeamId(teamId);
  };

  const handlePersonalTodoSelect = () => {
    setSelectedTeamId(null);
  };

  const handleTeamModalClose = () => {
    setShowTeamModal(false);
    setTeamName("");
  };

  const handleTeamDeleteClick = (teamId) => {
    setTeamToDeleteId(teamId);
    setShowTeamDeleteModal(true);
  };

  const handleTeamDeleteConfirm = async () => {
    try {
      const response = await axios.delete(`/api/teams/${teamToDeleteId}`);
      if (response.status === 204) {
        await fetchTeams();
      } else {
        console.error("팀 삭제에 실패했습니다.");
      }
    } catch (error) {
      console.error("팀 삭제 중 오류가 발생했습니다.");
    } finally {
      setShowTeamDeleteModal(false);
      setTeamToDeleteId(null);
    }
  };

  const handleTeamDeleteCancel = () => {
    setShowTeamDeleteModal(false);
    setTeamToDeleteId(null);
  };

  return {
    teams,
    selectedTeamId,
    showTeamModal,
    teamName,
    setTeamName,
    setShowTeamModal,
    handleCreateTeam,
    handleTeamSelect,
    handlePersonalTodoSelect,
    handleTeamModalClose,
    // 팀 삭제 관련
    showTeamDeleteModal,
    teamToDeleteId,
    handleTeamDeleteClick,
    handleTeamDeleteConfirm,
    handleTeamDeleteCancel,
  };
}
