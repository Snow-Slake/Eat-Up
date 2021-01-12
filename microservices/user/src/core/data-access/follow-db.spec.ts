import { followDb, userDb } from '.'
import 'jest'
import { User } from '../entities/user';
import { DATABASE, DB_OPERATION } from '../../config';
import { follow } from '../usecases';
import { makeUser } from '../entities';
import { USER_ID_ENTRY } from '../../config/database-constants';
import { db } from './admin';

describe('testing follow db operations', () => {
    let t = 1, s = 0;
    const current_users: User[] = [];
    const maxTestTime = 60000;
        
    const creat_user = async(n: number) => {
        let users: User[] = [];
        for(let i = s; i < s + n; i++) {
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
            s += n;
        }catch(e) {
            console.log(e);
            fail();
        }

        return users;
    };

    beforeEach(() => {
        console.log("Running on test " + t++);
    });

    it('Test users follow other users', async () => {
        try {
            jest.setTimeout(maxTestTime);
            const numOfUsers = 5;
            let users = await creat_user(numOfUsers);
            expect(users.length).toBe(numOfUsers);

            users.forEach( u => current_users.push(u));
    
            for(let i = 0; i < users.length; i++) {
                for(let j = i + 1; j < users.length; j++) {
                    let followed = await followDb.follow(users[i].id, users[j].id);
                    expect(followed).toBe(true);
                }
            }
            
            for(let i = 0; i < users.length; i++) {
                const condition: string[] = [];
                condition.push(DATABASE.USER_ID_ENTRY);
                condition.push(users[i].id);
                users[i] = (await userDb.get(condition))[0];
            }
    
            for(let i = 0; i < users.length; i++) {
                expect(users[i].numOfFollowing).toBe(users.length - i - 1);
            }
    
            for(let i = 0; i < users.length; i++) {
                expect(users[i].numOfFollowers).toBe(i);
            }
        } catch (error) {
            console.log(error);
            fail();
        }
    });

    it('Test users unfollow other users', async () => {
        try {
            jest.setTimeout(maxTestTime);
            for(let user of current_users){
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
        } catch (error) {
            console.log(error);
            fail();
        }
    });

    it('Test user follow him self', async () => {
        try {
            jest.setTimeout(maxTestTime);
            let users = await creat_user(1);
            users.forEach( u => current_users.push(u));
            let res = await followDb.follow(users[0].id, users[0].id);
            expect(res).toBe(false);
        } catch (error) {
            console.log(error);
            fail();
        }
    });

    it('Test user unfollow himself', async () => {
        try {
            jest.setTimeout(maxTestTime);
            let users = await creat_user(1);
            users.forEach( u => current_users.push(u));
            let res = await followDb.unfollow(users[0].id, users[0].id);
            expect(res).toBe(false);
        } catch (error) {
            console.log(error);
            fail();
        }
    });

    it('Test clear paginating', async () => {
        try {
            jest.setTimeout(maxTestTime);
            const numOfUsers = 30;
            let users = await creat_user(numOfUsers);
            users.forEach( u => current_users.push(u));
            for(let i = 1; i < users.length; i++) {
                let res = await followDb.follow(users[0].id, users[i].id);
                expect(res).toBe(true);
            }
    
            let user = (await userDb.get([DATABASE.USER_ID_ENTRY, users[0].id]))[0];
            followDb.clear(user.id);
            let follow_temp_1 = await followDb.get(user.id);
            followDb.clear(user.id);
            let follow_temp_2 = await followDb.get(user.id);
            for(let i = 0; i < follow_temp_1.length; i++) {
                expect(follow_temp_1[i].id).toBe(follow_temp_2[i].id);
            }    
        } catch (error) {
            console.log(error);            
            fail();
        }
    });

    it('Test get all followers', async () => {
        try {
            jest.setTimeout(maxTestTime);
            const numOfUsers = 30;
            let users = await creat_user(numOfUsers);
            users.forEach( u => current_users.push(u));
            for(let i = 1; i < users.length; i++) {
                let res = await followDb.follow(users[0].id, users[i].id);
                expect(res).toBe(true);
            }
    
            let user = (await userDb.get([DATABASE.USER_ID_ENTRY, users[0].id]))[0];
            let followings: User[] = [];
    
            for(let i = 0; i < user.numOfFollowing; i+= DB_OPERATION.LIMITS) {
                let res = await followDb.get(user.id);
                res.forEach( f => followings.push(f));
            }
            expect(followings.length).toBe(numOfUsers - 1);
    
            for(let i = 0; i < followings.length; i++) {
                for(let j = i + 1; j < followings.length; j++) {
                    expect(followings[i].id == followings[j].id).toBeFalsy();
                }
            }    
        } catch (error) {
            console.log(error);
            fail();            
        }
    });

    afterAll(async done => {
        try {
            try {
                for(let user of current_users){
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
            } catch (error) {
                console.log(error);
            }
    
            let results = await Promise.all( current_users.map(user => {
                return userDb.delete(user);
            }));
            results.forEach(result => expect(result).toBe(true));
        } catch (error) {
            console.log(error);
        }
        done();
    });
});