import {v4 as uuidv4} from "uuid";
import {IIncidentCard} from "../../../../common/model/model";
import {USER_MOCK} from "./user.mock";

export const INCIDENT_CARD_MOCK: IIncidentCard = {
    id: uuidv4(),
    title: 'Untitled Incident',
    description: '',
    assignees: [],
    commentList: [],
    openedAt: new Date().getTime(),
    openedBy: USER_MOCK,
};
