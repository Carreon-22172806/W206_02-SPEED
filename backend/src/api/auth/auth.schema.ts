import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type AccountDocument = HydratedDocument<Account>;

@Schema()
export class Account {
    @Prop ({required: true})
    firstName: string;

    @Prop ({required: true})
    lastName: string[];

    @Prop ({required: true})
    email: string;

    @Prop ({required: true})
    mobile: string;

    @Prop ({required: true})
    username: number;

    @Prop ({required: true})
    password: string;
}

export const AccountSchema = SchemaFactory.createForClass(Account);