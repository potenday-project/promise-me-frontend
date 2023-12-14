import { create } from 'zustand';

const useProjectStore = create((set) => {
  return {
    name: '',
    category: '',
    start: '',
    deadline: '',
    members: '',

    setTeamName: (name) => set(() => ({ teamName: name })),
    setCategory: (category) => set(() => ({ category: category })),
    setStart: (start) => set(() => ({ start: start })),
    setDeadline: (deadline) => set(() => ({ deadline: deadline })),
    setMembers: (members) => set(() => ({ members: members })),
  };
});

export default useProjectStore;