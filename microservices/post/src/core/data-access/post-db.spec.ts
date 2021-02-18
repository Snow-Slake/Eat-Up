import { postDb } from './index';
import { makePost } from '../entities';
import * as uuid from 'uuid';
import { log } from 'console';
import { PostDb } from './post-db';

describe("testing creatring, deleting, updating posts", () => {
    const createdPostsId: string[] = [];
    it("testeing creating post without content", async () => {
        const userId = uuid.v4();
        const post = makePost(userId, userId, "post gamed gdn", ["tag1", "tag2"], [], "", 0);
        expect(post.postContent).toBeUndefined();
        const addedToDataBase = await postDb.addPost(post);
        expect(addedToDataBase).toBeTruthy();
        createdPostsId.push(post.id);
    });

    it("testeing creating post with content", async () => {
        const userId = uuid.v4();
        const post = makePost(userId, userId, "post gamed gdn", ["tag1", "tag2"], [], "", 0, {
            ingredients: ["ingredient1"], 
            nutritions: ["vitman C"],
            steps: ["bla bla bla"],
        });
        expect(post.postContent).toBeDefined();
        const addedToDataBase = await postDb.addPost(post);
        expect(addedToDataBase).toBeTruthy();
        createdPostsId.push(post.id);
    });

    it("testeing updating post without content", async () => {
        const userId = uuid.v4();
        let post = makePost(userId, userId, "post gamed gdn", ["tag1", "tag2"], [], "", 0);
        expect(post.postContent).toBeUndefined();
        const addedToDataBase = await postDb.addPost(post);
        expect(addedToDataBase).toBeTruthy();
        createdPostsId.push(post.id);

        post = makePost(userId, userId, "post gamed gdn", ["tag1", "tag2"], [], "", 0);
        const updatePost = postDb.updatePost(post);
        expect(updatePost).toBeTruthy();
    });

    it("testeing updating post with content", async () => {
        const userId = uuid.v4();
        let post = makePost(userId, userId, "post gamed gdn", ["tag1", "tag2"], [], "", 0, {
            ingredients: ["ingredient1"], 
            nutritions: ["vitman C"],
            steps: ["bla bla bla"],
        });
        expect(post.postContent).toBeDefined();
        const addedToDataBase = await postDb.addPost(post);
        expect(addedToDataBase).toBeTruthy();
        createdPostsId.push(post.id);

        post = makePost(userId, userId, "post gamed gdn", ["tag1", "tag2"], [], "", 0, {
            ingredients: ["ingredient1"], 
            nutritions: ["vitman d"],
            steps: ["bla bla bla"],
        });
        const updatePost = postDb.updatePost(post);
        expect(updatePost).toBeTruthy();
    });
    
    it("testeing updating post taht doesn't have content with content", async () => {
        const userId = uuid.v4();
        let post = makePost(userId, userId, "post gamed gdn", ["tag1", "tag2"], [], "", 0);
        expect(post.postContent).toBeUndefined();
        const addedToDataBase = await postDb.addPost(post);
        expect(addedToDataBase).toBeTruthy();
        createdPostsId.push(post.id);

        post = makePost(userId, userId, "post gamed gdn", ["tag1", "tag2"], [], "", 0, {
            ingredients: ["ingredient1"], 
            nutritions: ["vitman d"],
            steps: ["bla bla bla"],
        });
        const updatePost = postDb.updatePost(post);
        expect(updatePost).toBeTruthy();
    });

    afterAll( async (done) => {
        log("testeing deleteing created posts");
        const res = await Promise.all(createdPostsId.map( postId => postDb.deletePost(postId)));
        res.forEach(r => expect(r).toBeTruthy());
    });
    
});