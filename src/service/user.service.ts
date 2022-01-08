import { DocumentDefinition } from "mongoose";
import UserModel, { UserDocument, UserInput } from "../models/user.model";

export async function createUser(input: DocumentDefinition<UserInput>) {
  try {
    return await UserModel.create(input);
  } catch (err: any) {
    throw new Error(err);
  }
}
