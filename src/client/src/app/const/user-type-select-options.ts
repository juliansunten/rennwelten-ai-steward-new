import {ISelectOption, USER_TYPE} from "../../../../common/model/model";

export const USER_TYPE_SELECT_OPTIONS: ISelectOption<USER_TYPE>[] = [
    { label: 'Steward', value: USER_TYPE.STEWARD },
    { label: 'Fahrer', value: USER_TYPE.DRIVER},
    { label: 'Admin', value: USER_TYPE.ADMIN},
]
