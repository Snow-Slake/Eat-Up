import { followDb, userDb } from '.'
import 'jest'
import { User } from '../entities/user';
import { DATABASE, DB_OPERATION } from '../../config';
import { follow } from '../usecases';
import { makeUser } from '../entities';
import { USER_ID_ENTRY } from '../../config/database-constants';
import { db } from './admin';

describe('testing follow db operations', () => {
    let t = 1;
    let current_users: User[] = [];
    const numOfUsers = 8;
        
    const creat_user = async(n: number) => {
        let users: User[] = [];
        for(let i = 0; i < n; i++) {
            users.push(makeUser({
                id:'test' + i, 
                firstName: 'ahmed' + i, 
                lastName: 'shakshak' + 1, 
                email: 'ahmed' + i + '@gmail.com',
                password: '123aaaaAAA',
                coverImageUrl: 'www.myphooto.com',
                numOfFollowers: 0,
                numOfFollowing: 0,
                profileImageUrl: 'www.myprofile.com'
            }));
        }

        try {
            let temp = await Promise.all(users.map( user => {
                return userDb.insert(user);
            }));
            temp.forEach( f => expect(f).toBe(true));
        }catch(e) {
            console.log(e);
        }

        return users;
    };

    beforeEach(() => {
        console.log("Running on test " + t++);
    });

    it('Test users follow other users', async () => {
        jest.setTimeout(60000);
        current_users = await creat_user(numOfUsers);
        expect(current_users.length).toBe(numOfUsers);

        for(let i = 0; i < current_users.length; i++) {
            for(let j = i + 1; j < current_users.length; j++) {
                let followed = await followDb.follow(current_users[i].id, current_users[j].id);
                expect(followed).toBe(true);
            }
        }
        
        for(let i = 0; i < current_users.length; i++) {
            const condition: string[] = [];
            condition.push(DATABASE.USER_ID_ENTRY);
            condition.push(current_users[i].id);
            current_users[i] = (await userDb.get(condition))[0];
        }

        for(let i = 0; i < current_users.length; i++) {
            expect(current_users[i].numOfFollowing).toBe(current_users.length - i - 1);
        }

        for(let i = 0; i < current_users.length; i++) {
            expect(current_users[i].numOfFollowers).toBe(i);
        }
    });

    it('Test user follow him self', () => {
        //expect().toBe();
    });

    it('Test users unfollow other users', async () => {
        for(let user of current_users){
            console.log('asdasd');
            const followings: User[] = [];
            for(let i = 0; i < user.numOfFollowing; i += DB_OPERATION.LIMITS) {
                const users = (await followDb.get(user.id));
                users.forEach(user => {
                    followings.push(user);
                });
            }
            
            expect(followings.length).toBe(user.numOfFollowing);
            let i = 1;
            for(let following of followings) {
                // get the folllowing one befor unfollow
                let condition: string[] = [];
                condition.push(DATABASE.USER_ID_ENTRY);
                condition.push(following.id);
                let old_following = (await userDb.get(condition))[0];

                // unfollow
                let ret = await followDb.unfollow(user.id, following.id);
                expect(ret).toBe(true);

                // get user afetr follow
                condition = [];
                condition.push(DATABASE.USER_ID_ENTRY);
                condition.push(user.id);
                let new_me = (await userDb.get(condition))[0];
                expect(new_me.numOfFollowing).toBe(followings.length - i++);

                // get following after unfollow
                condition = [];
                condition.push(DATABASE.USER_ID_ENTRY);
                condition.push(following.id);
                let new_follower = (await userDb.get(condition))[0];
                expect(new_follower.numOfFollowers).toBe(old_following.numOfFollowers - 1);

            }
        }
    });


    it('Test user unfollow himself', () => {
        //expect().toBe();
    });

    it('Test clear paging', () => {
        //expect().toBe();
    });

    it('Test get all followers', () => {
        //expect().toBe();
    });

    afterAll(async done => {
        let results = await Promise.all( current_users.map(user => {
            return userDb.delete(user);
        }));
        results.forEach(result => expect(result).toBe(true));
        done();
    });
});