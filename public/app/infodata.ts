//infodata.ts
/// <reference path='../lib/typings/q/Q.d.ts'/>
//
export interface IBaseItem {
  id: any;
  rev: any;
  attachments: any;
  type: string;
  collection_name: string;
  index_name:string;
  avatarid: string;
  //
  create_id: () => string;
  base_prefix:string;
  search_prefix : string;
  has_id: boolean;
  has_rev: boolean;
  is_storeable: boolean;
  //
  to_insert_map: (oMap: any) => void;
  to_fetch_map: (oMap: any) => void;
  sort_func: (p1: IBaseItem, p2: IBaseItem) => number;
  //
  avatarurl?:any;
  has_avatarurl?:boolean;
  sigle?: string;
  name?: string;
  description?: string;
  departementid?: any;
  anneeid?: any;
  semestreid?: any;
  uniteid?: any;
  matiereid?: any;
  groupeid?: any;
  startDate?: Date;
  endDate?: Date;
  genre?: string;
  mat_module?: string;
  coefficient?: number;
  ecs?: number;
  personid?: any;
  has_avatarid?:boolean;
  fullname?: string;
  has_fullname?:boolean;
  date?: Date;
  location?: string;
  startTime?: Date;
  note?: number;
  status?: string;
  enseignantid?: any;
  etudiantid?: any;
  profaffectationid?: any;
  etudaffectationid?: any;
  username?: string;
  password?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  phone?: string;
  roles?: string[];
  departementids?: any[];
  anneeids?: any[];
  semestreids?: any[];
  matiereids?: any[];
  uniteids?: any[];
  groupeids?: any[];
  infoids?: any[];
  mimetype?: string;
  data?: any[];
  dossier?: string;
  sexe?: string;
  birthDate?: Date;
  ville?: string;
  etablissement?: string;
  serieBac?: string;
  optionBac?: string;
  mentionBac?: string;
  etudesSuperieures?: string;
}// interface IBaseItem
export interface IDescriptionItem extends IBaseItem {
  description: string;
  //
  has_description: boolean;
}// interface IDescriptionItem
export interface IAttachedDoc extends IDescriptionItem {
  mimetype: string;
  genre: string;
  name: string;
  data: any[];
  description: string;
  //
  has_mimetype: boolean;
  has_genre: boolean;
  has_name: boolean;
  has_data: boolean;
}// interface IAttachedDoc
export interface IPerson extends IDescriptionItem {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  roles: string[];
  departementids: any[];
  anneeids: any[];
  semestreids: any[];
  matiereids: any[];
  uniteids: any[];
  groupeids: any[];
  //
  fullname: string;
  //
  has_username: boolean;
  has_password: boolean;
  has_firstname: boolean;
  has_lastname: boolean;
  has_fullname: boolean;
  has_email: boolean;
  has_phone: boolean;
  has_roles: boolean;
  has_departementids: boolean;
  has_anneeids: boolean;
  has_semestreids: boolean;
  has_uniteids: boolean;
  has_matiereids: boolean;
  has_groupeids: boolean;
  //
  reset_password: () => void;
  check_password: (ct: string) => boolean;
  change_password: (ct: string) => void;
  //
  hasrole: (r: string) => boolean;
  is_super: boolean;
  is_admin: boolean;
  is_oper: boolean;
  is_prof: boolean;
  is_etud: boolean;
  is_reader: boolean;
  //
  add_role: (r: string) => void;
  remove_role: (r: string) => void;
  //
  add_departementid: (id: any) => void;
  remove_departementid: (id: any) => void;
  add_anneeid: (id: any) => void;
  remove_anneeid: (id: any) => void;
  add_semestreid: (id: any) => void;
  remove_semestreid: (id: any) => void;
  add_uniteid: (id: any) => void;
  remove_uniteid: (id: any) => void;
  add_matiereid: (id: any) => void;
  remove_matiereid: (id: any) => void;
  add_groupeid: (id: any) => void;
  remove_groupeid: (id: any) => void;
}// interface IPerson
export interface IProfPerson extends IPerson {

}// interface IProfPerson
export interface IOperPerson extends IPerson {

}// interface IOperPerson
export interface IAdminPerson extends IPerson {

}// interface IAdminPerson
export interface IEtudiantPerson extends IPerson {
  dossier: string;
  sexe: string;
  birthDate: Date;
  ville: string;
  etablissement: string;
  serieBac: string;
  optionBac: string;
  mentionBac: string;
  etudesSuperieures: string;
  //
  isMale: boolean;
  isFeminin: boolean;
  //
  has_dossier: boolean;
  has_sexe: boolean;
  has_birthDate: boolean;
  has_ville: boolean;
  has_etablissement: boolean;
  has_serieBac: boolean;
  has_optionBac: boolean;
  has_mentionBac: boolean;
  has_etudesSuperieures: boolean;
}// interface IEtudiantPerson
export interface ISigleNameItem extends IDescriptionItem {
  sigle: string;
  name: string;
  //
  has_sigle: boolean;
  has_name: boolean;
}// interface ISigleNameItem
export interface IDepartement extends ISigleNameItem {
}// interface IDepartement
export interface IDepartementChild extends IDescriptionItem {
  departementid: any;
  has_departementid: boolean;
}// interface IDepartementChild

