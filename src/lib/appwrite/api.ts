import { ID } from "appwrite";
import { account, appWriteConfig, avatars, databases } from "./config";
import type { INewUser } from "@/types";

export async function createUserAccount(user: INewUser) {
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.name,
            user.email,           
            user.password,
        );

        if (!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(user.name)
        const newUser = await saveUserToDB({
            accountId: newAccount.$id,
            email: user.email,
            name: user.name,
            imageUrl: avatarUrl,
            username: user.username
        })

        return newUser;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export async function saveUserToDB(user:{
    accountId: string;
    email: string
    name: string;
    imageUrl: string;
    username?: string;
}) {
    try {
        const newUser = await databases.createDocument(
            appWriteConfig.databaseId,
            appWriteConfig.userCollectionId,
            ID.unique(),
            user
        )
        return newUser;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}