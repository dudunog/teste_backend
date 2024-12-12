import { ListModel } from "@contexts/list/domain/models/list-model.struct";
import { CreationModel } from "@shared/protocols/creation-model";
import { randomUUID } from "crypto";

export function makeFakeList(complete: true): ListModel;
export function makeFakeList(complete: false): CreationModel<ListModel>;
export function makeFakeList(): CreationModel<ListModel>;
export function makeFakeList(complete = false): ListModel {
  return {
    ...(complete && {
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
    title: "any_title",
    slug: "any_slug",
    emoji: "any_emoji",
    color: "any_color",
    tasks: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}
