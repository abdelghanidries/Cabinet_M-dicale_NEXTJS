import { createSlice /** creation des reducers ,  actions , gestionnaires d'etat */,
     PayloadAction /** type fournit par redux toolkit , action contant un playoad (des données transmises avec l'action) */
    } from "@reduxjs/toolkit";

export interface initialStateTypes {
  isSidebarCollapsed: boolean;
  isDarkMode: boolean;
}

const initialState: initialStateTypes = {
  isSidebarCollapsed: false,
  isDarkMode: false,
};

export const globalSlice = createSlice({
  name: "global", /* * identifiant de slice
                      *  Ce nom sera utilisé dans Redux pour nommer les actions générées.
   */
  initialState,
  reducers /** Définit les différentes fonctions de mise à jour de l'état. */: {
    setIsSidebarCollapsed /** Modifie la propriété isSidebarCollapsed de l'état global. */: (state, action: PayloadAction<boolean>) => {
      state.isSidebarCollapsed = action.payload;
    },
    setIsDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
  },
});

/** Redux Toolkit génère automatiquement des actions basées sur les noms des reducers. */;
export const { setIsSidebarCollapsed, setIsDarkMode } = globalSlice.actions 

/**
 * Le reducer généré est exporté comme valeur par défaut.
 * Ce reducer sera utilisé par le store Redux pour gérer les mises à jour de l'état global.

 */
export default globalSlice.reducer;