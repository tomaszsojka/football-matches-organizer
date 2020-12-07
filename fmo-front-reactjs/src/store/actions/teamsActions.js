import {
    SET_TEAMSLIST
  } from './types';

export function setTeamsList(teams) {
    return {
        type: SET_TEAMSLIST,
        payload: teams
    };
}

