// Type definitions for Pouch 0.1
// Project: http://pouchdb.com
// Definitions by: Bill Sears <https://github.com/MrBigDog2U/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped
/// <reference path='../q/Q.d.ts' />

interface PouchError {
	status: number;
	error: string;
	reason: string;
}
interface IPouchAttachment {
	content_type:string;
	digest?:string;
	stub?:boolean;
	data?:any;
	length?:number;
	revpos?:number;
}
interface PouchApi {
	type(): string;
	id(): string;
	//close(callback: () => void): void;
	close : () => Q.IPromise<any>;
}

interface PouchInfoResponse {
	db_name: string;
	doc_count: number;
	update_seq: string;
	idb_attachement_format?:string;
	sqlite_plugin?:boolean;
	websql_encoding?:string;
}

interface PouchApi {
//	info(callback: (err: PouchError, res: PouchInfoResponse) => void): void;
	info: () => Q.IPromise< PouchInfoResponse>;
}
interface PouchAjaxOptions {
	cache?: boolean;
	headers?:any[];
	timeout?:number;
	username?:string;
	password?:string;
}
interface PouchGetOptions {
	ajax?:PouchAjaxOptions
	attachments?: boolean;
	att_encoding_info?:boolean;
	atts_since?:any[];
	conflicts?: boolean;
	deleted_conflicts?:boolean;
	latest?:boolean;
	local_seq?:boolean;
	meta?:boolean;
	open_revs?:any;
	rev?: string;
	revs?: boolean;
	revs_info?: boolean;
}

interface PouchGetResponse {
	_id: string;
	_rev: string;
	_deleted?:boolean;
	_attachments?: any;
	_conflicts?:any[];
	_deleted_conflicts?:any[];
	_local_seq?:number;
	_revs_info?:any[];
	_revisions?:any[];
}

interface PouchAllDocsOptions {
	startkey?: string;
	endkey?: string;
	descending?: boolean;
	include_docs?: boolean;
	conflicts?: boolean;
	skip?:number;
	limit?:number;
	keys?:any[];
	inclusive_end?:boolean;
	attachments?:boolean;
}

interface PouchAllDocsItem {
	id: string;
	key: string;
	value: any;
	doc?: any;
}

interface PouchAllDocsResponse {
	offset?:number;
	total_rows: number;
	rows: PouchAllDocsItem[];
}

interface PouchApi {
	//
	// get == select by id
	//
	get : (id:string, opts?:PouchGetOptions) => Q.IPromise<PouchGetResponse>;
	allDocs : (opts?: PouchAllDocsOptions) => Q.IPromise<PouchAllDocsResponse>;
	/*
	get(id: string, opts: PouchGetOptions, callback: (err: PouchError, res: PouchGetResponse) => void): void;
	get(id: string, callback: (err: PouchError, res: PouchGetResponse) => void): void;
	allDocs(opts: PouchAllDocsOptions, callback: (err: PouchError, res: PouchAllDocsResponse) => void): void;
	allDocs(callback: (err: PouchError, res: PouchAllDocsResponse) => void): void;
	*/
}

interface PouchBulkDocsRequest {
	docs: any[];
}

interface PouchUpdateOptions {
	new_edits?: boolean;
}

interface PouchUpdateResponse {
	ok: boolean;
	id: string;
	rev: string;
}

interface PouchApi {
	bulkDocs : (req: PouchBulkDocsRequest,opts?: PouchUpdateOptions) => Q.IPromise<PouchUpdateResponse[]>;
	/*
	bulkDocs(req: PouchBulkDocsRequest, opts: PouchUpdateOptions, callback: (err: PouchError, res: PouchUpdateResponse[]) => void): void;
	bulkDocs(req: PouchBulkDocsRequest, callback: (err: PouchError, res: PouchUpdateResponse[]) => void): void;
	*/
	//
	// post == insert (doc does not contain an _id)
	//
	post : (doc: any, opts?: PouchUpdateOptions) => Q.IPromise<PouchUpdateResponse>;
	/*
	post(doc: any, opts: PouchUpdateOptions, callback: (err: PouchError, res: PouchUpdateResponse) => void): void;
	post(doc: any, callback: (err: PouchError, res: PouchUpdateResponse) => void): void;
	*/
	//
	// put == update (doc DOES contain an _id)
	//
	put: (doc: any, opts?: PouchUpdateOptions) => Q.IPromise<PouchUpdateResponse>;
	/*
	put(doc: any, opts: PouchUpdateOptions, callback: (err: PouchError, res: PouchUpdateResponse) => void): void;
	put(doc: any, callback: (err: PouchError, res: PouchUpdateResponse) => void): void;
	*/
	//
	// remove == delete
	//
	remove : (doc: any, opts?: PouchUpdateOptions) => Q.IPromise<PouchUpdateResponse>;
	/*
	remove(doc: any, opts: PouchUpdateOptions, callback: (err: PouchError, res: PouchUpdateResponse) => void): void;
	remove(doc: any, callback: (err: PouchError, res: PouchUpdateResponse) => void): void;
	*/
}

interface PouchFilter {
	map: (doc: any) => void;
	reduce?: (key: string, value: any) => any;
}

interface PouchQueryOptions {
	complete?: any;
	include_docs?: boolean;
	error?: (err: PouchError) => void;
	descending?: boolean;
	reduce?: boolean;
}

interface PouchQueryResponse {
	rows: any[];
}

