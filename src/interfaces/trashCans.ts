export interface ITrashCanLocation {
    trashCanId: number;
    latitude: number;
    longitude: number;
  }
  
  export interface ITrashCansLocation {
    data: {
      trashCans: ITrashCanLocation[];
    };
  }
