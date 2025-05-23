import { useState, useEffect } from "react";
import axios from "axios";

export function useTeams() {
  const [teams, setTeams] = useState([]);
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [teamName, setTeamName] = useState("");

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
  };
}
