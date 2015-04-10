define(["require", "exports", 'q'], function (require, exports, Q) {
    var ElementDesc = (function () {
        function ElementDesc(oMap) {
            this.id = null;
            this.text = null;
            this.rev = null;
            this.avatardocid = null;
            this.avatarid = null;
            this.url = null;
            this.personid = null;
            this.startDate = null;
            this.endDate = null;
            if ((oMap !== undefined) && (oMap !== null)) {
                if (oMap.id !== undefined) {
                    this.id = oMap.id;
                }
                if (oMap.rev !== undefined) {
                    this.rev = oMap.rev;
                }
                if (oMap.text !== undefined) {
                    this.text = oMap.text;
                }
                if (oMap.avatardocid !== undefined) {
                    this.avatardocid = oMap.avatardocid;
                }
                if (oMap.avatarid !== undefined) {
                    this.avatarid = oMap.avatarid;
                }
                if (oMap.personid !== undefined) {
                    this.personid = oMap.personid;
                }
                if (oMap.startDate !== undefined) {
                    this.startDate = oMap.startDate;
                }
                if (oMap.endDate !== undefined) {
                    this.endDate = oMap.endDate;
                }
            }
        }
        ElementDesc.prototype.check_url = function (server) {
            var _this = this;
            if (this.hasUrl) {
                return Q.resolve(this);
            }
            this.url = null;
            var service = ((server !== undefined) && (server !== null)) ? server : null;
            if (service === null) {
                return Q.resolve(this);
            }
            if ((this.avatarid === null) || (this.avatardocid === null)) {
                return Q.resolve(this);
            }
            return service.get_docid_attachment(this.avatardocid, this.avatarid).then(function (blob) {
                _this.url = window.URL.createObjectURL(blob);
                return _this;
            });
        };
        Object.defineProperty(ElementDesc.prototype, "hasUrl", {
            get: function () {
                return ((this.url !== undefined) && (this.url !== null) && (this.url.trim().length > 0));
            },
            enumerable: true,
            configurable: true
        });
        return ElementDesc;
    })();
    return ElementDesc;
});
