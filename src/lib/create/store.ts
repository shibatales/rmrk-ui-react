import create from 'zustand';

type ICreateStore = {
  isCreateCollectionModalOpen: boolean;
  setIsCreateCollectionModalOpen: Function;
};

export const useCreateStore = create<ICreateStore>((set) => ({
  isCreateCollectionModalOpen: false,
  setIsCreateCollectionModalOpen: (isCreateCollectionModalOpen: boolean) => {
    set({ isCreateCollectionModalOpen });
  },
}));
