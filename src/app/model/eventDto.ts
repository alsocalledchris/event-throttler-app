import {Event } from './event';

export interface EventDto extends Event {
    secret: string;
    dateCreated : Date;
    dateLastUpdated : Date;
}