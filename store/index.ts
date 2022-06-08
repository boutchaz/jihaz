export const state = () => ({
  isSoundEnabled: true as Boolean,
  guest:{},
});

export const mutations = {
  toggleSound(state: any) {
    state.isSoundEnabled = !state.isSoundEnabled;
    localStorage.setItem("isSoundEnabled", state.isSoundEnabled);
  },
  initializeSound(state: any) {
    const isSoundEnabled = JSON.parse(
      localStorage.getItem("isSoundEnabled") || "true"
    );

    if (!isSoundEnabled) {
      state.isSoundEnabled = false;
      localStorage.setItem("isSoundEnabled", "false");
    } else if (isSoundEnabled) {
      state.isSoundEnabled = true;
      localStorage.setItem("isSoundEnabled", "true");
    } else {
      state.isSoundEnabled = true;
      localStorage.setItem("isSoundEnabled", "true");
    }
  },
  saveGuest(state: any,user:any) {
    console.log(user)
    state.guest = user
  },
};
