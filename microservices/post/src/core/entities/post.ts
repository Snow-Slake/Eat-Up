export class Post {
    constructor(
        private _id: string,
        private _userId: string,
        private _description: string,
        private _createdAt: Date,
        private _tags: string[],
        private _imagesLinks: string[],
        private _videoLink: string,
        private _price: number,
        private _reacts: {type: string, count: number}[],
        private _postContent?: {ingredients: string[], nutritions: string[], steps: string[]}) {
    }

    get id() {
        return this._id;
    }

    get userId() {
        return this._userId;
    }

    get description() {
        return this._description;
    }

    get createdAt() {
        return new Date(this._createdAt);
    }

    get tags() {
        return this._tags.slice(0);
    }

    get imagesLinks() {
        return this._imagesLinks.slice(0);
    }

    get videoLink() {
        return this._videoLink;
    }

    get price() {
        return this._price;
    }

    get reacts() {
        return this._reacts.slice(0);
    }

    get postContent() {
        return this._postContent? { ...this._postContent } : undefined;
    }
}