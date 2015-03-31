//siglenameviewmodel.ts
//
//
/// <reference path='../../../lib/typings/knockout/knockout.d.ts'/>
//
import ko = require('knockout');
import InfoData = require('../../infodata');
import BaseItem = require('../domain/baseitem');
import PagedViewModel = require('./pagedviewmodel');
//
class SigleNameViewModel extends PagedViewModel {
  //
  public sigle: KnockoutComputed<string>;
  public name: KnockoutComputed<string>;
  public description: KnockoutComputed<string>;
  //
  constructor(model: InfoData.ISigleNameItem) {
    super(model);
    this.sigle = ko.computed({
      read: () => {
        var v = this.current();
        if ((v !== undefined) && (v !== null) && (v.sigle !== undefined)) {
          return v.sigle;
        } else {
          return null;
        }
      },
      write: (s: string) => {
        var v = this.current();
        if ((v !== undefined) && (v !== null) && (v.sigle !== undefined)) {
          v.sigle = s;
          this.current(v);
        }
      },
      owner: this
    });
    this.name = ko.computed({
      read: () => {
        var v = this.current();
        if ((v !== undefined) && (v !== null) && (v.name !== undefined)) {
          return v.name;
        } else {
          return null;
        }
      },
      write: (s: string) => {
        var v = this.current();
        if ((v !== undefined) && (v !== null) && (v.name !== undefined)) {
          v.name = s;
          this.current(v);
        }
      },
      owner: this
    });
    this.description = ko.computed({
      read: () => {
        var v = this.current();
        if ((v !== undefined) && (v !== null) && (v.description !== undefined)) {
          return v.description;
        } else {
          return null;
        }
      },
      write: (s: string) => {
        var v = this.current();
        if ((v !== undefined) && (v !== null) && (v.description !== undefined)) {
          v.description = s;
          this.current(v)
        }
      },
      owner: this
    });
    this.canSave = ko.computed(() => {
      var v = this.sigle();
      return ((v !== undefined) && (v !== null) && (v.trim().length > 0));
    }, this);
  }// constructor
}// class SigleNameViewModel
export = SigleNameViewModel;