export interface IDepartementSigleNameItem extends ISigleNameItem {
  departementid: any;
  has_departementid: boolean;
}// interface IDepartement
export interface IIntervalItem extends IDepartementSigleNameItem {
  startDate: Date;
  endDate: Date;
  //
  has_startDate: boolean;
  has_endDate: boolean;
}// interface ISigleNameItem
export interface IAnnee extends IIntervalItem {
}
export interface IGroupe extends IDepartementSigleNameItem {

}// interface IGroupe
export interface IUnite extends IDepartementSigleNameItem {

}// interface IUnite
export interface ISemestre extends IIntervalItem {
  anneeid: any;
  has_anneeid: boolean;
}// interface ISemestre
export interface IMatiere extends IDepartementSigleNameItem {
  uniteid: any;
  coefficient: number;
  ecs: number;
  genre: string;
  mat_module: string;
  //
  has_uniteid: boolean;
  has_coefficient: boolean;
  has_ecs: boolean;
  has_genre: boolean;
  has_mat_module: boolean
}// interface IMatiere
//
export interface IDepartementPerson extends IDepartementChild {
  personid: any;
  has_personid: boolean;
  fullname: string;
}// interface IDepartementPerson
//
export interface IEtudiant extends IDepartementPerson {
}// interface IEtudiant
export interface IEnseignant extends IDepartementPerson {
}// interface IEnseignant
export interface IOperator extends IDepartementPerson {
}// interface IOperator
export interface IAdministrator extends IDepartementPerson {
}// interface IOperator
//
export interface IAffectation extends IDepartementChild {
  semestreid: any;
  groupeid: any;
  anneeid: any;
  personid: any;
  fullname: string;
  startDate: Date;
  endDate: Date;
  //
  has_semestreid: boolean;
  has_groupeid: boolean;
  has_personid: boolean;
  has_startDate: boolean;
  has_endDate: boolean;
  has_fullname: boolean;
} // interface IAffectation
export interface IEtudAffectation extends IAffectation {
  etudiantid: any;
  has_etudiantid: boolean;
}// interface IEtudAffectation
export interface IProfAffectation extends IAffectation {
  uniteid: any;
  matiereid: any;
  enseignantid: any;
  //
  has_uniteid: boolean;
  has_matiereid: boolean;
  has_enseignantid: boolean;
}// interface IProfAffectation
//
export interface IBaseEvent extends IDepartementChild {
  anneeid: any;
  semestreid: any;
  uniteid: any;
  matiereid: any;
  groupeid: any;
  personid: any;
  date: Date;
  genre: string;
  status: string;
  //
  has_anneeid: boolean;
  has_semestreid: boolean;
  has_uniteid: boolean;
  has_matiereid: boolean;
  has_groupeid: boolean;
  has_personid: boolean;
  has_date: boolean;
  has_genre: boolean;
  has_status: boolean;
  //
}// interface IBaseEvent
//
export interface IGroupeEvent extends IBaseEvent {
  profaffectationid: any;
  enseignantid: any;
  name: string;
  location: string;
  startTime: Date;
  endTime: Date;
  coefficient: number;
  //
  has_profaffectationid: boolean;
  has_enseignantid: boolean;
  has_name: boolean;
  has_location: boolean;
  has_startTime: boolean;
  has_endTime: boolean;
  has_coefficient: boolean;
}// interface IGroupeEvent
export interface IEtudEvent extends IBaseEvent {
  etudaffectationid: any;
  groupeeventid: any;
  note: number;
  etudiantid: any;
  //
  has_etudaffectationid: boolean;
  has_groupeeventid: boolean;
  has_note: boolean;
  has_etudiantid: boolean;
}// interface IEtudEvent
//
export interface IObjectStore {
  get_value: (id: any) => IBaseItem;
  store_value: (key:any, item: IBaseItem) => boolean;
  remove_value: (id: any) => boolean;
}// interface IObjectStore
//
export interface IMenuDesc {
  refer: string;
  title: string;
  desc?: string;
  img_source?: string;
}

export interface IDatabaseManager {
  create_item : (oMap:any) => IBaseItem;
  isConnected: () => Q.IPromise<boolean>;
  get_item_by_id: (id: string) => Q.IPromise<IBaseItem>;
  get_items_array: (ids: string[]) => Q.IPromise<IBaseItem[]>;
  maintains_one_item: (item: IBaseItem) => Q.IPromise<IBaseItem>;
  maintains_items: (items: IBaseItem[]) => Q.IPromise<IBaseItem[]>;
  remove_items: (items: IBaseItem[]) => Q.IPromise<boolean>
  remove_one_item: (item: IBaseItem) => Q.IPromise<boolean>;
  find_person_by_username :(username:string) => Q.IPromise<IBaseItem>;
  maintains_attachment: (item:IBaseItem, attachmentId:string, attachment:Blob,type:string) => Q.IPromise<boolean>;
  get_attachment: (item:IBaseItem, attachmentId:string) => Q.IPromise<Blob>;
  get_docid_attachment: (docid:string, attachmentId:string) => Q.IPromise<Blob>;
  remove_attachment: (item:IBaseItem, attachmentId:string) => Q.IPromise<boolean>;
  find_elements_range: (viewName:string,startKey?: any, endKey?: any, skip?:number,limit?: number,
  descending?: boolean,bIncludeEnd?:boolean,bDoc?:boolean,bAttach?:boolean) => Q.IPromise<any[]>;
  //
}// interface IDatabaseManager
export interface IElementDesc {
  id:string;
  text?:string;
  rev?:string;
  avatardocid?:string;
  avatarid?:any;
  url?:string;
  personid?:string;
  startDate?:Date;
  endDate?:Date;
  //
  hasUrl: boolean;
  //
  check_url: (server?: IDatabaseManager)=> Q.IPromise<any>
}
