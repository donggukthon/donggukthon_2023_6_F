export interface ITrashLocation {
    trashId: number;
    latitude: number;
    longitude: number;
    address: string;
    picture: string;
  }
  
  export interface ITrashesLocation {
    data: {
      complaintList: ITrashLocation[];
    };
  }
