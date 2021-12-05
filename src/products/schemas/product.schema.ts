import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// export type ProductDocument = Product & Document;

// @Schema()
// export class Product {
//   @Prop({ required: true })
//   title: string;

//   @Prop()
//   description: string;
//   @Prop()
//   price: number;
// }

// export const ProductSchema = SchemaFactory.createForClass(Product);

export const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});
