import {buildTursoClient} from "../src";
import "dotenv/config";
import {CreateNewUser, InsertUserSchema} from "../src/drizzle/zod";
import {users} from "../src/drizzle/schema";
import {SQLiteTable} from "drizzle-orm/sqlite-core/table";
import {eq} from "drizzle-orm/sql/expressions/conditions";

describe('live tests', () => {

    let client = buildTursoClient();

    describe('cleanup', () => {

        it('deleting a user', async () => {

            const res = await client
                // FIXME: parameter type should be SQLiteTable
                .delete(users)
                .where(eq(users.id, 'test_id'))
                .returning();

            expect(res).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        email: 'test@test.com',
                        name: 'Test User',
                        id: 'test_id',
                    })
                ]),
            );
        });
    });

    describe('insert', () => {
        it('creating a user', async () => {

            const newUser:CreateNewUser = {
                // FIXME: only undefined is allowed here
                email: undefined
            }

            const idLikeUserToBeWithType = {
                email: 'test@test.com',
                name: 'Test User',
                id: 'test_id',
                a: 1, // this is getting removed
            }

            const user = InsertUserSchema.parse(idLikeUserToBeWithType);

            expect(user).toEqual({
                email: 'test@test.com',
                name: 'Test User',
                id: 'test_id',
            });

            const res = await client
                .insert(users as SQLiteTable)
                .values(user)
                .returning();

            expect(res).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        email: 'test@test.com',
                        name: 'Test User',
                        id: 'test_id',
                    })
                ]),
            );
        });
    });

});