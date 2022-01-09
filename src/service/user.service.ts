import { omit } from "lodash";
import { DocumentDefinition } from "mongoose";
import UserModel, { UserInput } from "../models/user.model";

export async function createUser(input: DocumentDefinition<UserInput>) {
  try {
    return await UserModel.create(input);
  } catch (err: any) {
    throw new Error(err);
  }
}

export async function validatePassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return false;
    }
    const isValid = await user.comparePassword(password);
    if (!isValid) {
      return false;
    }
    return omit(user, "password");
  } catch (err: any) {
    throw new Error(err);
  }
}
