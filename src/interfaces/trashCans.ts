export interface ITrashCanLocation {
    trashCanId: number;
    latitude: number;
    longitude: number;
    address: string;
    picture: string;
  }
  
  export interface ITrashCansLocation {
    data: {
      trashCans: ITrashCanLocation[];
    };
  }
