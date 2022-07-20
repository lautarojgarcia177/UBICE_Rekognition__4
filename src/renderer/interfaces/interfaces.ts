export interface IRekognitionState {
  files: any[]
}

export interface IAction {
  type: any;
  payload: any;
}

export interface IRekognitionFile {
  id: number,
  name: string,
  path: string,
  numbers: number[],
}
