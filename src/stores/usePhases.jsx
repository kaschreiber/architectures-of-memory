import { create } from "zustand";

export const PHASE = {
  START: 0,
  EXPERIENCE: 1,
  END: 2,
};

export default create((set) => {
  return {
    phase: PHASE.START,
    start: () => {
      set({ phase: PHASE.EXPERIENCE });
    },
  };
});
