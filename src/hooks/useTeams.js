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

  // 팀 초대 모달 상태 및 초대 관련 상태
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteInput, setInviteInput] = useState("");
  const [invitedMembers, setInvitedMembers] = useState([
    {
      user_id: "person01",
    },
    {
      user_id: "person02",
    },
  ]);
  const [inviteTeamId, setInviteTeamId] = useState(null);

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
        console.log("팀 삭제 성공");
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

  // 팀원 목록 불러오기
  const fetchTeamMembers = async (teamId) => {
    try {
      const response = await axios.get(`/api/teams/${teamId}`);
      if (response.status === 200) {
        setInvitedMembers(response.data);
        console.log("팀원 목록 조회 성공");
      } else {
        setInvitedMembers([]);
        console.error("팀원 목록 조회 실패");
      }
    } catch (e) {
      setInvitedMembers([]);
    }
  };

  // 팀 초대 모달 열기
  const handleTeamInviteClick = async (teamId) => {
    setInviteTeamId(teamId);
    setShowInviteModal(true);
    await fetchTeamMembers(teamId);
  };

  // 팀원 초대 기능
  const handleInvite = async () => {
    if (!inviteInput.trim()) return;
    try {
      const response = await axios.post(`/api/teams/${inviteTeamId}/members`, {
        user_id: inviteInput.trim(),
      });
      if (response.status === 201) {
        //setInvitedMembers([...invitedMembers, response.data]);
        setInviteInput("");
        console.log("초대 성공");
      } else {
        console.error("초대에 실패했습니다.");
      }
    } catch (e) {
      console.error("초대 중 오류가 발생했습니다.");
    }
  };

  // 팀 초대 모달 닫기
  const handleInviteModalClose = () => {
    setShowInviteModal(false);
    setInviteInput("");
    setInviteTeamId(null);
    setInvitedMembers([]);
  };

  // 팀원 삭제 기능
  const handleRemoveMember = async (user_id) => {
    try {
      const response = await axios.delete(
        `/api/teams/${inviteTeamId}/members/${user_id}`
      );
      if (response.status === 204) {
        console.log("팀원 삭제 성공");
        await fetchTeamMembers(inviteTeamId);
      }
    } catch (e) {
      console.error("팀원 삭제 실패", e);
    }
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
    // 팀 초대 관련
    showInviteModal,
    inviteInput,
    setInviteInput,
    invitedMembers,
    setInvitedMembers,
    inviteTeamId,
    setInviteTeamId,
    handleTeamInviteClick,
    handleInvite,
    handleInviteModalClose,
    handleRemoveMember,
  };
}
