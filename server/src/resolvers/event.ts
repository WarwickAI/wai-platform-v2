import { Course } from "../entities/Course";
import { Field, ObjectType } from "type-graphql";
import { Project } from "../entities/Project";
import { Talk } from "../entities/Talk";
import { Tutorial } from "../entities/Tutorial";
import FieldError from "../utils/FieldError";
import { TagInput } from "../utils/EventInput";
import { Tag } from "../entities/Tag";

type EventType = Course | Project | Talk | Tutorial;

export function removeUsers<T extends EventType>(events: T[]) {
  events.forEach(event => event.users = []);
  return events;
}

export function removeUser<T extends EventType>(event: T) {
  event.users = [];
  return event;
}

export function getAndAddTags(inputTags: TagInput[], eventType: string) {
  const tags: Tag[] = [];
  inputTags.forEach(async inputTag => {
    var tag = await Tag.findOne({ where: { title: inputTag.title }, relations: [eventType] });
    if (!tag) {
      tag = await Tag.create(inputTag).save();
      if (!tag) {
        console.log("RETURNING HERE")
        return;
      }
    }
    tags.push(tag);
  })
  console.log(tags);
  return tags;
}