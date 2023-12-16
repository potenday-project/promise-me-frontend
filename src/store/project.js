import { create } from 'zustand';

// name categoty start deadline members => 프로젝트 생성
// memberInfo : putduration 에서 통신하여 roleinfo 페이지에서 사용하기 위함
const useProjectStore = create((set) => {
  return {
    name: '',
    category: '',
    start: new Date(),
    deadline: new Date(),
    members: '',

    memberInfo: {},

    setTeamName: (name) => set(() => ({ teamName: name })),
    setCategory: (category) => set(() => ({ category: category })),
    setStart: (start) => set(() => ({ start: start.toISOString().split('T')[0] })),
    setDeadline: (deadline) => set(() => ({ deadline: deadline.toISOString().split('T')[0] })),    
    setMembers: (members) => {
      const memberList = Object.entries(members).flatMap(([role, users]) =>
        users.map(user => ({ userId: String(user.userId), role }))
      );
      set({ members: memberList });
    },

    setMemberInfo: (info) => {
      const memberInfoArray = Object.entries(info).map(([role, description]) => ({
        role,
        description
      }));
      set({ memberInfo: memberInfoArray });
    },
  };
});

export default useProjectStore;