interface PouchApi {
	//
	// query == select by other criteria
	//
	query : (fun: string | PouchFilter, opts?: PouchQueryOptions) => Q.IPromise<PouchQueryResponse>;
	//query : (fun:PouchFilter, opts?: PouchQueryOptions) => Q.IPromise<PouchQueryResponse>;
	/*
	query(fun: string, opts: PouchQueryOptions, callback: (err: PouchError, res: PouchQueryResponse) => void): void;
	query(fun: string, callback: (err: PouchError, res: PouchQueryResponse) => void): void;
	query(fun: PouchFilter, opts: PouchQueryOptions, callback: (err: PouchError, res: PouchQueryResponse) => void): void;
	query(fun: PouchFilter, callback: (err: PouchError, res: PouchQueryResponse) => void): void;
	*/
}

interface PouchAttachmentOptions {
	decode?: boolean;
}

interface PouchApi {
	getAttachment: (docId:string,attachmentId:string,opts?: PouchAttachmentOptions) => Q.IPromise<any>;
	putAttachment: (docId:string,attachmentId:string,docRev:string,attachment:any,type:string) => Q.IPromise<PouchUpdateResponse>;
	removeAttachment : (docId:string, attachmentId:string,docRev:string) => Q.IPromise<PouchUpdateResponse>;
	/*
	getAttachment(id: string, opts: PouchAttachmentOptions, callback: (err: PouchError, res: any) => void): void;
	getAttachment(id: string, callback: (err: PouchError, res: any) => void): void;
	putAttachment(id: string, rev: string, doc: any, type: string, callback: (err: PouchError, res: PouchUpdateResponse) => void): void;
	removeAttachment(id: string, rev: string, callback: (err: PouchError, res: PouchUpdateResponse) => void): void;
	*/
}

interface PouchCancellable {
	cancel: () => void;
}

interface PouchChangesOptions {
	onChange: (change: PouchChange) => void;
	complete?: (err: PouchError, res: PouchChanges) => void;
	seq?: number;
	since?: number;
	descending?: boolean;
	filter?: PouchFilter;
	continuous?: boolean;
	include_docs?: boolean;
	conflicts?: boolean;
}

interface PouchChange {
	changes: any;
	doc: PouchGetResponse;
	id: string;
	seq: number;
}

interface PouchChanges {
	results: PouchChange[];
}

interface PouchApi {
	changes : (opts?:PouchChangesOptions) => PouchCancellable;
	/*
	changes(opts: PouchChangesOptions, callback: (err: PouchError, res: PouchChanges) => void): PouchCancellable;
	changes(callback: (err: PouchError, res: PouchChanges) => void): PouchCancellable;
	*/
}

interface PouchRevsDiffOptions {
}

interface PouchReplicateOptions {
	continuous?: boolean;
	onChange?: (any) => void;
	filter?: any;			// Can be either string or PouchFilter
	complete?: (err: PouchError, res: PouchChanges) => void;
}

interface PouchReplicateResponse {
	ok: boolean;
	start_time: Date;
	end_time: Date;
	docs_read: number;
	docs_written: number;
}

interface PouchReplicate {
	/*
	from : (url:string, opts:PouchReplicateOptions, callback: (err: PouchError, res: PouchReplicateResponse)=>void) => PouchCancellable;
	from : (url:string, callback: (err: PouchError, res: PouchReplicateResponse)=>void) => PouchCancellable;
	to : (url:string, opts:PouchReplicateOptions, callback: (err: PouchError, res: PouchReplicateResponse)=>void) => PouchCancellable;
	to : (url:string, callback: (err: PouchError, res: PouchReplicateResponse)=>void) => PouchCancellable;
	*/
	from(url: string, opts: PouchReplicateOptions, callback: (err: PouchError, res: PouchReplicateResponse) => void): PouchCancellable;
	from(url: string, callback: (err: PouchError, res: PouchReplicateResponse) => void): PouchCancellable;
	to(dbName: string, opts: PouchReplicateOptions, callback: (err: PouchError, res: PouchReplicateResponse) => void): PouchCancellable;
	to(dbName: string, callback: (err: PouchError, res: PouchReplicateResponse) => void): PouchCancellable;
}

interface PouchApi {
	revsDiff : (req: any,opts?: PouchRevsDiffOptions) => Q.IPromise<any>;
	replicate: PouchReplicate;
	/*
	revsDiff(req: any, opts: PouchRevsDiffOptions, callback: (missing: any) => void): void;
	revsDiff(req: any, callback: (missing: any) => void): void;
	replicate: PouchReplicate;
	*/
}

interface PouchOptions {
	name?: string;
	auto_compaction?:boolean;
	adapter?: string;
	ajax?:PouchAjaxOptions;
}
interface IPouchFuncs {
	enable : (v:string) => void;
	disable : () => void;
}
interface PouchDB extends PouchApi {
    new (name: string, opts: PouchOptions, callback: (err: PouchError, res: PouchDB) => void): PouchDB;
    new (name: string, callback: (err: PouchError, res: PouchDB) => void): PouchDB;
    new (name: string): PouchDB;
	destroy(name: string, callback: (err: PouchError) => void): void;
	plugin : (p:any) => void;
	debug? : IPouchFuncs;
}

declare var PouchDB: PouchDB;

// Support AMD require
declare module 'pouchdb' {
  export = PouchDB;
}

//
// emit is the function that the PouchFilter.map function should call in order to add a particular item to
// a filter view.
//
declare function emit(key: any, value?: any);
